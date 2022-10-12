module.exports = {

  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2,
  },
  plugins: ["chai-friendly", "cypress"],
};