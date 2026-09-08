import mongoose from "mongoose";
import { app } from "./app.js";
import { validateServerEnv } from "./config.js";

validateServerEnv();

const port = Number(process.env.PORT) || 5000;
const mongoUri = process.env.MONGODB_URI;

async function start() {
  await mongoose.connect(mongoUri as string);
  app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
}
start().catch((error) => { console.error("Failed to start server:", error); process.exit(1); });
