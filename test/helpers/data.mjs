import path from "path"
import { promises as fs } from "fs"
const dataDir = path.join(process.cwd(), "public/data")

export class InvalidDataException {
	constructor() {
		this.message = "invalid data"
		this.name = "InvalidDataException"
	}
}

export const validateJSON = (data) => {
	try {
		if (data) {
			JSON.parse(data)
			return true
		} else {
			throw new InvalidDataException()
		}
	} catch (e) {
		if (e instanceof InvalidDataException) {
			throw e
		}
		return e
	}
}

export async function validateDocument(document) {
	const filePath = path.join(dataDir + "/docs/", document)

	let errors = []
	await fs.readFile(filePath, "utf8").then((contents) => {
		const data = JSON.parse(contents)

		if (data.meta.title === "") errors.push("No document title provided")
		if (data.meta.contribs.length === 0) errors.push("Contribs empty")

		// data.map((d) => {
		// 	if (d.name === "") return "Command found without a name"
		// 	if (d.category === "") return d.name + " category is missing"
		// 	if (d.description === "") return d.name + " description is missing"
		// 	if (d.keywords === "") return d.name + " keywords are missing"
		// 	if (d.usage.length === 0) return d.name + " usage is missing"
		// 	d.usage.map((usage) => {
		// 		if (usage.code === "") return d.name + " usage is missing"
		// 		if (usage.description === "")
		// 			return d.name + " usage description is missing"
		// 	})

		// 	return ""
		// })
	})
	// .then(() => {
	// })
	return errors
}
