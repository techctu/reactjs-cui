var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.jsx?/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: path.join(__dirname, 'src/styles')
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loaders: ['url?limit=8192'],
            include: path.join(__dirname, 'src/assets')
        }]
    }
};
