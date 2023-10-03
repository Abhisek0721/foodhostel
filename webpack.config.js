const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = 3000;

module.exports = {
    // Webpack configuration goes here
    mode: 'development',
    devServer: {
        historyApiFallback: false,
        allowedHosts: [
          'foodhostel.com',
        ],
    },
};