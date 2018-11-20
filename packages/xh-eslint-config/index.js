module.exports = {
  extends: [
    'eslint-config-airbnb',
  ].map(require.resolve),
  rules: {
    "quotes": 0,
    "comma-dangle": "off",
    "no-param-reassign": "off",
    "react/forbid-prop-types": "off",
    "no-console": "off",
    "eol-last": "off",
    "no-plusplus": "off",
    "no-unused-vars": "warn",
    "no-trailing-spaces": "off",
    "prefer-destructuring": "off",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": "off",
    "react/prefer-stateless-function": "off",
    "react/destructuring-assignment": "off",
    "react/no-find-dom-node": "off",
    "no-mixed-operators": "off",
    "react/require-default-props": "off"
  },
  "env": {
    "es6": true,
    "node": true,
    "mocha": true,
    "browser": true,
    "jquery": true,
    "jasmine": true
  }
};
