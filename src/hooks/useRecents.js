import { useState } from "react"

const recentSearchesKey = "recent-searches"
const recentSearchesLimit = 5

export const useRecents = () => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(recentSearchesKey)
			return item ? JSON.parse(item) : []
		} catch (error) {
			console.error(error)
			return []
		}
	})

	const setValue = (value) => {
		try {
			const index = storedValue.indexOf(value)
			let recents = [...storedValue]

			if (index !== -1) {
				recents.splice(index, 1)
			}

			recents.unshift(value)

			if (recents.length > recentSearchesLimit) {
				recents.splice(recentSearchesLimit)
			}

			setStoredValue(recents)
			localStorage.setItem(recentSearchesKey, JSON.stringify(recents))
		} catch (error) {
			console.error(error)
		}
	}

	return [storedValue, setValue]
}
