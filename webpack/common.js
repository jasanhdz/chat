const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../server'),
      '@config': path.resolve(__dirname, '../server/config'),
      '@routes': path.resolve(__dirname, '../server/routes'),
      'app/': path.resolve(__dirname, '../client'),
      'vue$': 'vue/dist/vue.esm-bundler.js'
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  }
};
