// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const drizzle = require('eslint-plugin-drizzle');

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      drizzle,
    },
    rules: Object.fromEntries(
      Object.keys(drizzle.rules).map((ruleName) => [`drizzle/${ruleName}`, 'error'])
    ),
  },
  {
    ignores: ['dist/*', 'components/ui/*'],
  },
]);
