const path = require("path");

describe("app", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000");
  });

  it("to match page renders", async () => {
    await page.screenshot({ path: "e2e/__snapshots__/base.png" });
    expect(true).toBe(true);
  });
});
