const path = require("node:path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.tsx/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', "@babel/preset-typescript"],
          }
        },
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html',
  })],
  devServer: {
    port: 9000,
  },
}