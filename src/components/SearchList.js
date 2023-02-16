import "./SearchList.css"
import React, { useState, useEffect, useRef } from "react"
import { openLink } from "@/utils/openLink"

const SearchList = () => {
	const [input, setInput] = useState("")
	const [suggestion, setSuggestions] = useState([])
	const [data, setData] = useState(null)
	const searchElement = useRef(null)

	useEffect(() => {
		fetch("/api/list")
			.then((res) => res.json())
			.then((data) => {
				setData(JSON.parse(data))
			})
	}, [])

	useEffect(() => {
		// Focus on search bar
		if (searchElement.current) {
			searchElement.current.focus()
		}
	}, [])

	const handleChange = (e) => {
		let value = e.target.value
		let matches = []

		if (data) {
			if (value.length >= 1) {
				const regex = new RegExp(`${value}`, "gi")
				matches = data.filter((item) => regex.test(item))
			}
			setSuggestions(matches)
		}
		setInput(value)
	}

	const selectValue = (item) => {
		setSuggestions("")
		setInput("")
		openLink(item, "_self")
	}

	const clearSearch = () => {
		setInput("")
		setSuggestions("")
	}

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Enter") {
				if (suggestion.length === 0) return
				openLink(suggestion[0], "_self")
			} else if (event.key === "Escape") {
				clearSearch()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	})
	return (
		<>
			<div className="search-wrapper">
				<input
					className="input"
					type="text"
					placeholder="Search Database"
					value={input}
					onChange={handleChange}
					ref={searchElement}
				/>
				{suggestion?.length > 0 ? (
					<div className="suggestion-wrapper">
						{suggestion.map((item, index) => {
							return (
								<div
									className="suggestions"
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
