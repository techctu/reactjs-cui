var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './scripts/index.js'
    ],
    output: {
        path: path.join(__dirname, 'asset'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'eval-source-map',
    debug: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?/,
            loaders: ['babel'],
            include: path.join(__dirname, 'scripts')
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: path.join(__dirname, 'scripts/styles')
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: path.join(__dirname, 'css')
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loaders: ['url?limit=8192'],
            include: path.join(__dirname, 'scripts/assets')
        }]
    }
};