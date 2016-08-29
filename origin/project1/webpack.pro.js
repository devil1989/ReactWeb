var path = require('path');
var process = require('process');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var precss = require('precss');
var autoprefixer = require('autoprefixer');

var webpackBaseConfig = require('../common/webpack.config.base');
var resolveEntry = webpackBaseConfig.resolveEntry;

var publicPath = './build/';
//var publicPath = 'http://localhost:8066/webapp/hybrid/src/schedule/build/';

module.exports = {
    context: __dirname,
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    entry: resolveEntry('./scripts/!(ui|mock|_)*.js', '.js', __dirname),//源文件
    output: {//输出文件
        path: publicPath,//打包后的输出路径
        publicPath: publicPath,//html引用路径
        chunkFilename: '[name].js',
        filename: 'scripts/[name].js'//文件打包后的名字
    },
    module: {//资源加载器，什么样的资源对应什么样的加载器，加载器后面支持？加参数，多个加载器之间用！来连接
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-object-assign']
                }
            },
            {
                test: /\.css$/,
                 loader: 'style!css!postcss',
                //loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                include: [
                    path.resolve(__dirname, 'images')
                ],
                loader: 'url?limit=1000&name=images/[name].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|woff)$/i,
                include: [
                    path.resolve(__dirname, 'fonts')
                ],
                loader: 'url?limit=1000&name=fonts/[name].[ext]'
                // loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },
    postcss: function() {
        return [precss, autoprefixer ]; //autoprefixer
    },
    plugins: [
        new ExtractTextPlugin('styles/[name].css', {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
            //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    //devtool: "source-map"
};

/*
module.exports.devServer = {
    contentBase: '../../',
    host: 'localhost', // 此处换成本机ip或localhost，但是换成localhost的话，无法用ip访问
    port: 8066,
    inline: true,
    proxy: {
        '*': 'http://localhost:5389' // 项目实际访问地址
    }
};

*/
