import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type AdminRequest = Request & { admin?: string };

function jwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is required.");
  return secret;
}

export function createAdminToken(username: string) {
  return jwt.sign({ sub: username, role: "admin" }, jwtSecret(), { expiresIn: "8h", issuer: "global-upvc-api", audience: "global-upvc-admin" });
}

export function requireAdmin(req: AdminRequest, res: Response, next: NextFunction) {
  const header = req.header("authorization");
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Admin authentication required." });
    return;
  }
  try {
    const payload = jwt.verify(header.slice(7), jwtSecret(), { issuer: "global-upvc-api", audience: "global-upvc-admin" });
    if (typeof payload === "string" || payload.role !== "admin" || typeof payload.sub !== "string") throw new Error("Invalid token");
    req.admin = payload.sub;
    next();
  } catch {
    res.status(401).json({ message: "Your admin session is invalid or expired." });
  }
}
