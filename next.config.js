const { patchWebpackConfig } = require("next-global-css")

module.exports = {
	swcMinify: true,
	productionBrowserSourceMaps: true,
	images: {
		disableStaticImages: true
	},
	async rewrites() {
		return [
			{
				source: "/:slug",
				destination: "/Docs/:slug"
			}
		]
	},
	webpack(config, { isServer }) {
		// Disable NextJS global CSS warnings
		patchWebpackConfig(config, { isServer })

		config.module.rules.push(
			{
				test: /\.svg$/,
				use: "@svgr/webpack"
			},
			{
				test: /\.(woff2|png|jpg|mp4|glb|webm|webp)$/,
				type: "asset/resource"
			}
		)

		return config
	}
}
