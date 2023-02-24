import Head from "next/head"

const SEO = ({ title, description }) => {
	return (
		<Head>
			<title>{`${title} • Dev Cheats`}</title>
			<meta name="description" content={description} />
			<meta
				name="keywords"
				content="developer cheat sheet command documentation example usage"
			/>
			<meta name="author" content="Can Cellek (excalith)" />
			<meta
				property="image"
				content={`https://inthepocket.tech/api/og-image?name=${title}&desc=${description}`}
			/>

			<meta charset="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>

			<meta
				property="og:title"
				content={`${title} • Dev Cheats`}
				key="title"
			/>
			<meta
				property="og:description"
				content={description}
				key="description"
			/>
			<meta
				property="og:image"
				content={`https://inthepocket.tech/api/og-image?name=${title}&desc=${description}`}
				key="image"
			/>

			<meta
				name="twitter:title"
				content={`${title} • Dev Cheats`}
				key="title"
			/>
			<meta
				name="twitter:description"
				content={description}
				key="description"
			/>
			<meta
				name="twitter:image"
				content={`https://inthepocket.tech/api/og-image?name=${title}&desc=${description}`}
				key="image"
			/>

			<link rel="icon" href="/favicon.ico" />
		</Head>
	)
}

export default SEO
