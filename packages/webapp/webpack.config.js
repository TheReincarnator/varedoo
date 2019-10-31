const path = require('path');
const request = require('request');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function rewriteRule(from, to) {
	return {
		from,
		to: context => {
			return to.replace(/\$([0-9])/, match => {
				return context.match[parseInt(match[1])];
			});
		},
	};
}

module.exports = {
	entry: {
		'css/template': [
			path.resolve(__dirname, '../common/css/reset.css'),
			path.resolve(__dirname, '../common/css/layout.css'),
			path.resolve(__dirname, '../common/css/overlay.css'),
			path.resolve(__dirname, '../common/css/overlay-small.css'),
			path.resolve(__dirname, '../common/css/richtext.css'),
			path.resolve(__dirname, '../common/css/richtext-small.css'),
			path.resolve(__dirname, '../common/css/inputs.css'),
			path.resolve(__dirname, '../common/css/inputs-small.css'),
			path.resolve(__dirname, '../common/css/font-awesome.min.css'),
			path.resolve(__dirname, '../common/css/prism.css'),
			path.resolve(__dirname, '../common/css/youtube.css'),
			path.resolve(__dirname, 'src/css/template.css'),
		],
		'js/template': [path.resolve(__dirname, 'src', 'js', 'index.js')],
	},

	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: '[name].js',
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
				],
			},
			{
				test: /\.woff2?$/,
				loader: 'file-loader',
			},
		],
	},

	plugins: [
		new VueLoaderPlugin(),

		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),

		new CopyPlugin([
			// Copy all other files without templating
			{
				context: 'src/html',
				from: '**',
			},
		]),
	],

	optimization: {
		minimizer: [
			new TerserJSPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	},

	devtool: 'source-map',

	devServer: {
		contentBase: './lib',
		open: true,
		overlay: true,
		port: 80,
		historyApiFallback: {
			rewrites: [
				rewriteRule(/^(.+)\/(index\.html|)$/, '$1'),
				rewriteRule(/^\/index\.html$/, '/'),
				rewriteRule(/^\/(.+)\.html$/, '/$1'),
				rewriteRule(/^\/rpc(|\/.*)$/, 'http://localhost:9108/template$1'),
				rewriteRule(/^(.*\/[^\/.]+)$/, '$1.html'),
				rewriteRule(/^\/?$/, '/index.html'),
				rewriteRule(/.*/, '/error404.html'),
			],
		},
		before: app => {
			app.use('/rpc', (req, res) => {
				// Forward RPC calls to the Spring backend
				let uri = `http://localhost:5000/template${req.path}`;
				req
					.pipe(
						request({ uri, qs: req.query }, error => {
							if (error) {
								const message = `Failed to forward RPC request: ${error}`;
								console.error(message);
								res.status(500);
								res.send(message);
							}
						})
					)
					.pipe(res);
			});
		},
	},
};
