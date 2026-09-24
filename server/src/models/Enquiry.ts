import { Schema, model } from "mongoose";

const enquirySchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  phone: { type: String, required: true, trim: true, minlength: 7, maxlength: 25 },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
  projectType: { type: String, trim: true, maxlength: 100, default: "" },
  location: { type: String, trim: true, maxlength: 160, default: "" },
  dimensions: { type: String, trim: true, maxlength: 500, default: "" },
  budget: { type: String, trim: true, maxlength: 100, default: "" },
  preferredVisitAt: { type: Date, default: null },
  source: { type: String, trim: true, maxlength: 80, default: "Website" },
  assignedTo: { type: String, trim: true, maxlength: 100, default: "" },
  status: { type: String, enum: ["new", "contacted", "survey-booked", "quoted", "won", "lost", "archived"], default: "new" },
  adminNotes: { type: String, trim: true, maxlength: 2000, default: "" },
  followUpAt: { type: Date, default: null },
  activity: [{ type: { type: String, enum: ["created", "status", "notes", "follow-up", "assignment"] }, value: { type: String, maxlength: 200 }, at: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now, immutable: true },
});

export const Enquiry = model("Enquiry", enquirySchema);
