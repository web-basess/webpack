var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname); //当前目录
var APP_PATH = path.resolve(ROOT_PATH, 'src/'); //入口目录
var BUILD_PATH = path.resolve(ROOT_PATH, '/src/'); //输出目录

module.exports = {
    context: APP_PATH,
    entry: './js/entry.js',
    output: {
        path: BUILD_PATH, // 设置输出目录
        filename: 'js/main.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.scss$/, loader: "style!css!sass"},
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/i,
                loader: 'url-loader?limit=10000&name=../images/[name][hash].[ext]'
            },
            {
                // HTML LOADER
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
         new webpack.HotModuleReplacementPlugin()//热替换
    ],
    watch: true
}
