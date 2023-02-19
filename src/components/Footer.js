import React from "react"
import Link from "next/link"

const Footer = ({ style }) => {
	return (
		<div className={style}>
			<p className="text-center ">
				Made with <span className="text-red">&hearts;</span> by{" "}
				<Link
					target="_blank"
					rel="noopener noreferrer nofollow"
					href="https://github.com/excalith/dev-cheats">
					excalith
				</Link>
			</p>
		</div>
	)
}

export default Footer
