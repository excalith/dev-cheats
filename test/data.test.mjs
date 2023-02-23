import test from "ava"
import {
	fileExists,
	getList,
	getFilesInDir,
	validateJSON,
	validateDocument
} from "./helpers/files.mjs"

test.serial("List database exists", async (t) => {
	const hasFile = await fileExists("list.json")
	t.true(hasFile)
})

test.serial("List database is valid", async (t) => {
	const { isValid } = await validateJSON(await getList())
	t.true(isValid)
})

test.serial("All files route to correct document", async (t) => {
	const data = await getList(true)

	const filePromises = data.map(async (file) => {
		const hasFile = await fileExists(`docs/${file}.json`)
		return { hasFile, file }
	})

	const fileResults = await Promise.all(filePromises)
	const failedResults = fileResults.filter(
		(result) => result.hasFile === false
	)

	t.deepEqual(
		failedResults,
		[],
		`\n   ${
			failedResults.length
		} files do not exist or route to correct document: \n   ${failedResults
			.map((result) => result.file)
			.join(", ")}`
	)
})

test.serial("All documents are valid", async (t) => {
	const data = await getFilesInDir("docs")

	const filePromises = data.map(async (file) => {
		const errors = await validateDocument(`${file}`)
		return { file, errors }
	})

	const fileResults = await Promise.all(filePromises)
	const failedResults = fileResults.filter(
		(result) => result.errors.length !== 0
	)

	t.deepEqual(
		failedResults,
		[],
		`\n${failedResults.length} issues:   
${failedResults
	.map(
		(result) =>
			// eslint-disable-next-line prettier/prettier
			"• " +
			result.file +
			":\n" +
			result.errors.map((error) => "  " + error).join("\n")
	)
	.join("\n")}`
	)
})
