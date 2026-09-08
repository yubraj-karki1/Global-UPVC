import type { RequestHandler } from "express";

type Entry = { count: number; resetsAt: number };

export function rateLimit({ windowMs, max }: { windowMs: number; max: number }): RequestHandler {
  const requests = new Map<string, Entry>();
  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const current = requests.get(key);
    const entry = !current || current.resetsAt <= now ? { count: 0, resetsAt: now + windowMs } : current;
    entry.count += 1;
    requests.set(key, entry);
    res.setHeader("RateLimit-Limit", max);
    res.setHeader("RateLimit-Remaining", Math.max(0, max - entry.count));
    res.setHeader("RateLimit-Reset", Math.ceil(entry.resetsAt / 1000));
    if (entry.count > max) {
      res.status(429).json({ message: "Too many requests. Please wait and try again." });
      return;
    }
    if (requests.size > 5000) for (const [storedKey, value] of requests) if (value.resetsAt <= now) requests.delete(storedKey);
    next();
  };
}
