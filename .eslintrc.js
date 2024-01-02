module.exports = {
  extends: ['plugin:sonarjs/recommended', 'semistandard', 'standard'],
  rules: {
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ]
  },
  globals: {
    $: 'readonly'
  }
}
