import { test, expect } from "@playwright/test";

test.describe("External Links and Integrations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have proper external link attributes", async ({ page }) => {
    const socialLinks = [
      { name: "instagram", url: "https://www.instagram.com/darrenjaws/" },
      {
        name: "bluesky",
        url: "https://bsky.app/profile/darrenjaws.bsky.social",
      },
      { name: "flickr", url: "https://flickr.com/photos/156906593@N08/" },
      { name: "linkedin", url: "https://www.linkedin.com/in/darrenjaworski" },
      { name: "github", url: "https://github.com/darrenjaworski" },
      { name: "strava", url: "https://www.strava.com/athletes/3266824" },
    ];

    for (const { name, url } of socialLinks) {
      const link = page.getByTestId(`social-link-${name}`);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", url);

      // External links should not have target="_blank" on home page social links
      // They are designed to open in the same tab based on the code
      const target = await link.getAttribute("target");
      expect(target).toBeNull();
    }
  });

  test("should have proper resume link", async ({ page }) => {
    const resumeLink = page.getByTestId("resume-link");
    await expect(resumeLink).toBeVisible();
    await expect(resumeLink).toHaveText("résumé");
    await expect(resumeLink).toHaveAttribute("href", /.+docs\.google\.com.+/);

    // Resume link should not have target="_blank" based on the code
    const target = await resumeLink.getAttribute("target");
    expect(target).toBeNull();
  });

  test("should have proper journalism article links", async ({ page }) => {
    await page.getByTestId("nav-journalism").click();

    // Wait for journalism page to load
    await expect(page.getByTestId("journalism-page")).toBeVisible();

    // Get article links from Oklahoma Watch section
    const oklahomaWatchSection = page.getByTestId(
      "journalism-section-oklahoma-watch"
    );
    const articleLinks = oklahomaWatchSection.locator("a");
    const count = await articleLinks.count();

    for (let i = 0; i < count; i++) {
      const link = articleLinks.nth(i);

      // Article links should open in new tab
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");

      // Should have valid href
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });

  test("should prevent tabnabbing on external links", async ({ page }) => {
    await page.getByTestId("nav-journalism").click();

    // Wait for journalism page to load
    await expect(page.getByTestId("journalism-page")).toBeVisible();

    const oklahomaWatchSection = page.getByTestId(
      "journalism-section-oklahoma-watch"
    );
    const articleLinks = oklahomaWatchSection.locator('a[target="_blank"]');
    const count = await articleLinks.count();

    for (let i = 0; i < count; i++) {
      const link = articleLinks.nth(i);
      const rel = await link.getAttribute("rel");
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
    }
  });

  test("should handle email link properly", async ({ page }) => {
    const emailLink = page.getByTestId("email-link");
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveText("darrenjaworski@gmail.com");
    await expect(emailLink).toHaveAttribute(
      "href",
      "mailto:darrenjaworski@gmail.com"
    );

    // Email links should not have target="_blank"
    const target = await emailLink.getAttribute("target");
    expect(target).toBeNull();
  });

  test("should have valid social media links", async ({ page }) => {
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

    for (const social of socialLinks) {
      const link = page.getByTestId(`social-link-${social.testId}`);
      await expect(link).toBeVisible();
      await expect(link).toHaveText(social.name);

      // Verify the href is exactly what we expect
      const href = await link.getAttribute("href");
      expect(href).toBe(social.url);
    }
  });

  test("should display social links with proper formatting", async ({
    page,
  }) => {
    // Check that social links are displayed with commas between them
    const socialLinksContainer = page.getByTestId("social-links");
    await expect(socialLinksContainer).toBeVisible();

    const socialText = await socialLinksContainer.textContent();
    expect(socialText).toContain(
      "Instagram, Bluesky, Flickr, LinkedIn, Github, Strava"
    );
  });

  test("should handle journalism data structure", async ({ page }) => {
    await page.getByTestId("nav-journalism").click();

    // Check that journalism sections are properly structured
    const oklahomaWatchSection = page.getByTestId(
      "journalism-section-oklahoma-watch"
    );
    await expect(oklahomaWatchSection).toBeVisible();

    // Each section should have articles
    const articleList = oklahomaWatchSection.locator("ul");
    await expect(articleList).toBeVisible();

    const articles = articleList.locator("li");
    await expect(articles.first()).toBeVisible();
  });
});
