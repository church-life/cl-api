// @ts-check

/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  arrowParens: 'always',
  bracketSpacing: true,
  jsxSingleQuote: true,
  semi: true,
  trailingComma: 'all',

  plugins: [
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
  ],

  importOrder: ['<THIRD_PARTY_MODULES>', '', '^@/(.*)$', '', '^[./]'],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
};
