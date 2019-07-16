module.exports = {
  preset: "jest-puppeteer",
  testRegex: "./*\\.test\\.js$",
  setupFilesAfterEnv: ["./jest.setup.js"]
};
