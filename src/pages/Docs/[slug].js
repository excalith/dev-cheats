import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { NextSeo } from "next-seo"
import axios from "axios"
import useSWR from "swr"

import { addToRecents } from "@/utils/recentSearches"
import { subscribe, unsubscribe } from "@/utils/event"
import Loader from "@/components/Loader"
import Search from "@/components/Search"
import Card from "@/components/Card"
import Footer from "@/components/Footer"
import Home from "@/pages"

const address = "/api/docs"
const fetcher = (url, docs) =>
	axios.get(`${url}?docs=${docs}`).then((res) => res.data)

const Docs = () => {
	// Get router query
	const router = useRouter()
	const { slug } = router.query

	// Fetch data from API
	const { data, error } = useSWR(
		slug ? [address, slug] : null,
		slug ? fetcher : null
	)

	// States
	const [search, setSearch] = useState("")
	const [complexity, setComplexity] = useState(0)

	// Subscribe to events
	useEffect(() => {
		subscribe("complexityChange", (e) => setComplexity(e.detail))
		subscribe("searchChange", (e) => setSearch(e.detail))

		return () => {
			unsubscribe("complexityChange", (e) => setComplexity(e.detail))
			unsubscribe("searchChange", (e) => setSearch(e.detail))
		}
	}, [slug])

	// Handle the error state
	if (error) {
		return <Home errorMessage={slug} />
	}

	// Handle the loading state
	if (!data) return <Loader />

	let parsedData = JSON.parse(data)
	if (!parsedData) return <Loader />

	// Add to recent searches
	addToRecents(slug)

	// Parse the data
	let meta = parsedData.meta
	let categories = parsedData.categories
	let complexityOptions = parsedData.complexity
	let contribs = parsedData.meta.contribs

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
