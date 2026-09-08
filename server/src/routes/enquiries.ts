import { Router } from "express";
import { Enquiry } from "../models/Enquiry.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { notifyNewEnquiry } from "../services/notify.js";

export const enquiriesRouter = Router();

enquiriesRouter.post("/", rateLimit({ windowMs: 15 * 60_000, max: 8 }), async (req, res, next) => {
  try {
    const { name, phone, message, website } = req.body;
    if (website) { res.status(201).json({ message: "Enquiry received." }); return; }
    if (![name, phone, message].every((value) => typeof value === "string" && value.trim()) || name.length > 100 || phone.length > 25 || message.length > 2000) {
      res.status(400).json({ message: "Name, phone and message are required." });
      return;
    }
    const enquiry = await Enquiry.create({ name: name.trim(), phone: phone.trim(), message: message.trim() });
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

enquiriesRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const update: { status?: string; adminNotes?: string; followUpAt?: Date | null } = {};
    if (req.body.status !== undefined) {
      if (!["new", "contacted", "archived"].includes(req.body.status)) { res.status(400).json({ message: "Invalid enquiry status." }); return; }
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
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!enquiry) { res.status(404).json({ message: "Enquiry not found." }); return; }
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
