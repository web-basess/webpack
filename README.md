##webpack 应用
###简介
>Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。
>
###安装（install）
首先要安装 Node.js， Node.js 自带了软件包管理器 npm，Webpack 需要 Node.js v0.6 以上支持，建议使用最新版 Node.js。
通过npm安装webpack

#####1.安装webpack
```ruby
npm install webpack -g //window
sudo npm install webpack -g //mac
```
全局安装
#####2.进入项目文件创建package.json

```ruby
npm init
```
#####3.安装局部webpack
```javascript
npm install webpack --save-dev
```
#####4.新建webpack.congif.js配置文件

###webpack-dev-server启动服务器热替换（自动刷新页面）

#####1.安装webpack-dev-server服务
```ruby
npm install webpack-dev-server -g
```
安装在全局即可
#####2.配置文件
```javascript
"scripts": {
    "start": "webpack-dev-server --watch --hot --inline --progress --colors"
  }
```
--watch 检测文件如有改动直接编译 --hot --inline 自动刷新热替换  --progress --colors 打印颜色
```javascript
//webpack.congif.js
watch.true
```
执行npm start

###SASS编译

#####1.安装loader  （通过style添加到页面中 ）
```ruby
npm install node-sass
npm install css-loader style-loader sass-loader
npm install --unsafe-perm --sade-dev node-sass //解决安装不上的bug  --unsafe-perm
```
```javascript
//webpack.config.js
{test: /\.css$/, loader: "style!css"},
{test: /\.scss$/, loader: "style!css!sass"}
```
如果有报错单独或多安装几次

#####2.通过link添加到页面中
```javascript
//webpack.config.js
//extract-text-webpack-plugin
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var sassParams = [
    'outputStyle=expanded',
    'includePaths[]=' + path.resolve(__dirname, './.scss')
];
sassLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader?modules&localIdentName=[local]',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&')
].join('!'));
//module
{
                test: /\.scss$/,
                loader: sassLoader
            }
//plugins
new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
```
这个时候一定要用webpack执行命令，不要用start启动服务器 不会输出文件

###关于图片的路径
**安装命令**
```ruby
npm install --save-dev url-loader  file-loader
```
通过file-loader  url-loader 对图片进行打包
```javascript
{
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'url-loader?limit=10000&name=dist/[name][hash].[ext]'
 }
//limit 图片小于10kb 采用base64位编码  name 》＝路径 hash编码 图片格式
```
一般这种情况只是会对css中的图片进行更改  如果想对html中的图片记性打包处理那就要用另外一种方式
除了要用到url-loader file-loader之外 还需要用到html-loader 还有html-webpack-plugin

**安装命令**
```ruby
npm install --save-dev html-loader  html-webpack-plugin
```
```javascript
//webpack.congif.js
//html-loader
{
                // HTML LOADER
                test: /\.html$/,
                loader: 'html-loader'
            }
var HtmlWebpackPlugin = require("html-webpack-plugin");
 new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
                 filename:'./dist/index.html',    //生成的html存放路径，相对于 path
                 template:'index.html',    //html模板路径
                 inject:true,    //允许插件修改哪些内容，包括head与body
                 hash:true,    //为静态资源生成hash值
                 minify:{    //压缩HTML文件
                    removeComments:true,    //移除HTML中的注释
                       collapseWhitespace:false    //删除空白符与换行符
                }
        })
```
对html进行编译。新生成的文件路径都会随着配置有变化

**entry：** 是页面入口文件配置，output 是对应输出项配置（即入口文件最终要生成什么名字的文件、存放到哪里）
**plugins：** 是插件项 插件的使用在这个模块下
**module.loaders：**是最关键的一块配置，它告知 webpack 每一种文件都需要使用什么加载器来处理

