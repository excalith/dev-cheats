export function hasStorage(key) {
	return localStorage.hasOwnProperty(key)
}

export function getStorage(key) {
	return localStorage.getItem(key)
}

export function setStorage(key, value) {
	localStorage.setItem(key, value)
}

export function deleteStorage(key) {
	localStorage.removeItem(key)
}
