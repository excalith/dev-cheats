import React, { useState, useEffect, useRef } from "react"
import { openLink } from "@/utils/openLink"
import { getAllRecents, clearRecents } from "@/utils/recentSearches"

const SearchList = () => {
	const [input, setInput] = useState("")
	const [suggestions, setSuggestions] = useState([])
	const [isRecents, setIsRecents] = useState(false)
	const [data, setData] = useState(null)
	const searchElement = useRef(null)

	useEffect(() => {
		fetch("/api/list")
			.then((res) => res.json())
			.then((data) => {
				setData(JSON.parse(data))
			})

		// Focus on search bar
		if (searchElement.current) {
			searchElement.current.focus()
		}

		handleFocus()
	}, [])

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Enter") {
				if (suggestions.length === 0) return
				openLink(suggestions[0], "_self")
			} else if (event.key === "Escape") {
				clearSearch()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	})

	const selectValue = (item) => {
		setSuggestions("")
		setInput("")
		openLink(item, "_self")
	}

	const clearSearch = () => {
		setInput("")
		setSuggestions("")
	}

	const handleChange = (e) => {
		let value = e.target.value
		getSuggestions(value)

		if (searchElement.current.value.length === 0) {
			setSuggestions([])
			getRecents()
		}
	}

	const handleFocus = () => {
		if (input.length > 0) {
			let value = searchElement.current.value
			getSuggestions(value)
		} else getRecents()
	}

	const handleBlur = () => {
		// Dirty fix for suggestions not disappearing before clicking on them
		setTimeout(
			function () {
				setSuggestions("")
			}.bind(this),
			100
		)
	}

	const getSuggestions = (value) => {
		let matches = []

		if (data) {
			if (value.length >= 1) {
				const regex = new RegExp(`${value}`, "gi")
				matches = data.filter((item) => regex.test(item))
				setSuggestions(matches)
			}
		}

		setInput(value)
		setIsRecents(false)
	}

	const getRecents = () => {
		setSuggestions(getAllRecents())
		setIsRecents(true)
	}

	const handleClearRecents = () => {
		clearRecents()
		clearSearch()
	}

	return (
		<>
			<div className="relative inline-block w-full drop-shadow-2xl">
				<input
					className="w-full h-16 px-4 font-sans text-xl rounded-lg outline-none input bg-cardBackground"
					type="text"
					placeholder="Search Database"
					value={input}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					ref={searchElement}
				/>
				{suggestions?.length > 0 ? (
					<div className="absolute w-full p-2 rounded-b-lg suggestion-wrapper top-14 border-t-1 border-background bg-cardBackground">
						{isRecents && (
							<div className="flex h-10 md-4">
								<span className="h-8 pt-2 pl-3 font-medium grow">
									Recent Searches
								</span>
								<span
									className="inline-block p-2 text-sm align-middle rounded-lg cursor-pointer h-9 right hover:bg-red"
									onClick={handleClearRecents}>
									Clear Recents
								</span>
							</div>
						)}
						{suggestions.map((item, index) => {
							return (
								<div
									className="w-full p-3 transition duration-300 ease-in-out delay-150 rounded-lg cursor-pointer suggestions drop-shadow-2xl hover:-translate-1 hover:scale-110 hover:bg-blue hover:text-white"
									key={index}
									onClick={() => selectValue(item)}>
									{item}
								</div>
							)
						})}
					</div>
				) : null}
			</div>
		</>
	)
}

export default SearchList
