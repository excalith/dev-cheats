import React from "react"
import "./Alert.css"

// success danger warning info
const Alert = ({ message, type }) => {
	return (
		<div className={`display-linebreak alert alert-${type}`} role="alert">
			{message}
		</div>
	)
}

export default Alert
