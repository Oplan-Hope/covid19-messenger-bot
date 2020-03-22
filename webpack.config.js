const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = () => {
  const inProduction = process.env.NODE_ENV === 'production'

  let config = {
    mode: process.env.NODE_ENV,

    entry: {
      app: './resources/js/app.js'
    },

    output: {
      path: path.resolve(__dirname, './public'),
      publicPath: '/',
      filename: 'js/[name].bundle.[contenthash].js',
      chunkFilename: 'js/[name].bundle.[contenthash].js',
    },

    resolve: {
      alias: {
        'styles': path.resolve('resources/css'),
        '@': path.resolve('resources/js'),
      },
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
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
      new CleanWebpackPlugin({ 
        cleanOnceBeforeBuildPatterns: ['js', 'css']
      }),
      new ManifestPlugin()
    ],
  }

  return config
}