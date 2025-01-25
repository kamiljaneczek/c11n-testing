import { expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

/**
 * This function returns the URL of the C11n application.
 * @returns The URL of the C11n application.
 */
export function getInfinityURL() {
  return `${process.env.BASE_URL}/app/${process.env.APP_NAME}`;
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

export async function authenticateAPI(): Promise<string> {
  const oauth2TokenURL = `${process.env.BASE_URL}/PRRestService/oauth2/v1/token`;

  const myHeaders = new Headers();
  myHeaders.append("content-type", "application/x-www-form-urlencoded");

  // Create form data in the body instead of headers
  const formData = new URLSearchParams();
  formData.set("grant_type", "client_credentials");
  formData.set("client_id", process.env.CLIENT_ID!);
  formData.set("client_secret", process.env.CLIENT_SECRET!);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData.toString(),
  };

  try {
    const response = await fetch(oauth2TokenURL, requestOptions);
    const result = await response.json();
    const token = result.access_token;

    expect(token).toBeDefined();
    expect(token).not.toBe("");
    return token;
  } catch (error) {
    console.error("Error authenticating API:", error);
    throw error;
  }
}
