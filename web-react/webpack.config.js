var path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
}