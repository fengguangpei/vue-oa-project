module.exports = {
  root: true,
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true
  },
  rules: {
    'prettier/prettier': 'warn'
  }
}
