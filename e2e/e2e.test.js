describe("visual regression testing", () => {
  const routes = ["projects", "", "journalism"];

  routes.forEach((route) => {
    it(`${route ? route : "app"} matches page render`, async () => {
      await page.goto(`http://localhost:3000/${route}`);
      const image = await page.screenshot({
        path: `e2e/__snapshots__/${route ? route : "app"}.png`,
        fullPage: true,
      });

      expect(image).toMatchImageSnapshot();
    });
  });
});
