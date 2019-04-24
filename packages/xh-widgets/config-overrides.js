const path = require('path');
const {
  override,
  addDecoratorsLegacy,
  addWebpackAlias,
  useBabelRc,
  useEslintRc
} = require('customize-cra');

const overrideOutput = () => config => {
  config.output.filename = 'static/js/bundle.js';
  delete config.optimization.splitChunks;
  config.optimization.runtimeChunk = false;
  return config;
};

module.exports = {
  webpack: override(
    useEslintRc(),
    useBabelRc(),
    addDecoratorsLegacy(),
    addWebpackAlias({ src: path.join(__dirname, 'src') }),
    // overrideOutput()
  ),
  jest(config) {
    config.testMatch = ['**/__tests__/*.js?(x)'];
    return config;
  }
};
