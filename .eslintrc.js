module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
        '*.e2e.js',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/tools.js',
      ],
      rules: {
        'react-native/no-unused-styles': 'error',
        '@typescript-eslint/no-shadow': ['error'],
        'react-hooks/exhaustive-deps': 'error',
        'no-shadow': 'off',
        'no-undef': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['..*', './../*'],
                message: 'Please use absolute import with @ instead',
              },
            ],
          },
        ],
        'no-restricted-modules': [
          'error',
          {
            patterns: ['src/assets/images/*', 'src/assets/lottie/*'],
          },
        ],
      },
      env: {
        jest: true,
        'jest/globals': true,
      },
    },
  ],
};
