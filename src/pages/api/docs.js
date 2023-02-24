// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://vercel.com/guides/loading-static-file-nextjs-api-route
import path from "path"
import { promises as fs } from "fs"

export default async function handler(req, res) {
	// Only GET method is allowed
	if (req.method !== "GET") {
		res.status(405).end()
		return
	}

	// Set default docsuage
	let docs = req.query.docs

	// Find the absolute path of the json directory
	const dataDirectory = path.join(process.cwd(), "public/data/docs")
	const filePath = path.join(dataDirectory, `${docs}.json`)

	// Read the json data file data.json
	const fileContents = await fs.readFile(filePath, "utf8")

	if (fileContents === undefined) {
		res.status(404).end()
		return
	}

	// Return the content of the data file in json format
	res.status(200).json(JSON.parse(fileContents))
}
