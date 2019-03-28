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
    "no-underscore-dangle": "off",
    "react/require-default-props": "off",
    "react/no-array-index-key": "off",
    "react/jsx-boolean-value": "off",
    "react/destructuring-assignment": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/forbid-prop-types": "off"
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
