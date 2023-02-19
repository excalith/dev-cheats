import React, { useRef } from "react"
import Link from "next/link"

const Footer = ({ style, contribs }) => {
	const contribElement = useRef(null)

	const handleContribs = () => {
		contribElement.current.classList.toggle("invisible")
	}

	return (
		<div className={`text-center ${style}`}>
			Made with <span className="text-red">&hearts;</span> by{" "}
			<Link
				className="text-blue"
				target="_blank"
				rel="noopener noreferrer nofollow"
				href="https://github.com/excalith/dev-cheats">
				excalith
			</Link>
			{contribs.length > 0 && (
				<span>
					{" and "}
					<span
						className="cursor-pointer text-blue hover:underline"
						onClick={handleContribs}>
						{contribs.length === 1
							? "1 contributor"
							: `${contribs.length} contributors`}
					</span>
					{contribs.length > 0 && (
						<div
							className="invisible w-3/5 mx-auto mt-2 text-center display-linebreak"
							ref={contribElement}>
							{contribs.map((contrib, index) => (
								<span key={index}>
									<Link
										key={index}
										className="text-blue"
										target="_blank"
										rel="noopener noreferrer nofollow"
										href={`https://github.com/${contrib}`}>
										{contrib}
									</Link>{" "}
								</span>
							))}
						</div>
					)}
				</span>
			)}
		</div>
	)
}

export default Footer
