import React, { useEffect, useState } from "react"
import { NextSeo } from "next-seo"
import axios from "axios"
import { addToRecents } from "@/utils/recentSearches"
import { subscribe, unsubscribe } from "@/utils/event"
import Loader from "@/components/Loader"
import Search from "@/components/Search"
import Card from "@/components/Card"
import Footer from "@/components/Footer"
import Home from "@/pages"

const dev = process.env.NODE_ENV !== "production"
export const server = dev
	? "http://localhost:3000"
	: "https://dev-cheats.vercel.app"

export async function getServerSideProps(context) {
	const { slug } = context.query

	const res = await axios
		.get(`${server}/api/docs?docs=${slug}`)
		.then((response) => {
			// console.log(response.status)
			// console.log(response.statusText)
			return response
		})

	const status = res.status
	const data = res.data
	// if (res.status === 200) data = await res.json()

	return { props: { slug, data, status } }
}

const Docs = ({ slug, data, status }) => {
	// States
	const [search, setSearch] = useState("")
	const [complexity, setComplexity] = useState(0)

	// Subscribe to events
	useEffect(() => {
		subscribe("complexityChange", (e) => setComplexity(e.detail))
		subscribe("searchChange", (e) => setSearch(e.detail))

		// Add to recent searches
		if (status === 200) addToRecents(slug)

		return () => {
			unsubscribe("complexityChange", (e) => setComplexity(e.detail))
			unsubscribe("searchChange", (e) => setSearch(e.detail))
		}
	}, [])

	// Handle the error state
	if (status !== 200) {
		return <Home errorMessage={slug} />
	}

	// Handle the loading state
	if (!data) return <Loader />

	// Parse the data
	let meta = data.meta
	let categories = data.categories
	let complexityOptions = data.complexity
	let contribs = data.meta.contribs

	return (
		<main className="container mx-auto">
			<NextSeo
				title={meta.title + " • Dev Cheats"}
				description={"Commands And Usage Examples For " + meta.title}
			/>

			<Search slug={slug} complexityOptions={complexityOptions} />
			{categories.map((category, index) => (
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

			<Footer style="w-full pb-5 pt-5" contribs={contribs} />
		</main>
	)
}

export default Docs
