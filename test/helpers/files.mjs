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
