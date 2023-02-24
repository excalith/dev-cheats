import Head from "next/head"

const SEO = ({ title, description }) => {
	return (
		<Head>
			<title>{`${title} • Dev Cheats`}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content="HTML, CSS, JavaScript, NextJS" />
			<meta name="author" content="Can Cellek (excalith)" />
			<meta
				property="image"
				content="https://inthepocket.tech/api/og-image?name=Next.js&desc=adopt"
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
				content="https://inthepocket.tech/api/og-image?name=Next.js&desc=adopt"
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
				content="https://inthepocket.tech/api/og-image?name=Next.js&desc=adopt"
				key="image"
			/>

			<link rel="icon" href="/favicon.ico" />
		</Head>
	)
}

export default SEO
