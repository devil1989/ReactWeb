var path = require('path');
var process = require('process');

var glob = require('glob');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports  = {
    resolveLoader: {
        root: path.join(__dirname, '../../node_modules')
    },
    loaders: {
        scriptLoader: {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        },
        stylesheetLoader: {
            test: /\.css$/,
            loader: 'style!css!postcss'
        },
        stylesheetExtractLoader: {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss')
        },
        imageLoader: {
            test: /\.(gif|png|jpe?g|svg)$/i,
            loader: 'url?limit=1000&name=images/[hash].[ext]'
        }
    },
    postcss: function() {
        return [precss, autoprefixer];
    },
    'html-minifier-loader': {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeOptionalTags: false,
        minifyJS: true,
        minifyCSS: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
    }
};

/**
 * resolve entry
 */
module.exports.resolveEntry = function (globpath, suffix, context) {
    if (context) {
        globpath = path.join(context, globpath);
    }
    return glob.sync(globpath).reduce((prev, curr) => {
        var basename = path.basename(curr, suffix);
        prev[basename] = curr;
        return prev;
    }, {});
};

/**
 * decide build mode
 */
module.exports.decideBuildMode = function () {
    var isProduction = process.env.NODE_ENV == 'production' || process.argv.some(val => {
        return val === '-p';
    });
    return isProduction ? 'p' : 'd';
};
