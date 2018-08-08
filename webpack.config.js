const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode:"production",
    entry: [
        "babel-polyfill",
        "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "editor.min.js",
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS
            ]
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
            ]
        }
    ]
    },
    resolve: {
        modules: [
            "node_modules"
        ],
        extensions: [".js",".css", ".scss"]
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 400000,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    devtool: "source-map",
    externals:["React","ReactDOM"],
    plugins: [
        new MiniCssExtractPlugin({
            filename: "editor.css",
            chunkFilename: "[id].css"
        }),
    ],
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
    }
}