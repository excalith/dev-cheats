import React from "react"
import SEO from "@components/SEO"
import Logo from "@components/Logo"
import SearchDatabase from "@/components/SearchDatabase"
import Alert from "@components/Alert"
import Footer from "@components/Footer"

export default function Home({ missingCommand }) {
	return (
		<>
			<SEO
				title={"Home"}
				description={
					"Dev Cheats is a community-driven collection of cheatsheets for developers. It's a place where you can find all the cheatsheets you need in one place."
				}
				imageText={
					"A community-driven collection of cheatsheets for developers"
				}
			/>
			<div className="absolute w-full max-w-md transform -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2">
				<Logo />
				<br />
				{missingCommand && (
					<Alert
						message={[
							<div key="alert-main w-full">
								No cheatsheet found for{" "}
								<span className="font-medium text-red">
									{missingCommand}
								</span>
							</div>,
							<div key="alert-contribute">
								You can request it from{" "}
								<a
									className="text-blue"
									href={`https://github.com/excalith/dev-cheats/issues/new?assignees=&labels=documentation%2C+enhancement&template=documentation-request.md&title=%5BDOCS%5D+Request:%20${missingCommand}`}
									target="_blank"
									rel="noopener noreferrer nofollow">
									here
								</a>
							</div>
						]}
						type="danger"
					/>
				)}
				<SearchDatabase />
			</div>
			<Footer style="absolute w-full bottom-5" contribs={[]} />
		</>
	)
}
