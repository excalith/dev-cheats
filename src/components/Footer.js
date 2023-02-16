import "./Footer.css"
import React from "react"
import Link from "next/link"

const Footer = () => {
	return (
		<div className="footer wh-100 mt-auto">
			<p>
				Made with <span>&hearts;</span> by{" "}
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
