var envFile = require('node-env-file');
var path = require('path');
var webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
    envFile('./config/development.env', {verbose: true, overwrite: true, raise: false, logger: console});
} catch (e) {

}

module.exports = {
    mode: process.env.NODE_ENV,
    entry: [
        './app/app.jsx'
    ],
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', './app/components', './app/api'],
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
            { test: /\.jsx?$/, exclude: /(node_modules)/, use: ['babel-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader'},
            { test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, use: 'file-loader' },
            { test: /\.(png|jp(e*)g|svg)$/, use: [{loader: 'url-loader', options:
                {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
                }
            }
        ]
      }
        ],
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };