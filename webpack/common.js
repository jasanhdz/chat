const path = require('path')

const common = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@config': path.resolve(__dirname, '../src/config/index'),
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
}

module.exports = {
    common,
}
