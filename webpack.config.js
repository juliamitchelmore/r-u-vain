const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWepbackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'

const developmentEntry = [
	'webpack-dev-server/client?http://localhost:3000',
	'webpack/hot/only-dev-server',
	'./app/js/index',
	'../vendor/bower_components/bootstrap/dist/css/bootstrap.min.css',
	'./styles/main.scss'
]

const productionEntry = [
	'./app/js/index',
	'../vendor/bower_components/bootstrap/dist/css/bootstrap.min.css',
	'./styles/main.scss'
]

const developmentPlugins = [
	new webpack.DefinePlugin({
		'process.env': {
	      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	    }
	}),
 	new webpack.HotModuleReplacementPlugin(),
	new CopyWebpackPlugin([{ context: './assets/images/manufactures/', from: '**/*', to: './images/manufactures/' }]),
	new HtmlWepbackPlugin({
		filename: './index.html',
		template: './app/index.html',
	})
]

const productionPlugins = [
  	new ExtractTextPlugin('css/[name].[contenthash].css'),
  	new webpack.DefinePlugin({
    	'process.env': {
      		'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    	}
  	}),
  	new webpack.ExtendedAPIPlugin(),
  	new CleanWebpackPlugin(['dest'], {
		root: __dirname,
		verbose: true, 
		dry: false
	}),
  	new CopyWebpackPlugin([{ context: './assets/images/manufactures/', from: '**/*', to: './images/manufactures/' }]),
	new HtmlWepbackPlugin({
		filename: './index.html',
		template: './app/index.html',
	})
]

const productionLoaders = [
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
		loader: ExtractTextPlugin.extract(
			'css-loader?sourceMap!sass-loader?sourceMap'
			)
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

const developmentLoaders = [
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
	devtool: isProduction ? 'source-map' : 'eval',
	context: __dirname + '/src',
	entry: isProduction ? productionEntry : developmentEntry,
	output: {
		path: __dirname + '/dest',
		filename: 'js/main.[hash].js',
		publicPath: '/'
	},
	plugins: isProduction ? productionPlugins : developmentPlugins,
	module: {
		loaders: isProduction ? productionLoaders : developmentLoaders
	},
	resolve: { },
}