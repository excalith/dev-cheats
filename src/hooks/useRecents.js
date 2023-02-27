import { useState, useEffect } from "react"

const recentSearchesLimit = 5
const recentSearchesKey = "recent-searches"

function getRecentSearches(defaultValue) {
	if (typeof window !== "undefined") {
		const saved = localStorage.getItem(recentSearchesKey)
		const initial = saved !== null ? JSON.parse(saved) : [defaultValue]
		return initial
	}

	return defaultValue
}

export const useRecents = (defaultValue) => {
	const [value, setValue] = useState(() => {
		return getRecentSearches(defaultValue)
	})

	useEffect(() => {
		let recents = getRecentSearches(defaultValue)
		const index = value.indexOf(value)

		if (index !== -1) {
			recents.splice(index, 1)
		}

		recents.unshift(value)

		if (recents.length > recentSearchesLimit) {
			recents.splice(recentSearchesLimit)
		}

		localStorage.setItem(recentSearchesKey, JSON.stringify(recents))
	}, [defaultValue, value])

	return [value, setValue]
}
