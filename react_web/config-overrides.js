// config-overrides.js
const { override, addWebpackModuleRule, addWebpackPlugin } = require('customize-cra');

const ignoreWarningsPlugin = (config) => {
  config.ignoreWarnings = [
    {
      module: /@react-aria\/ssr/,
      message: /Failed to parse source map/,
    },
  ];
  return config;
};

module.exports = override(
  ignoreWarningsPlugin,
  addWebpackModuleRule({
    test: /\.mjs$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: /node_modules/,
  })
);
