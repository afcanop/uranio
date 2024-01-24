module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'import/order': [
      'error',
      {'newlines-between': 'always', alphabetize: {order: 'asc'}},
    ],
  },
};
