import {
	hasStorage,
	getStorage,
	setStorage,
	deleteStorage
} from "@/utils/storage"

function addToRecents(key) {
	const maxRecentSearches = 5
	let recents = []

	const hasRecentSearches = hasStorage("recent-searches")

	if (hasRecentSearches) {
		recents = JSON.parse(getStorage("recent-searches"))
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
	const hasRecentSearches = hasStorage("recent-searches")
	if (hasRecentSearches) {
		return JSON.parse(getStorage("recent-searches"))
	}

	return []
}

function clearRecents() {
	deleteStorage("recent-searches")
}

function saveCookie(name, data) {
	setStorage(name, data, {
		secure: true,
		sameSite: "strict"
	})
}

export { addToRecents, getAllRecents, clearRecents }
