import { FlatCompat } from '@eslint/eslintrc';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default [
  // Legacy configs
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:prettier/recommended'),

  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        // Node.js
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
        // Jest
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
    },

    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      camelcase: ['error', { ignoreImports: true }],
      'comma-spacing': ['error', { before: false, after: true }],
      eqeqeq: ['error', 'always'],
      'max-depth': ['error', { max: 3 }],
      'max-len': ['error', { code: 120, tabWidth: 2 }],
      'max-lines-per-function': ['error', { max: 65, skipBlankLines: true, skipComments: true }],
      'max-nested-callbacks': ['error', 3],
      'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
      'no-console': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-eq-null': 'error',
      'no-magic-numbers': [
        'warn',
        { ignore: [1], ignoreArrayIndexes: true, ignoreDefaultValues: true, detectObjects: true },
      ],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      indent: ['error', 2, { SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] }],
      semi: 'error',
      quotes: ['error', 'single'],
      'no-use-before-define': 'error',
      'no-var': 'error',
      'arrow-parens': ['error', 'always'],
      'linebreak-style': ['error', 'unix'],
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
    },
  },

  // Ignore legacy config file
  {
    files: ['**/*'],
    ignores: ['.eslintrc.js'],
  },
];
