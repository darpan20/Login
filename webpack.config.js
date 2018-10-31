module.exports = {
  // Example setup for your project:
  // The entry module that requires or imports the rest of your project.
  // Must start with `./`!
  entry: './views/entry.js',
  // Place output files in `./dist/my-app.js`
  output: {
    path: __dirname + '/views/dist',
    filename: 'my-app.js',
	libraryTarget: "this"
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  watch: true
};
