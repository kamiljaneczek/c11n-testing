import { APIRequestContext, request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class TestRunner {

  private context: APIRequestContext | null = null;

  async setup() {
    this.context = await request.newContext({
      baseURL: process.env.BASE_URL, // Set your base URL here
      extraHTTPHeaders: {
        // Add any headers you need here
      }
    });
  }

  async teardown() {
    if (this.context) await this.context.dispose();
  }

  async getContext(): Promise<APIRequestContext> {
    if (!this.context) {
      await this.setup();
    }
    return this.context!;
  }
} 