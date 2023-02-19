import React, { useEffect, useState } from "react"
import CopyButton from "./CopyButton"
import { Fira_Code } from "@next/font/google"

const firaCode = Fira_Code({
	weight: "500",
	subsets: ["latin"]
})

const CodeBlock = ({ usage, complexity }) => {
	const [isHidden, setHidden] = useState(false)

	useEffect(() => {
		setHidden(usage.complexity > complexity)
	}, [complexity, usage.complexity])

	return (
		<div
			className={`border-solid rounded-lg border-1 mb-4 border-background ${
				isHidden && "hidden"
			}`}>
			<pre className="relative bg-background h-11">
				<div className="h-full pl-2 pr-4 overflow-x-auto overflow-y-hidden leading-10 text-m mr-14">
					<code className={`text-xs ${firaCode.className}`}>
						{usage.code}
					</code>
				</div>
				<CopyButton usage={usage.code} />
			</pre>
			<p className="p-2 text-sm">{usage.description}</p>
		</div>
	)
}

export default CodeBlock
