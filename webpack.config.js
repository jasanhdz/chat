const path = require('path');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
        '@': path.resolve(__dirname, 'src'),
        '@config': path.resolve(__dirname, 'src/config/index'),
    },
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
