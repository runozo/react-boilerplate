const CopyPlugin = require('copy-webpack-plugin');
var envFile = require('node-env-file');
var path = require('path');
var webpack = require('webpack');

envFile('./config/production.env', {verbose: true, overwrite: true, raise: false, logger: console});

module.exports = {
    mode: 'production',
    entry: [
        './app/app.jsx'
    ],
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/react-boilerplate/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', './app/components', './app/api'],
        alias: {
            applicationStyles: path.resolve(__dirname, 'app/styles/app.scss'),
            api: path.resolve(__dirname, 'app/api/api.jsx'),
            actions: path.resolve(__dirname, 'app/actions/actions.jsx'),
            reducers: path.resolve(__dirname, 'app/reducers/reducers.jsx'),
            configureStore: path.resolve(__dirname, 'app/store/configureStore.jsx'),
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
     plugins: [
        new CopyPlugin([
        { from: './public/index.html', to: 'index.html' }
        ]),
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ]
 };