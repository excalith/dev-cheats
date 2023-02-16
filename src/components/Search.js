import "./Search.css"
import React, { useRef, useEffect, useCallback } from "react"
import { hasCookie, getCookie, setCookie } from "cookies-next"
import { publish } from "../utils/event"

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

	return (
		<div className="sticky-top search-row">
			<input
				className="form-control search-bar"
				type="text"
				onChange={changeSearch}
				placeholder="Search"
				autoFocus
				ref={searchElement}
			/>
			<select
				className="search-complexity form-select form-select-lg mb-3"
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
