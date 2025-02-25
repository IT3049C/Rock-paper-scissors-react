import { test, expect } from '@playwright/test';

test.describe("Game Controller Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Game Div Hidden when starting the game", async ({ page }) => {
    const gameDiv = page.locator("#game-screen");
    await expect(gameDiv).toHaveCount(0);
  });

  test("Welcome Div Visible when starting the game", async ({ page }) => {
    const welcomeDiv = page.locator("#welcome-screen");
    await expect(welcomeDiv).toBeVisible();
  });

  test("Game Div becomes visible after starting the game", async ({ page }) => {
    const welcomeDiv = page.locator("#welcome-screen");
    const gameDiv = page.locator("#game-screen");

    // Fill name first since start button requires it
    await page.fill("#username", "John");
    await page.click("#start-game-button");

    await expect(welcomeDiv).not.toBeVisible();
    await expect(gameDiv).toBeVisible();
  });

  test("Username is captured and displayed in the score tally", async ({ page }) => {
    const nameInput = page.locator("#username");
    await nameInput.fill("John");
    await page.click("#start-game-button");

    const scoreTally = page.locator("#score");
    await expect(scoreTally).toHaveText(/john: 0 v cpu: 0/i);
  });

  test("Game history updates after selection", async ({ page }) => {
    await page.fill("#username", "John");
    await page.click("#start-game-button");

    await page.selectOption("#user-selection", "rock");
    await page.click("#go-button");

    const gameHistory = page.locator("#game-history li");
    await expect(gameHistory).toHaveCount(1);
    await expect(gameHistory.first()).toContainText(/john selected rock/i);
  });

  test("Score updates correctly based on game results", async ({ page }) => {
    await page.fill("#username", "John");
    await page.click("#start-game-button");

    // Play multiple rounds until CPU gets 3 points
    while (!(await page.locator("#score").textContent())?.includes("CPU: 3")) {
      await page.selectOption("#user-selection", "rock");
      await page.click("#go-button");
    }

    const finalScore = await page.locator("#score").textContent();
    expect(finalScore).toMatch(/john: \d+ v cpu: 3/i);
  });
});
