module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true
    }
  },
  plugins: ['react'],
  settings: {
    react: {
      pragma: 'React',
      version: '16.0'
    }
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'never'],
    'no-console': 0,
    'react/prop-types': 1,
    'no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true
      }
    ]
  }
}
