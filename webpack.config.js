const path = require('path')
const crypto = require('crypto')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = () => {
  const inProduction = process.env.NODE_ENV === 'production'

  let config = {
    mode: process.env.NODE_ENV,

    entry: {
      app: './frontend/app.js'
    },

    output: {
      path: path.resolve(__dirname, './public'),
      publicPath: '/',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname),
      },
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: '/node_modules/',
          use: 'babel-loader'
        },
      ]
    },

    optimization: {
      minimize: inProduction,
    },

    plugins: [
      new MiniCssExtractPlugin({ 
        filename: 'css/[name].css'
      }),
      new ManifestPlugin({ 
        map: file => ({
          ...file,
          path: file.path + '?id=' + crypto.randomBytes(8).toString('hex')
        })
      })
    ],
  }

  if (inProduction) {
    config.plugins.push(new OptimizeCSSAssetsPlugin())
  }

  return config
}