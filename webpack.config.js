const path = require('path');

module.exports = {
  resolve: {
    fallback: {
        "fs": false,
    "tls": false,
    "net": false,
    "path": false,
    "zlib": false,
    "http": false,
    "https": false,
    "stream": false,
    "crypto": false,
    "crypto-browserify": require.resolve('crypto-browserify')
    }
  },
  module: {
    rules: [
      // ...
      {
        enforce: 'pre',
        loader: 'source-map-loader',
      },
      // ...
    ],
  },
};
