import React, { useState, useEffect, useRef } from "react"
import { openLink } from "@utils/openLink"
import { getAllRecents, clearRecents } from "@utils/recentSearches"
import { useTypewriter } from "@hooks/useTypewriter"
import useFetch from "@hooks/useFetch"

const SearchDatabase = () => {
	const [input, setInput] = useState("")
	const [suggestions, setSuggestions] = useState([])
	const [isRecents, setIsRecents] = useState(false)
	const [data] = useFetch("/api/v1/docs/")
	const searchElement = useRef(null)
	const { word } = useTypewriter(["docker", "git", "yarn", "npm"], 130, 6)

	useEffect(() => {
		// Focus on search bar
		if (searchElement.current) {
			searchElement.current.focus()
		}

		handleFocus()
	}, [])

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Enter") {
				if (input.length === 0) return

				const query = suggestions.length > 0 ? suggestions[0] : input
				openLink(query, "_self")
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
		<div className="absolute inline-block w-full px-4 drop-shadow-2xl ">
			<input
				className="w-full h-16 px-4 font-sans text-xl rounded-lg outline-none bg-cardBackground"
				type="text"
				placeholder={`Search for ${word}`}
				value={input}
				onChange={handleChange}
				onFocus={handleFocus}
				ref={searchElement}
			/>
			{suggestions?.length > 0 ? (
				<div className="relative w-full p-2 rounded-b-lg overflow-y-clip -top-2 max-h-72 border-t-1 border-background bg-cardBackground">
					{isRecents && (
						<div
							className={`flex h-10 md-4 ${
								isRecents && "visible"
							}`}>
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
			) : (
				<>
					{input.length > 0 && (
						<div className="w-full py-2 text-center">
							<p>
								No cheatsheet found for{" "}
								<span className="font-medium text-red">
									{input}
								</span>
							</p>
							<p>
								You can request it from{" "}
								<a
									className="text-blue"
									href="https://github.com/excalith/dev-cheats/issues/new?assignees=&labels=documentation%2C+enhancement&template=documentation-request.md&title=%5BDOCS%5D+"
									target="_blank"
									rel="noopener noreferrer nofollow">
									here
								</a>
							</p>
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default SearchDatabase
