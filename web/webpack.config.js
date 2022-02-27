const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: 'production',

  entry: {
    treatment: './cohapp/static/cohapp/js_big/components/treatment/treatment.jsx',
    landingpage: './cohapp/static/cohapp/js_big/components/landingpage/landingpage.jsx'
  },

  output: {
    path: path.join(__dirname, 'static/cohapp/js'),
    filename: '[name].min.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          },
        },
        include: path.resolve(__dirname, 'cohapp/static/cohapp/js_big'),
        exclude: path.resolve(__dirname, 'node_modules'),
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      include: /\.min\.js$/
    })],
  },
};
