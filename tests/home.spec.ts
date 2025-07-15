import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the home page by default", async ({ page }) => {
    await expect(page).toHaveTitle("darrenjaworski.com");
    await expect(page.getByTestId("home-page")).toBeVisible();
    await expect(page.locator("h1")).toContainText("home");
  });

  test("should display welcome message", async ({ page }) => {
    await expect(
      page.getByTestId("home-page").locator("p").first()
    ).toContainText("Welcome. This is my home on the web");
  });

  test("should display email link", async ({ page }) => {
    const emailLink = page.getByTestId("email-link");
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveText("darrenjaworski@gmail.com");
  });

  test("should display social links", async ({ page }) => {
    const socialLinks = [
      {
        name: "Instagram",
        testId: "instagram",
        url: "https://www.instagram.com/darrenjaws/",
      },
      {
        name: "Bluesky",
        testId: "bluesky",
        url: "https://bsky.app/profile/darrenjaws.bsky.social",
      },
      {
        name: "Flickr",
        testId: "flickr",
        url: "https://flickr.com/photos/156906593@N08/",
      },
      {
        name: "LinkedIn",
        testId: "linkedin",
        url: "https://www.linkedin.com/in/darrenjaworski",
      },
      {
        name: "Github",
        testId: "github",
        url: "https://github.com/darrenjaworski",
      },
      {
        name: "Strava",
        testId: "strava",
        url: "https://www.strava.com/athletes/3266824",
      },
    ];

    for (const link of socialLinks) {
      const socialLink = page.getByTestId(`social-link-${link.testId}`);
      await expect(socialLink).toBeVisible();
      await expect(socialLink).toHaveText(link.name);
    }
  });

  test("should display resume link", async ({ page }) => {
    const resumeLink = page.getByTestId("resume-link");
    await expect(resumeLink).toBeVisible();
    await expect(resumeLink).toHaveText("résumé");
  });

  test("should display dark theme text", async ({ page }) => {
    await expect(
      page.getByTestId("home-page").locator("p").last()
    ).toContainText("Now with dark theme");
  });

  test("should have working journalism link", async ({ page }) => {
    const journalismLink = page.getByTestId("journalism-link");
    await expect(journalismLink).toBeVisible();
    await expect(journalismLink).toHaveText("journalism.");
  });
});
