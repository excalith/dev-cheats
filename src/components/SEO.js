import Head from "next/head"

const SEO = (slug, title, description) => {
	const t = `${title} • Dev Cheats`
	if (description === undefined) {
		description = `Commands and usage examples for ${title}`
	}
	// const socialImage = "https://cancellek.com/social-image.png"

	return (
		<Head>
			<title>{slug}</title>
			<meta name="description" content={description} />
			{/* {socialImage && <meta property="image" content={socialImage} />} */}
			<meta property="og:title" content={t} key="title" />
			<meta
				property="og:description"
				content={description}
				key="description"
			/>
			{/* {socialImage && <meta property="og:image" content={socialImage} key="image" />} */}

			<meta name="twitter:title" content={t} key="title" />
			<meta
				name="twitter:description"
				content={description}
				key="description"
			/>
			{/* {socialImage && <meta name="twitter:image" content={socialImage} key="image"/>} */}

			<link rel="icon" href="/favicon.ico" />
		</Head>
	)
}

export default SEO
