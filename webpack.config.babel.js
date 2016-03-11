import webpack from 'webpack';
import path from 'path';

const config = {
  context: path.join(__dirname, 'src', 'server'),
  entry: 'index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js'
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};

export default config;
