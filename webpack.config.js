var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './app/app.jsx'
    ],
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            applicationStyles: path.resolve(__dirname, 'app/styles/app.scss')
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
    },
    // Loaders
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: ['babel-loader'],
            },
            // CSS Files
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };