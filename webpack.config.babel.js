import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

const config = {
  entry: path.join(__dirname, 'src', 'server', 'index.js'),
  target: 'node',
  externals: [nodeExternals()],
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
