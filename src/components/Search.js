import React, { useRef, useEffect } from "react"
import { hasCookie, getCookie, setCookie } from "cookies-next"
import { publish } from "../utils/event"
import { openLink } from "@/utils/openLink"

const Search = ({ slug, complexityOptions }) => {
	const searchElement = useRef(null)
	const complexityElement = useRef(null)

	// Check cookies and apply complexity filter
	useEffect(() => {
		if (!slug) return

		if (hasCookie(`${slug}-complexity`)) {
			const complexityValue = getCookie(`${slug}-complexity`)
			complexityElement.current.value = complexityValue
			publish("complexityChange", complexityValue)
		}
	}, [slug])

	useEffect(() => {
		// Focus on search bar
		if (searchElement.current) {
			searchElement.current.focus()
		}
	}, [])

	const changeComplexity = (e) => {
		const complexityValue = e.target.value
		complexityElement.current.value = complexityValue
		setCookie(`${slug}-complexity`, complexityValue, {
			secure: true,
			sameSite: "strict"
		})
		publish("complexityChange", complexityValue)
	}

	const changeSearch = (e) => {
		publish("searchChange", e.target.value)
	}

	const launchHome = (e) => {
		openLink("/", "_self")
	}

	return (
		<div className="sticky z-50 top-0 h-16 mt-3.5 mb-6 p-1.5 space-x-2 rounded-lg drop-shadow-2xl bg-cardBackground flex">
			<button
				className="px-4 font-sans text-xl text-center align-middle transition duration-300 ease-in-out delay-150 rounded cursor-pointer w-25 bg-red hover:-translate-2 hover:scale-125 hover:bg-blue"
				onClick={launchHome}>
				D
			</button>
			<input
				className="h-full px-4 font-sans text-xl text-center rounded-lg outline-none grow bg-background"
				type="text"
				onChange={changeSearch}
				placeholder="Search"
				autoFocus
				ref={searchElement}
			/>
			<select
				className="h-full px-4 font-sans rounded-lg outline-none w-25 p-5text-large bg-background"
				onChange={changeComplexity}
				ref={complexityElement}>
				{complexityOptions.map((item, index) => {
					return (
						<option key={index} value={index}>
							{item}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default Search
