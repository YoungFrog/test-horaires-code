const path = require('path')
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new MomentTimezoneDataPlugin({
      matchZones: 'Europe/Brussels',
      startYear: 2020,
      endYear: new Date().getFullYear() + 10
    }),
    new MomentLocalesPlugin()
  ],
  entry: {
    app: './src/index.tsx',
    freerooms: './src/freerooms.tsx'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/')
  },
  devServer: {
    static: './',
    devMiddleware: {
      publicPath: '/dist'
    }
  },
  watchOptions: {
    ignored: '**/.#*'
  }
}
