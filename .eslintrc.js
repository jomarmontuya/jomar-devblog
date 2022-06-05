module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  // add your custom rules here
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
}
