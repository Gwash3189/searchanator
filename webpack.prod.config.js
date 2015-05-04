var file = require("file");
var webpack = require("webpack");
var cordovaConfig = {};
var modules = [];
var fallbacks = [];
modules.push("node_modules");

file.walkSync("./src", function(dirPath, dirs, files) {
    modules = modules.concat(dirs);
    fallbacks.push(file.path.abspath(dirPath));
});


module.exports = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }, 
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
    ],
    resolve: {
        modulesDirectories: modules,
        fallback: fallbacks
    },
    entry: "./src/main.js",
    output: {
        path: "./",
        filename: "searchanator.min.js"
    },
};