import { test, expect } from '@playwright/test';
import { RockPaperScissors } from '../src/rps';

test.describe("RockPaperScissors class", () => {
  test("determineWinner() win cases", () => {
    const game = new RockPaperScissors("Player");
    const results = [
      game.determineWinner("rock", "scissors"),
      game.determineWinner("scissors", "paper"),
      game.determineWinner("paper", "rock"),
    ];
    expect(results).toEqual(["win", "win", "win"]);
  });
  
  test("determineWinner() tie cases", () => {
    const game = new RockPaperScissors("Player");
    const results = [
      game.determineWinner("rock", "rock"),
      game.determineWinner("scissors", "scissors"),
      game.determineWinner("paper", "paper"),
    ];
    expect(results).toEqual(["tie", "tie", "tie"]);
  });
  
  test("determineWinner() lost cases", () => {
    const game = new RockPaperScissors("Player");
    const results = [
      game.determineWinner("scissors", "rock"),
      game.determineWinner("paper", "scissors"),
      game.determineWinner("rock", "paper"),
    ];
    expect(results).toEqual(["lose", "lose", "lose"]);
  });

  test("generateCPUResponse() returns valid values", () => {
    const game = new RockPaperScissors("Player");
    const results = Array.from({ length: 50 }, () => game.generateCPUResponse());
    const validOptions = ["rock", "paper", "scissors"];
    
    results.forEach(result => {
      expect(validOptions).toContain(result);
    });
  });
});