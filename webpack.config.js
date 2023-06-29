const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  entry: ['./src/js/main.js', './src/scss/main.scss'],
  resolve: {
    extensions: ['', '.scss', '.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: () => ({
                plugins: {
                  'postcss-import': {},
                  'postcss-preset-env': {
                    browsers: 'last 2 versions',
                    stage: 0,
                  },
                  'postcss-pxtorem': { propWhiteList: [] },
                  'postcss-sort-media-queries': {},
                },
              }),
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: () => ({
                quietDeps: true,
                sourceMap: true,
              }),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
      context: path.resolve(__dirname, './src'),
      files: '**/*.js',
    }),
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, '.stylelintrc'),
      context: path.resolve(__dirname, './src/scss'),
      files: '**/*.scss',
    }),
  ],
  externals: {
    jquery: 'window.jQuery',
  },
}
