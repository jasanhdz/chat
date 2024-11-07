const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./common');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = merge(common, {
  entry: {
    app: './client/main.ts'
  },
  target: 'web',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    static: path.join(__dirname, '../dist/public'),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: {
      index: 'index.html'
    }
  }
});
