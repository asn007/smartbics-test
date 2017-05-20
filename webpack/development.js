const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const packageFile = require('../package.json');

const babelRC = fs.readFileSync(path.join(__dirname, '..', '.babelrc'));

const alphabeticSortPredicate = (a, b) => a.localeCompare(b);


const vendorsHash = crypto
                      .createHash('md5')
                      .update(Object
                                .keys(packageFile.dependencies)
                                .sort(alphabeticSortPredicate)
                                .join(','))
                      .digest('hex');

module.exports = {
  devtool: 'cheap-module-source-map',
  profile: true,
  performance: {
    hints: 'warning'
  },
  entry: {
    [`app-${packageFile.version}`]: [
      'react-hot-loader/patch',
      path.join(__dirname, '..', 'src', 'index.jsx')
    ]
  },
  output: {
    filename: `[name].js`,
    path: path.join(__dirname, '..', 'build'),
    pathinfo: true, // set to false on production
    // chunkFilename: '[chunk]-[hash].js',
    publicPath: `/assets/`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, '..', 'src'),
        loader: 'babel-loader',
        query: {
          babelrc: babelRC,
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap&localIdentName=[local]__[hash:base64]'
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.json', '.jsx', '.css' ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: `vendor-${vendorsHash}`,
      minChunks(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [ `vendor-${vendorsHash}`, `manifest-${vendorsHash}-${packageFile.version}` ]
    }),
    new HtmlWebpackPlugin({
      chunks: [
        `manifest-${vendorsHash}-${packageFile.version}`,
        `vendor-${vendorsHash}`,
        `app-${packageFile.version}`
      ],
      title: `Smartbics Tree`,
      filename: path.join('..', 'build', 'index.html'),
      //template: path.join(__dirname, '..', 'src', 'index.ejs')
    }),
    new WriteFilePlugin()
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, '..', 'build'),
    port: 8085,
    historyApiFallback: true
  }
};
