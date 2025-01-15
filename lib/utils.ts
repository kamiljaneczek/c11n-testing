import dotenv from "dotenv";

dotenv.config();

export function getInfinityURL() {
  return process.env.APP_URL;
}
