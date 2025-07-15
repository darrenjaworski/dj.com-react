# Playwright Tests for dj.com-react

This directory contains end-to-end tests for the personal website application using Playwright.

## Test Structure

### Test Files

- **`basic.spec.ts`** - Basic functionality tests including page loading, responsiveness, and console error checks
- **`home.spec.ts`** - Tests for the home page content, social links, and email link
- **`navigation.spec.ts`** - Tests for navigation between pages and single-page application behavior
- **`journalism.spec.ts`** - Tests for the journalism page content and article structure
- **`journalism-data.spec.ts`** - Tests for journalism data integrity and structure validation
- **`theme.spec.ts`** - Tests for theme toggle functionality, system preference detection, and theme persistence
- **`mobile.spec.ts`** - Tests for mobile responsiveness and different viewport sizes
- **`accessibility.spec.ts`** - Tests for accessibility features including keyboard navigation, ARIA labels, and semantic HTML
- **`external-links.spec.ts`** - Tests for external links, social media links, and proper link attributes

## Running the Tests

### Prerequisites

1. Make sure you have Node.js installed
2. Install dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install`

### Running Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run a specific test file
npx playwright test tests/home.spec.ts

# Run tests with debugging
npx playwright test --debug
```

### Test Reports

```bash
# Generate and view HTML report
npm run test:e2e:report

# The report will be available at playwright-report/index.html
```

## Test Coverage

The tests cover the following areas:

### Functionality

- Page loading and rendering
- Navigation between pages
- Theme toggle functionality
- Social media links
- Email contact link
- External article links
- Journalism data display

### Accessibility

- Keyboard navigation
- ARIA labels
- Semantic HTML structure
- Screen reader compatibility
- Focus indicators
- Color contrast (light/dark themes)

### Responsive Design

- Mobile viewport testing
- Tablet viewport testing
- Different screen orientations
- Touch interaction compatibility

### Performance & Quality

- Console error detection
- External link security (noopener/noreferrer)
- Valid HTML structure
- Proper meta tags

## Configuration

The tests are configured in `playwright.config.ts` with the following settings:

- **Base URL**: `http://localhost:4173` (Vite preview server)
- **Test Directory**: `./tests`
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile Testing**: Pixel 5, iPhone 12
- **Retries**: 2 on CI, 0 locally
- **Traces**: Collected on first retry

## CI/CD Integration

The tests are integrated with GitHub Actions through `.github/workflows/playwright.yml`:

- Runs on push to main branch
- Runs on pull requests
- Generates and uploads test reports as artifacts
- Runs on Ubuntu latest with Node.js

## Writing New Tests

When adding new tests:

1. Follow the existing naming convention: `feature.spec.ts`
2. Use descriptive test names that explain what is being tested
3. Group related tests using `test.describe()`
4. Use `beforeEach` for common setup
5. Include accessibility considerations
6. Test both desktop and mobile viewports when relevant
7. Add proper assertions with meaningful error messages

## Common Test Patterns

```typescript
// Basic page test
test("should display page content", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
});

// Navigation test
test("should navigate to page", async ({ page }) => {
  await page.goto("/");
  await page.locator('a[href="/journalism"]').click();
  await expect(page.locator("h1")).toContainText("journalism");
});

// Mobile responsive test
test("should work on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await expect(page.locator("nav")).toBeVisible();
});
```

## Troubleshooting

### Common Issues

1. **Tests fail locally but pass in CI**

   - Check that you're using the correct base URL
   - Ensure the dev server is running (`npm run preview`)

2. **Flaky tests**

   - Add appropriate waits with `page.waitForSelector()`
   - Use `expect.poll()` for dynamic content

3. **Mobile tests failing**
   - Verify viewport is set correctly
   - Check that touch interactions work properly

### Debug Tips

- Use `--headed` flag to see browser actions
- Add `await page.pause()` to stop execution and inspect
- Use `page.screenshot()` to capture visual state
- Check browser console with `page.on('console', ...)`
