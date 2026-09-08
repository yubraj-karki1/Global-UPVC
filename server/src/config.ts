export function getAllowedOrigins(): string[] {
  return (process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:3001")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function validateServerEnv() {
  const required = ["MONGODB_URI", "ADMIN_USERNAME", "ADMIN_PASSWORD", "JWT_SECRET"] as const;

  for (const key of required) {
    const value = process.env[key];
    if (!value || value.trim().length === 0) {
      throw new Error(`${key} is required. Copy server/.env.example to server/.env and configure it.`);
    }
  }

  if (process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters long.");
  }

  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long.");
  }

  if (process.env.NODE_ENV === "production") {
    if (process.env.ADMIN_PASSWORD === "GlobalUPVC@Admin2026") {
      throw new Error("ADMIN_PASSWORD must be changed before production deployment.");
    }
    if (process.env.JWT_SECRET === "replace-with-at-least-32-random-characters") {
      throw new Error("JWT_SECRET must be changed before production deployment.");
    }
  }
}
