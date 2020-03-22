const path = require('path')
const crypto = require('crypto')
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
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
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
      new ManifestPlugin({ 
        map: file => ({
          ...file,
          path: file.path + '?id=' + crypto.randomBytes(8).toString('hex')
        })
      })
    ],
  }

  return config
}