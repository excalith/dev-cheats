import "bootstrap/dist/css/bootstrap.css"
import "../../styles/globals.css"
import { Rubik } from "@next/font/google"

import { ThemeProvider } from "next-themes"

const rubik = Rubik({
	weight: ["400", "500"],
	subsets: ["latin"]
})

function DevCheats({ Component, pageProps }) {
	return (
		<ThemeProvider>
			<main className={rubik.className}>
				<Component {...pageProps} />
			</main>
		</ThemeProvider>
	)
}

export default DevCheats
