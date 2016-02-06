module.exports = {
  entry: './src/main.js',
  output: {
    filename: './dist/rekapi.js',
    libraryTarget: 'umd',
    library: 'rekapi'
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
