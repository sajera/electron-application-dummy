const js = require('@eslint/js')
const globals = require('globals')
const react = require('eslint-plugin-react')
const { defineConfig } = require('eslint/config')
const hooks = require('eslint-plugin-react-hooks')

module.exports = defineConfig([
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
      ...react.configs.flat.recommended.rules,
      'react/jsx-indent': ['warn', 2],
      'react/prop-types': 'off', // with the release of React 19 where PropTypes are removed ¯\_(ツ)_/¯
      'react/jsx-closing-tag-location': ['warn', 'line-aligned'],
      'react/jsx-filename-extension': ['warn', { extensions: ['.js'] }],
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
        FORGE_WEBPACK_ENTRY: 'readonly',
        FORGE_PRELOAD_WEBPACK_ENTRY: 'readonly',
      },
    },
    rules: {
      ...getCommonRules(),
      'no-console': ['warn', { allow: ['error', 'info'] }],
    },
  },
])

function getCommonRules () {
  return {
    curly: ['warn', 'all'],
    eqeqeq: ['warn', 'smart'],
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'quote-props': ['warn', 'as-needed'],
    'no-console': ['warn', { allow: ['error'] }],
    'semi-spacing': ['warn', { before: false, after: true }],
    'no-unused-vars': ['warn', { vars: 'local', args: 'none', ignoreRestSiblings: true, varsIgnorePattern: '[iI]gnored' }],
  }
}
