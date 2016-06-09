var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ROOT_PATH = path.resolve(__dirname); //当前目录
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //入口目录
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist'); //输出目录

var ExtractTextPlugin = require("extract-text-webpack-plugin");
 var sassParams = [
 'outputStyle=expanded',
 'includePaths[]=' + path.resolve(__dirname, './scss')
 ];
 sassLoader = ExtractTextPlugin.extract('style-loader', [
 'css-loader?modules&localIdentName=[local]',
 'postcss-loader',
 'sass-loader?' + sassParams.join('&')
 ].join('!'),{ publicPath: '../'});

module.exports = {
    context: APP_PATH,
    entry: './js/entry.js',
    output: {
        path: BUILD_PATH, 
        filename: 'js/main.js'
    },
    module: {
        loaders: [
            {
             test: /\.scss$/,
             loader: sassLoader
             },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/i,
                loader: 'url-loader?limit=10000&name=images/[name][hash].[ext]'
            },
            {
                // HTML LOADER
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
         new ExtractTextPlugin('./css/main.css', {
         allChunks: true
         }),
        new webpack.HotModuleReplacementPlugin(),//热替换
        /*new webpack.optimize.UglifyJsPlugin({
         compress: {warnings: false}  //压缩文件
         }),*/
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
         filename:'./index.html',    //生成的html存放路径，相对于 path
         template:'index.html',    //html模板路径
         inject:true,    //允许插件修改哪些内容，包括head与body
         hash:true,    //为静态资源生成hash值
         minify:{    //压缩HTML文件
         removeComments:true,    //移除HTML中的注释
         collapseWhitespace:false    //删除空白符与换行符
         }
         })

    ],
    watch: true
}
