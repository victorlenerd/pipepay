const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

module.exports = {
    target: 'node',
    mode: 'none',
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    devtool: 'cheap-module-source-map',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|ts)/,
                include: path.resolve('src'), // instrument only testing sources with Istanbul, after ts-loader runs
                loader: 'istanbul-instrumenter-loader',
                query: {
                    esModules: true
                }
            },
            {
                test: /\.js?$/,
                use: [
                {
                    loader: 'babel-loader',
                    options: {
                    babelrc: false,
                    presets: [['env', { modules: false }], 'stage-0'],
                    plugins: ['transform-regenerator', 'transform-runtime']
                    }
                }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                loader: 'raw-loader'
                }
            }
        ]
    },
    plugins: [
        new Dotenv(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('testing') }
        })
    ]
}