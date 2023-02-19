import React from "react"
import { NextSeo } from "next-seo"
import Logo from "@/components/Logo"
import SearchList from "@/components/SearchList"
import Alert from "@/components/Alert"
import Footer from "@/components/Footer"

export default function Home({ errorMessage }) {
	return (
		<>
			<NextSeo
				title={"Home • Dev Cheats"}
				description={
					"Dev Cheats is a collection of cheatsheets for developers. It's a place where you can find all the cheatsheets you need in one place."
				}
			/>
			<div className="absolute w-full max-w-md transform -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2">
				<Logo />
				<br />
				{errorMessage && (
					<Alert
						message={[
							<div key="alert-main">
								No cheatsheet found for {errorMessage}
							</div>,
							<div key="alert-contribute">
								Please consider{" "}
								<a
									href="https://github.com/excalith"
									target="_blank"
									rel="noopener noreferrer nofollow">
									contributing
								</a>{" "}
								to the project.
							</div>
						]}
						type="danger"
					/>
				)}
				<SearchList />
			</div>
			<Footer style="absolute w-full bottom-5" />
		</>
	)
}
