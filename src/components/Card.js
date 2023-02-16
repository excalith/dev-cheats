import "./Card.css"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import Code from "./Code"
import { BsFillArrowUpRightSquareFill } from "react-icons/bs"

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
		<div className={isHidden ? "card hidden" : "card"}>
			<div className={`mh-100 card-accent ${accent}`}></div>
			<div className="card-content">
				<div className="card-body">
					<h1 className="card-title">
						{data.url ? (
							<Link
								href={data.url}
								className="documentation-link"
								target="_blank"
								rel="noopener noreferrer nofollow">
								{data.name}
								<BsFillArrowUpRightSquareFill className="documentation-icon" />
							</Link>
						) : (
							<span>{data.name}</span>
						)}
					</h1>
					{category !== "" && (
						<p className={`card-category ${accent}`}>{category}</p>
					)}
					<p className="card-description">{data.description}</p>
					<h5 className="card-usage">Usage:</h5>
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
		</div>
	)
}

export default Card
