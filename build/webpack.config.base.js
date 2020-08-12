const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: {app: path.resolve(__dirname, '../src/main.js')},
	output: {
		publicPath: '/dist/',
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.(jpg|jpeg|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024 * 20,
							fallback: 'file-loader',
							outputPath: './img'
						}
					}
				]
			},
			{
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          use: [{
            loader: 'file-loader',
            // options: {
            //   outputPath: './css',
            //   publicPath: '/css'
            // }
          }]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLPlugin({template: path.join(__dirname, 'template.html')}),
		new VueLoaderPlugin()
	]
}