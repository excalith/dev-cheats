import React from "react"
import { NextSeo } from "next-seo"
import Logo from "@/components/Logo"
import SearchList from "@/components/SearchList"
import Alert from "@/components/Alert"
import Footer from "@/components/Footer"
import "./index.css"

export default function Home({ errorMessage }) {
	return (
		<div className="container container-sm d-flex flex-column min-vh-100">
			<NextSeo
				title={"Home • Dev Cheats"}
				description={
					"Dev Cheats is a collection of cheatsheets for developers. It's a place where you can find all the cheatsheets you need in one place."
				}
			/>
			<div className="main-wrapper position-absolute start-50 translate-middle">
				<Logo />
				<br />
				{errorMessage && (
					<Alert
						message={[
							<span key="alert-main">
								No cheatsheet found for {errorMessage}
							</span>,
							<span key="alert-contribute">
								Please consider{" "}
								<a
									href="https://github.com/excalith"
									target="_blank"
									rel="noopener noreferrer nofollow">
									contributing
								</a>{" "}
								to the project.
							</span>
						]}
						type="danger"
					/>
				)}
				<SearchList />
			</div>
			<Footer />
		</div>
	)
}
