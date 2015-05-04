var webpack = require('webpack');

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha'],
        files: [
            'entry.tests.js'
        ],
        preprocessors: {
            'entry.tests.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/ // because chai is not compatable with 'use-strict'
                }, ]
            }
        },
        webpackServer: {
            noInfo: true 
        }
    });
};