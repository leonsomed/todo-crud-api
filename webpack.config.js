const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );
const Dotenv = require('dotenv-webpack');

module.exports = {
    target: 'node',

    entry: path.resolve(__dirname, 'src', 'index.js'),

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },

    externals: [nodeExternals()],

    plugins: [
        new Dotenv(),

        new NodemonPlugin({
            nodeArgs: ['--inspect=0.0.0.0:7777'],
        }),
    ],

    devtool: 'inline-source-map',
};
