const path = require('path');
const webpack = require('webpack');

const NpmInstallPlugin = require('npm-install-webpack-plugin');

// https://github.com/ampedandwired/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/app/index.html",
    filename: "index.html",
    inject: "body"
});

// Given plenty of places expect absolute paths,
// we can avoid confusion by using absolute paths everywhere.
const PATHS = {
  app:  path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.dist,
    filename: 'index_bundle.js'
  },
  devtool: 'eval-source-map',
  // http://webpack.github.io/docs/configuration.html
  resolve: {
    root: path.resolve(__dirname),
    // To require('file') instead of require('file.js')
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: PATHS.dist,

    // Enable history API fallback so HTML5 History API based routing works.
    // This is a good default that will come in handy in more complicated setups.
    historyApiFallback: true,
    hot:      true,
    inline:   true,
    progress: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env so this is easy to customize.
    host: process.env.HOST,
    port: process.env.PORT
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin({
      save: true // --save
    })
  ],
  module: {
    // The loaders are evaluated from right to left.
    loaders: [
      {
        test:    /\.jsx?/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test:    /\.css$/,
        // `css-loader`:   resolves @import and url statements in our CSS files.
        // `style-loader`: resolves require statements in our JavaScript.
        loaders: ['style', 'css'],
        // `include` accepts either a path or an array of paths.
        include: PATHS.app
      }
    ]
  }
};
