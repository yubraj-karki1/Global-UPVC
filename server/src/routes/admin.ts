import { timingSafeEqual } from "node:crypto";
import { Router } from "express";
import { createAdminToken } from "../middleware/adminAuth.js";
import { rateLimit } from "../middleware/rateLimit.js";

export const adminRouter = Router();

function secureEqual(input: unknown, expected: string) {
  if (typeof input !== "string") return false;
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);
  return inputBuffer.length === expectedBuffer.length && timingSafeEqual(inputBuffer, expectedBuffer);
}

adminRouter.post("/login", rateLimit({ windowMs: 15 * 60_000, max: 10 }), (req, res) => {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUsername || !expectedPassword || !process.env.JWT_SECRET) {
    res.status(503).json({ message: "Admin access is not configured." });
    return;
  }
  if (!secureEqual(req.body.username, expectedUsername) || !secureEqual(req.body.password, expectedPassword)) {
    res.status(401).json({ message: "Incorrect username or password." });
    return;
  }
  res.setHeader("Cache-Control", "no-store");
  res.json({ token: createAdminToken(expectedUsername), expiresIn: 28800 });
});
