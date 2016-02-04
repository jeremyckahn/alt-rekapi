module.exports = {
  entry: './src/rekapi.js',
  output: {
    filename: './dist/rekapi.js',
    libraryTarget: 'umd',
    library: 'Rekapi'
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
  }
};
