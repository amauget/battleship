const path = require('path')


module.exports = {
  mode:'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'),
    
  },
  module:{
    rules:[
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], 
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
       }
    ]
  },
  devtool: 'inline-source-map',
}

