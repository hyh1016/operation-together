const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index'],
  target: 'node',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-env',
                '@babel/preset-typescript',
              ],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: 'file-loader',
          options: { outputPath: 'static/images' },
        },
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true,
    publicPath: '/',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};
