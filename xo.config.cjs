/** @type { import('xo').Options }  */
const config = {
  prettier: true,
  envs: ['es2022', 'browser'],
  rules: {
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
          kebabCase: true,
        },
      },
    ],
    'import/extensions': 'off',
    'n/file-extension-in-import': [
      'error',
      'never',
      {
        '.css': 'always',
      },
    ],
  },
};

module.exports = config;
