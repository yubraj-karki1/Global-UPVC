import { Router } from "express";
import { Enquiry } from "../models/Enquiry.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { notifyNewEnquiry } from "../services/notify.js";

export const enquiriesRouter = Router();

enquiriesRouter.post("/", rateLimit({ windowMs: 15 * 60_000, max: 8 }), async (req, res, next) => {
  try {
    const { name, phone, message, website, projectType, location, dimensions, budget, preferredVisitAt, source } = req.body;
    if (website) { res.status(201).json({ message: "Enquiry received." }); return; }
    if (![name, phone, message].every((value) => typeof value === "string" && value.trim()) || name.length > 100 || phone.length > 25 || message.length > 2000) {
      res.status(400).json({ message: "Name, phone and message are required." });
      return;
    }
    const optionalText = [projectType, location, dimensions, budget, source];
    if (optionalText.some((value) => value !== undefined && (typeof value !== "string" || value.length > 500))) {
      res.status(400).json({ message: "One or more project details are invalid." }); return;
    }
    const visitDate = preferredVisitAt ? new Date(preferredVisitAt) : null;
    if (visitDate && Number.isNaN(visitDate.getTime())) { res.status(400).json({ message: "Invalid preferred visit date." }); return; }
    const enquiry = await Enquiry.create({ name: name.trim(), phone: phone.trim(), message: message.trim(), projectType, location, dimensions, budget, preferredVisitAt: visitDate, source: source || "Website", activity: [{ type: "created", value: "Enquiry received", at: new Date() }] });
    res.status(201).json({ message: "Enquiry received." });
    void notifyNewEnquiry({ name: enquiry.name, phone: enquiry.phone, message: enquiry.message, createdAt: enquiry.createdAt });
  } catch (error) { next(error); }
});

enquiriesRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);
    const skip = Math.max(Number(req.query.skip) || 0, 0);
    res.json(await Enquiry.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean());
  }
  catch (error) { next(error); }
});

enquiriesRouter.get("/stats", requireAdmin, async (_req, res, next) => {
  try {
    const now = new Date();
    const [byStatus, overdueFollowUps, total] = await Promise.all([
      Enquiry.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Enquiry.countDocuments({ followUpAt: { $ne: null, $lt: now }, status: { $nin: ["won", "lost", "archived"] } }),
      Enquiry.countDocuments(),
    ]);
    res.json({ total, overdueFollowUps, byStatus: Object.fromEntries(byStatus.map((item) => [item._id, item.count])) });
  } catch (error) { next(error); }
});

enquiriesRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const update: { status?: string; adminNotes?: string; followUpAt?: Date | null; assignedTo?: string; source?: string } = {};
    if (req.body.status !== undefined) {
      if (!["new", "contacted", "survey-booked", "quoted", "won", "lost", "archived"].includes(req.body.status)) { res.status(400).json({ message: "Invalid enquiry status." }); return; }
      update.status = req.body.status;
    }
    if (req.body.adminNotes !== undefined) {
      if (typeof req.body.adminNotes !== "string" || req.body.adminNotes.length > 2000) { res.status(400).json({ message: "Admin notes must be 2,000 characters or fewer." }); return; }
      update.adminNotes = req.body.adminNotes;
    }
    if (req.body.followUpAt !== undefined) {
      const date = req.body.followUpAt ? new Date(req.body.followUpAt) : null;
      if (date && Number.isNaN(date.getTime())) { res.status(400).json({ message: "Invalid follow-up date." }); return; }
      update.followUpAt = date;
    }
    for (const field of ["assignedTo", "source"] as const) {
      if (req.body[field] !== undefined) {
        if (typeof req.body[field] !== "string" || req.body[field].length > 100) { res.status(400).json({ message: `${field} is invalid.` }); return; }
        update[field] = req.body[field].trim();
      }
    }
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!enquiry) { res.status(404).json({ message: "Enquiry not found." }); return; }
    const activity: { type: string; value: string; at: Date }[] = [];
    if (update.status !== undefined) activity.push({ type: "status", value: `Status changed to ${update.status}`, at: new Date() });
    if (update.adminNotes !== undefined) activity.push({ type: "notes", value: "Admin notes updated", at: new Date() });
    if (update.followUpAt !== undefined) activity.push({ type: "follow-up", value: update.followUpAt ? `Follow-up scheduled for ${update.followUpAt.toISOString()}` : "Follow-up cleared", at: new Date() });
    if (update.assignedTo !== undefined) activity.push({ type: "assignment", value: update.assignedTo ? `Assigned to ${update.assignedTo}` : "Assignment cleared", at: new Date() });
    if (activity.length) { enquiry.activity.push(...activity); await enquiry.save(); }
    res.json(enquiry);
  } catch (error) { next(error); }
});

enquiriesRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) { res.status(404).json({ message: "Enquiry not found." }); return; }
    res.status(204).send();
  } catch (error) { next(error); }
});
