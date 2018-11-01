const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    mode: "development",
    entry: [
        "./test.js"
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
                "style-loader",
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
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    // externals:{
    //     // "react":"React",
    //     // "react-dom":"ReactDOM",
    //     // 'react-dom/server': {
    //     //     root: 'ReactDOMServer',
    //     //     commonjs2: 'react-dom/server',
    //     //     commonjs: 'react-dom/server',
    //     //     amd: 'react-dom/server'
    //     // }
    // },
    plugins: [
        new HtmlWebpackPlugin({
			inject: true,
			template: './test.html',
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        })
    ]
}