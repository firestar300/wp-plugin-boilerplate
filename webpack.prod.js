const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')
const mode = 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  stats: 'minimal',
  optimization: {
    concatenateModules: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
  ],
})
