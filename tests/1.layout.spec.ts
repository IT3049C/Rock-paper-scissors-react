import { test, expect } from '@playwright/test';

test.describe("Layout Checks", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/`);
  });

  test("Page has the correct title and heading", async ({ page }) => {
    await expect(page).toHaveTitle(/rock paper scissors/i);
    await expect(page.getByRole(`heading`, { level: 1 })).toHaveText(/rock paper scissors/i);
  });

  test("There are two divs: welcome-screen and game-screen", async ({ page }) => {
    await expect(page.locator("#welcome-screen")).toBeVisible();
    await expect(page.locator("#game-screen")).toHaveCount(0);
  });

  test("Welcome screen includes a form for the name and a start button", async ({ page }) => {
    const formLocator = page.locator("#welcome-screen form");
    await expect(formLocator).toBeVisible();

    const nameInput = formLocator.getByLabel(/type your name/i);
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveAttribute("placeholder", /enter name here/i);

    const startButton = formLocator.getByRole("button");
    await expect(startButton).toHaveCount(0);
  });

  test("Start Game Button should appear after entering a name", async ({ page }) => {
    const nameInput = page.locator("#username");
    await nameInput.fill("John");
    await expect(nameInput).toHaveValue("John");

    const startButton = page.locator("#start-game-button");
    await expect(startButton).toBeVisible();
    await expect(startButton).toHaveText(/start game/i);
  });


  test("Game screen has a section for score tally", async ({ page }) => {
    // Enter name and start the game
    await page.fill("#username", "John");
    await page.click("#start-game-button");
  
    // Now the game screen should be visible
    const scoreTallyDiv = page.locator("#game-screen #score-tally");
    await expect(scoreTallyDiv).toBeVisible(); // Check visibility after starting the game
  
    const scoreParagraph = scoreTallyDiv.locator("p#score");
    await expect(scoreParagraph).toBeVisible();
    await expect(scoreParagraph).toHaveText(/john: 0 v cpu: 0/i);
  });

  test("Game screen includes a form with a dropdown and a button", async ({ page }) => {
    await page.fill("#username", "John");
    await page.click("#start-game-button");
    
    const dropdown = page.locator("select#user-selection");
  
    const goButton = page.locator("#go-button");
  
    await expect(page.locator("#game-screen")).toBeVisible();
    await expect(dropdown).toBeVisible();
    await expect(goButton).toBeVisible();
  });
});