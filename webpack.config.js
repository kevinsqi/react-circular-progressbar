const webpack = require('webpack');
const path = require('path');
const pak = require('./package.json');
const nodeEnv = process.env.NODE_ENV || 'development';
const demoDir = 'docs';

const webpackConfig = {
  context: __dirname,
  entry: {
    'react-circular-progressbar': [
      path.resolve(__dirname, 'src', 'index.jsx')
    ]
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js',
    library: 'CircularProgressbar',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
};

if (nodeEnv === 'development') {
  webpackConfig.devtool = 'source-map';
  webpackConfig.devServer = { contentBase: path.resolve(__dirname, demoDir) };
  webpackConfig.entry['react-circular-progressbar'].unshift('webpack-dev-server/client?http://0.0.0.0:8080/');
  webpackConfig.entry['react-circular-progressbar'].push(path.resolve(__dirname, demoDir, 'demo.jsx'));
  webpackConfig.output.publicPath = '/';
}

if (nodeEnv === 'demo') {
  webpackConfig.entry['react-circular-progressbar'].push(path.resolve(__dirname, demoDir, 'demo.jsx'));
  webpackConfig.output.path = path.resolve(__dirname, demoDir);
}

if (nodeEnv === 'development' || nodeEnv === 'demo') {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'COMPONENT_NAME': JSON.stringify(pak.name),
    'COMPONENT_VERSION': JSON.stringify(pak.version),
    'COMPONENT_DESCRIPTION': JSON.stringify(pak.description)
  }));
}

if (nodeEnv === 'production') {
  webpackConfig.externals = {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  };
  webpackConfig.output.path = path.resolve(__dirname, 'build');
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    sourceMap: false
  }));
}

module.exports = webpackConfig;
