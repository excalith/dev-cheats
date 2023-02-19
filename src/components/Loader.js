import React from "react"
import { ScaleLoader } from "react-spinners"

const Loader = () => {
	return (
		<ScaleLoader
			className="absolute transform -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2"
			color="#6366f1"
			height={80}
			radius={8}
			width={24}
		/>
	)
}

export default Loader
