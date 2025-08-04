import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import hooks from 'eslint-plugin-react-hooks'

// console.log('hooks', hooks.configs)
console.log('react.configs.flat.recommended', react.configs.flat)

export default defineConfig([
  {
    files: ['renderer/**/*.js'],
    ...hooks.configs['recommended-latest'],
  },
  {
    files: ['renderer/**/*.js'],
    ...react.configs.flat.all,
    languageOptions: {
      ...react.configs.flat.all.languageOptions,
      globals: {
        ...globals.browser,
        preload: 'readonly',
      },
    },
    rules: {
      ...getCommonRules(),
      ...react.configs.flat.all.rules,
      // ...react.configs.flat.recommended.rules,
      'react/jsx-indent': ['warn', 2],
      'react/jsx-no-literals': 'off',
      'react/jsx-wrap-multilines': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-closing-tag-location': ['warn', 'line-aligned'],
      'react/jsx-filename-extension': ['warn', { 'extensions': ['.js'] }],
    },
  },
  {
    files: ['**/*.js'],
    ignores: ['renderer/**/*.js', 'webpack/**', '.webpack/**', '.build/**'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        'FORGE_WEBPACK_ENTRY': 'readonly',
        'FORGE_PRELOAD_WEBPACK_ENTRY': 'readonly',
      },
    },
    rules: {
      ...getCommonRules(),
      'no-console': ['warn', { 'allow': ['error'] }],
    },
  },
])

function getCommonRules () {
  return {
    'curly': ['warn', 'all'],
    'eqeqeq': ['warn', 'smart'],
    semi: ['warn', 'never'],
    'quotes': ['warn', 'single'],
    'semi-spacing': ['warn', { 'before': false, 'after': true }],
    'no-console': ['warn', { 'allow': ['error', 'warn', 'info'] }],
    'no-unused-vars': ['warn', { 'vars': 'local', 'args': 'none', 'ignoreRestSiblings': true, 'varsIgnorePattern': '[iI]gnored' }],
  }
}
