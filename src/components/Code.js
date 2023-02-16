import "./Code.css"
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
		<div className={isHidden ? "code-block hidden" : "code-block"}>
			<pre>
				<div className="code-row row g-0">
					<code
						className={`col d-sm-flex code ${firaCode.className}`}>
						{usage.code}
					</code>
					<CopyButton usage={usage.code} />
				</div>
			</pre>
			<p className="code-description">{usage.description}</p>
		</div>
	)
}

export default CodeBlock
