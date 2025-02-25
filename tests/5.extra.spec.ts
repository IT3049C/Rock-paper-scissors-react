import { test, expect } from '@playwright/test';

test.describe("Extra Features Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Reset button has the correct styling", async ({ page }) => {
    // Navigate to game screen first
    await page.fill("#username", "John");
    await page.click("#start-game-button");

    const resetButton = page.locator("#reset-game-button");
    await expect(resetButton).toHaveClass(/btn btn-secondary/);
    await expect(resetButton).toBeVisible();
  });

  test("Reset button appears after game starts", async ({ page }) => {
    const resetButton = page.locator("#reset-game-button");
    await expect(resetButton).toHaveCount(0);

    await page.fill("#username", "John");
    await page.click("#start-game-button");

    await expect(resetButton).toBeVisible();
  });

  test("Reset button functionality", async ({ page }) => {
    // Start game and play one round
    await page.fill("#username", "John");
    await page.click("#start-game-button");
    await page.selectOption("#user-selection", "rock");
    await page.click("#go-button");

    // Verify game has history
    const gameHistory = page.locator("#game-history li");
    await expect(gameHistory).toHaveCount(1);

    // Click reset and verify it clears history
    await page.click("#reset-game-button");
    await expect(gameHistory).toHaveCount(0);
    await expect(page.locator("#score")).toHaveText(/john: 0 v cpu: 0/i);
  });
});