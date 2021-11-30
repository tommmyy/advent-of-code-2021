module.exports = {
  extends: ['eslint-config-lundegaard/base'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.mjs'],
  },
  rules: {
    curly: 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'mock/**',
          'scripts/**',
          'testsSetup.js',
          '**/*.test.js',
          'apps/**/*.test.js',
          'apps/**/scripts/*.js',
          'apps/**/gatsby-*.js',
          'packages/dashboard-icons/*.js',
          'jestPreprocess.js',
        ],
      },
    ],
  },
};
