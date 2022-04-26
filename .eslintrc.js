module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-spacing': 'off',
    'key-spacing':'off',
    'comma-spacing':'off',
    'space-before-blocks':'off',
    'no-trailing-spaces':'off',
    'no-multiple-empty-lines':'off',
    'space-before-function-paren':'off',
    'object-curly-spacing':'off',
    semi:'off'
  }
}
