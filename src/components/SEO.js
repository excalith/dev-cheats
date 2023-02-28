import Head from "next/head"

const url = "https://dev-cheats.vercel.app"

const SEO = ({ title, description, additionalKeywords, imageText }) => {
	return (
		<Head>
			<title>{`${title} • Dev Cheats`}</title>
			<meta name="description" content={description} />
			<meta
				name="keywords"
				content={`developer command tool cheat sheet documentation example usage ${additionalKeywords}`}
			/>
			<meta name="author" content="Can Cellek (excalith)" />
			<meta
				property="image"
				content={`${url}/api/v1/og?desc=${
					imageText ? imageText : description
				}`}
			/>
			<meta name="robots" content="all" />
			<meta charSet="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>

			<meta itemProp="name" content={`${title} • Dev Cheats`} />
			<meta itemProp="description" content={description} />
			<meta
				itemProp="image"
				content={`${url}/api/v1/og?desc=${
					imageText ? imageText : description
				}`}
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
				content={`${url}/api/v1/og?desc=${
					imageText ? imageText : description
				}`}
				key="image"
			/>
			<meta
				property="og:image:secure_url"
				content={`${url}/api/v1/og?desc=${
					imageText ? imageText : description
				}`}
				key="image"
			/>
			<meta property="og:type" content="website" />

			<meta name="twitter:card" content="summary_large_image" />
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
				content={`${url}/api/v1/og?desc=${
					imageText ? imageText : description
				}`}
				key="image"
			/>

			<link rel="icon" href="/favicon.ico" />
		</Head>
	)
}

export default SEO
