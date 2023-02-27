import React, { useEffect } from "react"

// success danger warning info
const Alert = ({ message, type }) => {
	const [color, setColor] = React.useState("")

	useEffect(() => {
		switch (type) {
			case "success":
				setColor("border-green")
				break
			case "danger":
				setColor("border-red")
				break
			case "warning":
				setColor("border-yellow")
				break
			default:
			case "info":
				setColor("border-blue")
				break
		}
	}, [type])

	return (
		<div className="px-4">
			<div
				className={`w-full p-4 rounded my-4 border-1 text-center ${color}`}>
				{message}
			</div>
		</div>
	)
}

export default Alert
