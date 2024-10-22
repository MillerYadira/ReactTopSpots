const path = require('path');

module.exports = {
  context: path.join(__dirname, '/src'),

  entry: {
    javascript: './index'
  },

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist'),
  },

  resolve: {
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
};
