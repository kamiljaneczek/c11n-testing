import dotenv from "dotenv";

dotenv.config();

/**
 * This function returns the URL of the C11n application.
 * @returns The URL of the C11n application.
 */
export function getInfinityURL() {
  return process.env.APP_URL;
}

export function getTellUsMoreUser(userName: string): { userName: string; password: string } {
  if (!process.env[`USERNAME_${userName.toUpperCase()}`] || !process.env[`PASSWORD_${userName.toUpperCase()}`]) {
    throw new Error(`Username or password for ${userName} is not set`);
  }
  return {
    userName: process.env[`USERNAME_${userName.toUpperCase()}`]!,
    password: process.env[`PASSWORD_${userName.toUpperCase()}`]!,
  };
}
