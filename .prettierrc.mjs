// @ts-check
/**
 * @type { import('prettier').Config & {
 *   tailwindConfig: string;
 *   tailwindFunctions: string[];
 * }}
 */
export default {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  useTabs: false,
  tabWidth: 2,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-packagejson'],
};
