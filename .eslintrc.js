module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint',
    'prettier',
    'import',
    'sonarjs',
    '@tanstack/query',
  ],
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'prettier',
    'plugin:unicorn/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  env: {
    browser: true,
    es6: true,
  },
  ignorePatterns: ['.eslintrc.js', 'vite*'],
  rules: {
    'import/no-unresolved': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'unicorn/catch-error-name': 'warn',
    'unicorn/error-message': 'warn',
    'import/no-cycle': 2,
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: ['react-app-env.d.ts'],
      },
    ],
    'react/display-name': ['off', { ignoreTranspilerName: true }],
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ], //should add ".ts" if typescript project
    // двоеточия в конце
    'semi': ['warn', 'always'],
    'no-console': 'warn',
    // использовать константы
    'prefer-const': 'error',
    // максимальная длинна куска кода
    'max-len': ['error', { code: 150 }],
    // // импорты
    // 'import/order': [
    //   'warn',
    //   {
    //     'groups': [
    //       'builtin',
    //       'external',
    //       'internal',
    //       'parent',
    //       'sibling',
    //       'index',
    //       'object',
    //       'type',
    //     ],
    //     'newlines-between': 'always-and-inside-groups',
    //   },
    // ],
    // возможность задавать значения нулл
    'unicorn/no-null': 'off',
    'react/jsx-no-undef': 'off',
    'react/prop-types': 'off',
    '@tanstack/query/exhaustive-deps': 'error',
  },
};
