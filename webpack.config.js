const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = true

const productionEntry = [
	'./app/js/index',
	'../vendor/bower_components/bootstrap/dist/css/bootstrap.min.css',
	'./styles/main.scss'
]

const productionPlugins = [
  	new ExtractTextPlugin('css/[name].[contenthash].css'),
  	new webpack.DefinePlugin({
    	'process.env': {
      		'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    	}
  	}),
  	new webpack.ExtendedAPIPlugin(),
]

const loaders = [
	{ 
		test: /\.js$/, 
		loaders: ['react-hot','babel-loader'], 
		exclude: /node_modules/ 
	},
	{ 
		test: /\.(png|jpg|svg)$/, 
		loader: 'file-loader?name=images/[name].[hash].[ext]' 
	},
	{ 
		test: /\.(woff|eot|ttf|woff2)$/, 
		loader: 'file-loader?name=fonts/[name].[hash].[ext]' 
	},
	{
		test: /\.(scss|css)$/,
		loader: 'style-loader!css-loader!sass-loader?sourceMap'
	},
	{
		test: /\.(json)$/,
		loader: 'file-loader?name=mocks/[name].[ext]'
	},
	{
      test: require.resolve('snapsvg'),
      loader: 'imports-loader?this=>window,fix=>module.exports=0'
    }
]

module.exports = {
	devtool: 'source-map',
	context: __dirname + '/src',
	entry: productionEntry,
	output: {
		path: __dirname + '/',
		filename: 'bundle.js',
		publicPath: './'
	},
	plugins: productionPlugins,
	module: {
		loaders: loaders
	},
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
}