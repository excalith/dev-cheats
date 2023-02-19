import { hasCookie, getCookie, setCookie, deleteCookie } from "cookies-next"

function addToRecents(key) {
	const maxRecentSearches = 5
	let recents = []

	const hasRecentSearches = hasCookie("recent-searches")

	if (hasRecentSearches) {
		recents = JSON.parse(getCookie("recent-searches"))
	}

	const index = recents.indexOf(key)

	if (index !== -1) {
		recents.splice(index, 1)
	}

	recents.unshift(key)

	if (recents.length > maxRecentSearches) {
		recents.splice(maxRecentSearches)
	}

	saveCookie("recent-searches", JSON.stringify(recents))
}

function getAllRecents() {
	const hasRecentSearches = hasCookie("recent-searches")
	if (hasRecentSearches) {
		return JSON.parse(getCookie("recent-searches"))
	}

	return []
}

function saveCookie(name, data) {
	setCookie(name, data, {
		secure: true,
		sameSite: "strict"
	})
}

export { addToRecents, getAllRecents }
