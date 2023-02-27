import React, { useEffect, useState } from "react"
import absoluteUrl from "next-absolute-url"
import axios from "axios"
import { addToRecents } from "@utils/recentSearches"
import { subscribe, unsubscribe } from "@utils/event"
import SEO from "@components/SEO"
import Loader from "@components/Loader"
import Search from "@components/Search"
import Card from "@components/Card"
import Footer from "@components/Footer"
import Home from "@/pages"

export async function getServerSideProps({ req, params }) {
	const { slug } = params
	const { protocol, host } = absoluteUrl(req, "localhost:3000")
	let status = null
	let data = null

	await axios
		.get(`${protocol}//${host}/api/v1/docs?doc=${slug}`)
		.then((response) => {
			status = response.status
			data = response.data
		})
		.catch((error) => {
			console.log(error)
			status = 500
			data = null
		})

	return { props: { slug, data, status } }
}

const Docs = ({ slug, data, status }) => {
	// States
	const [search, setSearch] = useState("")
	const [complexity, setComplexity] = useState(0)

	useEffect(() => {
		if (status !== 200) return

		// Add to recent searches
		addToRecents(slug)

		// Subscribe to events
		subscribe("complexityChange", (e) => setComplexity(e.detail))
		subscribe("searchChange", (e) => setSearch(e.detail))

		return () => {
			unsubscribe("complexityChange", (e) => setComplexity(e.detail))
			unsubscribe("searchChange", (e) => setSearch(e.detail))
		}
	}, [slug, status])

	// Handle the documentation not found
	if (status !== 200) return <Home missingCommand={slug} />

	// Handle the loading state
	if (!data) return <Loader />

	console.log(data.complexity)

	return (
		<main className="container px-2 mx-auto">
			<SEO
				title={data.meta.title}
				description={
					"Commands And Usage Examples For " + data.meta.title
				}
			/>

			<Search
				slug={slug}
				title={data.meta.title}
				complexityOptions={data.complexity}
			/>
			{data.categories.map((category, index) => (
				<section key={index}>
					{category.commands.map((command, i) => (
						<Card
							key={index + "-" + i}
							data={command}
							category={category.name}
							accent={category.color}
							query={search}
							complexity={complexity}
						/>
					))}
				</section>
			))}

			<Footer style="w-full pb-5 pt-5" contribs={data.meta.contribs} />
		</main>
	)
}

export default Docs
