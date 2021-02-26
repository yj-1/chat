module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://192.168.0.100:3000',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},
			'/socket.io': {
				target: 'http://192.168.0.100:3000',
				ws: true,
				changeOrigin: true
			},
			'sockjs-node': {
				target: 'http://192.168.0.100:3000',
				ws: false,
				changeOrigin: true
			}
		}
	}
}
