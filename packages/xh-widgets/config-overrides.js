const path = require('path');
const {
  override,
  addDecoratorsLegacy,
  addWebpackAlias,
  useBabelRc,
  useEslintRc
} = require('customize-cra');

// entry: [
//   isEnvDevelopment &&
//     require.resolve('react-dev-utils/webpackHotDevClient'),
//   paths.appIndexJs,
// ]

const overrideEntry = () => config => {
  const entry = config.entry;
  entry[1] = 'src/app.js';
  return config;
};

module.exports = {
  webpack: override(
    useEslintRc(),
    useBabelRc(),
    addDecoratorsLegacy(),
    addWebpackAlias({ src: path.join(__dirname, 'src') }),
    overrideEntry()
  ),
  jest(config) {
    config.testMatch = ['**/__tests__/*.js?(x)'];
    return config;
  }
};
