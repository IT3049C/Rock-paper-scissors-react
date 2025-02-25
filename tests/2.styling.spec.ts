import { test, expect } from '@playwright/test';

test.describe("Styling Checks", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("divs have correct borders", async ({ page }) => {
    const welcomeDiv = page.locator("#welcome-screen");
    await expect(welcomeDiv).toHaveCSS("border", "1px solid rgb(0, 0, 0)");

    // Navigate to game screen first
    await page.fill("#username", "John");
    await page.click("#start-game-button");
    
    const gameDiv = page.locator("#game-screen");
    await expect(gameDiv).toHaveCSS("border", "1px solid rgb(255, 0, 0)");
  });

  test("buttons have the correct classes", async ({ page }) => {
    await page.fill("#username", "John");
    const startButton = page.locator("#start-game-button");
    await expect(startButton).toHaveClass(/btn btn-primary/);

    // Navigate to game screen to test go button
    await page.click("#start-game-button");
    const goButton = page.locator("#go-button");
    await expect(goButton).toHaveClass(/btn btn-success/);
  });

  test("forms should contain form-group class within inputs", async ({ page }) => {
    // Check welcome screen form group
    let formGroups = page.locator(".form-group");
    await expect(formGroups).toHaveCount(1);

    // Navigate to game screen and check both form groups
    await page.fill("#username", "John");
    await page.click("#start-game-button");
    formGroups = page.locator(".form-group");
    await expect(formGroups).toHaveCount(1);
  });

  test("inputs and selects have the correct Bootstrap classes", async ({ page }) => {
    const input = page.locator("#username");
    await expect(input).toHaveClass(/form-control/);

    // Navigate to game screen to test select
    await page.fill("#username", "John");
    await page.click("#start-game-button");
    const select = page.locator("#user-selection");
    await expect(select).toHaveClass(/custom-select/);
  });
});
