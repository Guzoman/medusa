const defineJestConfig = require("../../define_jest_config")

module.exports = defineJestConfig({
  modulePathIgnorePatterns: ["__fixtures__", "node_modules", "dist"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
})
