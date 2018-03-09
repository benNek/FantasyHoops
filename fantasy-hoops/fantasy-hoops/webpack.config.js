const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);
  return [{
    stats: { modules: false },
    entry: { 'main': './ClientApp/boot.jsx' },
    resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    output: {
      path: path.join(__dirname, bundleOutputDir),
      filename: '[name].js',
      publicPath: 'dist/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }, {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                gifsicle: {
                  interlaced: false
                },
                optipng: {
                  optimizationLevel: 4
                },
                bypassOnDebug: true
              }
            }
          ]
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        },
        {
          test: /\.ico$/,
          loader: 'url-loader',
          query: { mimetype: 'image/x-icon' }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          enforce: 'pre'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015'],
            plugins: ['react-hot-loader/babel']
          }
        }
      ]
    },
    plugins: [
      new CheckerPlugin(),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./wwwroot/dist/vendor-manifest.json')
      })
    ].concat(isDevBuild ? [
      // Plugins that apply in development builds only
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map', // Remove this line if you prefer inline source maps
        moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
      })
    ] : [
        // Plugins that apply in production builds only
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('site.css')
      ])
  }];
};