const path = require('path');

module.exports = {
  mode: 'development',
  entry: './newCharlaBots/js/main.jsx',
  output: {
    path: path.join(__dirname, '/newCharlaBots/static/js/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        // Exclude external modules from loader tests
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
        //loaders: [{test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},{test: /\.css$/, loaders: ['style', 'css']}]


      },
    ],


  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
