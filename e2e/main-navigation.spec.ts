//ts-check

import { expect } from '@playwright/test';
import { test } from './fixtures';

test('Menu is working', async ({ c11n }) => {
    // The page.goto('/') is now automatically handled by the custom fixture
    await expect(c11n.page.getByLabel('Main')).toBeVisible();


});         