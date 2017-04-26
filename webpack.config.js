const webpack = require('webpack');

module.exports = {
    entry: {
        'index': './src/index'
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
        library: 'RegularRedux',
        libraryTarget: 'var'
    }
}