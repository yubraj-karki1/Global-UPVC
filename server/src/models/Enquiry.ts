import { Schema, model } from "mongoose";

const enquirySchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  phone: { type: String, required: true, trim: true, minlength: 7, maxlength: 25 },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
  status: { type: String, enum: ["new", "contacted", "archived"], default: "new" },
  adminNotes: { type: String, trim: true, maxlength: 2000, default: "" },
  followUpAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now, immutable: true },
});

export const Enquiry = model("Enquiry", enquirySchema);
