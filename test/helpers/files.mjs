import path from "path"
import { promises as fs } from "fs"
const dataDir = path.join(process.cwd(), "public/data")

export async function fileExists(filePath) {
	try {
		await fs.access(path.join(dataDir, filePath))
		return true
	} catch {
		return false
	}
}

export async function getList(asJson = false) {
	const filePath = path.join(dataDir, "list.json")
	const fileContents = fs.readFile(filePath, "utf8")

	if (asJson) {
		return JSON.parse(await fileContents)
	}

	return fileContents
}

export async function getFilesInDir(folder) {
	const files = await fs.readdir(path.join(dataDir, folder))
	return files
}

export async function getDocument(document) {
	const filePath = path.join(dataDir + "/docs/", document)
	const fileContents = fs.readFile(filePath, "utf8")
	return fileContents
}

export const validateJSON = (content) => {
	let data, isValid
	try {
		if (content) {
			data = JSON.parse(content)
			isValid = true
		} else {
			isValid = false
		}
	} catch (e) {
		console.error(e)
		isValid = false
	}

	return { data, isValid }
}

export async function validateDocument(document) {
	const content = await getDocument(document)
	let errors = []

	let data
	try {
		let json = validateJSON(content)
		data = json.data
	} catch {
		errors.push("Invalid JSON")
		return errors
	}

	// META
	if (data.meta.title === "") errors.push("No document title provided")
	let complexityCount = 0
	if (data.meta.complexity) complexityCount = data.meta.complexity.length

	// CATEGORIES
	data.categories.map((category) => {
		category.commands.map((command) => {
			// COMMAND
			if (command.name === "") errors.push("No command name provided")
			if (command.description === "")
				errors.push(
					"No command description provided for " + command.name
				)
			if (command.keywords === "")
				errors.push("No command keywords provided for " + command.name)
			if (
				command.complexity &&
				(command.complexity > complexityCount - 1 ||
					command.complexity < 0)
			) {
				errors.push(
					"Invalid command complexity of " +
						command.complexity +
						" for " +
						command.name +
						" (Must be between 0 and " +
						complexityCount +
						" exclusive)"
				)
			}
			// COMMAND USAGE
			command.usage.map((usage) => {
				if (
					usage.complexity &&
					(usage.complexity > complexityCount - 1 ||
						usage.complexity < 0)
				) {
					errors.push(
						"Invalid command usage complexity of " +
							command.complexity +
							" for " +
							command.name +
							" (Must be between 0 and " +
							complexityCount +
							" exclusive)"
					)
				}

				if (!usage.code || usage.code === "") {
					errors.push(
						"No command usage code provided for " + command.name
					)
				}

				if (!usage.description || usage.description === "") {
					errors.push(
						"No command usage description provided for " +
							command.name
					)
				}
			})
		})
	})

	return errors
}
