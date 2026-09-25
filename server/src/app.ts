import cors from "cors";
import dotenv from "dotenv";
import express, { type ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { getAllowedOrigins } from "./config.js";
import { enquiriesRouter } from "./routes/enquiries.js";
import { adminRouter } from "./routes/admin.js";

dotenv.config({ path: new URL("../.env", import.meta.url) });

export const app = express();
app.disable("x-powered-by");
const trustedProxyHops = Number(process.env.TRUST_PROXY_HOPS);
app.set("trust proxy", process.env.TRUST_PROXY === "true" && Number.isInteger(trustedProxyHops) ? trustedProxyHops : false);
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  if (process.env.NODE_ENV === "production") res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});
const allowedOrigins = getAllowedOrigins();
app.use(cors({ origin(origin, callback) { callback(null, !origin || allowedOrigins.includes(origin)); } }));
app.use(express.json({ limit: "32kb", strict: true }));
app.use((_req, res, next) => { res.setHeader("Cache-Control", "no-store"); next(); });
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/admin", adminRouter);
app.use("/api/enquiries", enquiriesRouter);
app.use((_req, res) => res.status(404).json({ message: "Route not found." }));

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ message: Object.values(error.errors)[0]?.message || "Invalid enquiry." });
    return;
  }
  res.status(500).json({ message: "Something went wrong. Please try again." });
};
app.use(errorHandler);
