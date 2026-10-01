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

  const port = Number(process.env.PORT || 5000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer from 1 to 65535.");
  }

  if (process.env.TRUST_PROXY_HOPS && !/^\d+$/.test(process.env.TRUST_PROXY_HOPS)) {
    throw new Error("TRUST_PROXY_HOPS must be a non-negative integer.");
  }

  if (process.env.NODE_ENV === "production") {
    const productionOrigins = getAllowedOrigins();
    if (productionOrigins.length === 0 || productionOrigins.some((origin) => /^https?:\/\/localhost(?::\d+)?$/i.test(origin))) {
      throw new Error("ALLOWED_ORIGINS must contain the production website origin in production.");
    }
    if (process.env.TRUST_PROXY === "true" && !process.env.TRUST_PROXY_HOPS) {
      throw new Error("TRUST_PROXY_HOPS must be set when TRUST_PROXY=true in production.");
    }
    if (productionOrigins.some((origin) => {
      try {
        const parsed = new URL(origin);
        return parsed.origin !== origin || parsed.protocol !== "https:";
      } catch {
        return true;
      }
    })) {
      throw new Error("Each ALLOWED_ORIGINS value must be a valid HTTPS origin without a path or trailing slash.");
    }
    if (["change-this-password", "replace-with-a-unique-password-at-least-12-characters", "GlobalUPVC@Admin2026"].includes(process.env.ADMIN_PASSWORD || "")) {
      throw new Error("Set a unique ADMIN_PASSWORD before production deployment.");
    }
    if (["replace-with-a-long-random-secret", "replace-with-at-least-32-random-characters"].includes(process.env.JWT_SECRET || "")) {
      throw new Error("Set a unique JWT_SECRET before production deployment.");
    }
    if (process.env.ENQUIRY_NOTIFICATION_WEBHOOK_URL) {
      let webhook: URL;
      try {
        webhook = new URL(process.env.ENQUIRY_NOTIFICATION_WEBHOOK_URL);
      } catch {
        throw new Error("ENQUIRY_NOTIFICATION_WEBHOOK_URL must be a valid HTTPS URL.");
      }
      if (webhook.protocol !== "https:") {
        throw new Error("ENQUIRY_NOTIFICATION_WEBHOOK_URL must use HTTPS in production.");
      }
    }
  }
}
