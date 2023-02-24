// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://vercel.com/guides/loading-static-file-nextjs-api-route
import path from "path"
import { promises as fs } from "fs"

// Find the absolute path of the json directory
const dataDirectory = path.join(process.cwd(), "public/data/")
const listPath = path.join(dataDirectory, "/list.json")

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
	// Get file path for document json
	const filePath = path.join(dataDirectory, `/docs/${req.query.doc}.json`)

	try {
		// Read the json data file data.json
		const fileContents = await fs.readFile(filePath, "utf8")

		// Return contents as JSON with 200 status
		return res.status(200).json(JSON.parse(fileContents))
	} catch (error) {
		return res.status(404).end()
	}
}

async function getDocumentList(res) {
	try {
		// Read the json data file list.json
		const fileContents = await fs.readFile(listPath, "utf8")

		// Return contents as JSON with 200 status
		return res.status(200).json(JSON.parse(fileContents))
	} catch (error) {
		return res.status(404).end()
	}
}
