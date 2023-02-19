import React, { useState, useEffect } from "react"
import Link from "next/link"
import Code from "./Code"

const Card = ({ data, category, accent, query, complexity }) => {
	const [isHidden, setHidden] = useState(false)

	useEffect(() => {
		if (data.complexity > complexity) {
			setHidden(true)
			return
		}

		if (query) {
			setHidden(!data.keywords.includes(query))
		} else {
			setHidden(false)
		}
	}, [query, complexity, data.keywords, data.complexity]),
		[isHidden]

	return (
		<div
			className={`relative mb-4 bg-cardBackground rounded-lg drop-shadow-2xl ${
				isHidden && "hidden"
			}`}>
			<div className={`absolute h-full rounded ${accent}`}></div>

			<div className="mt-1.25 mr-1.25 mb-0 ml-3 p-4">
				<h1>
					{data.url ? (
						<Link
							href={data.url}
							className="px-2 -ml-2 text-4xl font-medium text-white rounded visited:text-white text-title hover:no-underline hover:bg-blue"
							target="_blank"
							rel="noopener noreferrer nofollow">
							{data.name}
						</Link>
					) : (
						<span className="text-4xl font-medium">
							{data.name}
						</span>
					)}
				</h1>

				{category !== "" && (
					<p className={`absolute text-lg top-4 right-4 ${accent}`}>
						{category}
					</p>
				)}

				<p className="mt-2.5 mb-6 text-base">{data.description}</p>

				<h2 className="mt-3 mb-1 text-xl font-medium">Usage:</h2>
				<div>
					{data.usage.map((usage, index) => {
						{
							return (
								<Code
									key={index}
									usage={usage}
									complexity={complexity}
								/>
							)
						}
					})}
				</div>
			</div>
		</div>
	)
}

export default Card
