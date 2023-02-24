// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://vercel.com/guides/loading-static-file-nextjs-api-route
import path from "path"
import { promises as fs } from "fs"

export default async function handler(req, res) {
	try {
		// Only GET method is allowed
		if (req.method !== "GET") {
			return res
				.status(405)
				.send({ message: `${req.method} method not allowed` })
		}

		// Check if the query is empty
		const hasQuery = Object.keys(req.query).length !== 0

		// If the query is empty, return the docs list
		if (hasQuery) {
			return getDocument(req, res)
		} else {
			return getDocumentList(res)
		}
	} catch (error) {
		console.error(error)
		return res.status(500).send({ message: "Server Error" })
	}
}

async function getDocument(req, res) {
	// Set default docsuage
	let docs = req.query.doc

	// Find the absolute path of the json directory
	const dataDirectory = path.join(process.cwd(), "public/data/docs")
	const filePath = path.join(dataDirectory, `${docs}.json`)

	// Read the json data file data.json
	const fileContents = await fs.readFile(filePath, "utf8")

	if (fileContents === undefined) {
		res.status(404).end()
		return
	}

	return res.status(200).json(JSON.parse(fileContents))
}

async function getDocumentList(res) {
	//Find the absolute path of the json directory
	const jsonDirectory = path.join(process.cwd(), "public/data/")

	//Read the json data file data.json
	const fileContents = await fs.readFile(jsonDirectory + "list.json", "utf8")

	if (fileContents === undefined) {
		res.status(404).end()
		return
	}

	//Return the content of the data file in json format
	res.status(200).json(JSON.parse(fileContents))
}
