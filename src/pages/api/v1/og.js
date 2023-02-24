// https://vercel.com/docs/concepts/functions/edge-functions/og-image-examples#dynamic-text-generated-as-image
import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"

export const config = {
	runtime: "experimental-edge"
}

export default function handler(req) {
	try {
		const { searchParams } = new URL(req.url)

		// ?title=<title>
		const hasDescription = searchParams.has("desc")
		const description = hasDescription
			? searchParams.get("desc")?.slice(0, 100)
			: "Cheatsheets For Developers"

		return new ImageResponse(
			(
				<div
					style={{
						backgroundColor: "#181926",
						backgroundSize: "150px 150px",
						height: "100%",
						width: "100%",
						display: "flex",
						textAlign: "center",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						flexWrap: "nowrap"
					}}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							justifyItems: "center"
						}}>
						{/* <img
							alt="Vercel"
							height={200}
							src="data:image/svg+xml,%3Csvg width='116' height='100' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M57.5 0L115 100H0L57.5 0z' /%3E%3C/svg%3E"
							style={{ margin: "0 30px" }}
							width={232}
						/> */}
						<h1
							style={{
								margin: "0 30px",
								fontWeight: "bold",
								fontSize: 80,
								fontFamily:
									"Rubik, Helvetica, Arial, sans-serif",
								textAlign: "center",
								color: "white",
								lineHeight: 1.2,
								verticalAlign: "middle"
							}}>
							<span
								style={{
									padding: "1rem",
									marginRight: "1rem",
									borderRadius: "0.5rem",
									backgroundColor: "#ff5252",
									lineHeight: 0.8,
									verticalAlign: "middle"
								}}>
								DEV
							</span>
							CHEATS
						</h1>
					</div>
					<div
						style={{
							fontSize: 55,
							fontStyle: "normal",
							letterSpacing: "-0.025em",
							color: "white",
							marginTop: 30,
							padding: "0 120px",
							lineHeight: 1.4,
							whiteSpace: "pre-wrap"
						}}>
						{description}
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630
			}
		)
	} catch (error) {
		return new Response(error.stack, { status: 500 })
	}
}
