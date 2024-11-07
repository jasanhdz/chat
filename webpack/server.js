const { merge } = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./common');

module.exports = merge(common, {
  entry: {
    server: './server/main.ts',
  },
  target: 'node',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [webpackNodeExternals()],
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: 'public' }],
    }),
  ],
});
