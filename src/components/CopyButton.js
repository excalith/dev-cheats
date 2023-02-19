import React, { useState } from "react"
import { IoCopy } from "react-icons/io5"

const CopyButton = ({ usage }) => {
	const [isHidden, setHidden] = useState(true)

	const handleCopy = () => {
		setHidden(false)
		navigator.clipboard.writeText(usage)
		setTimeout(
			function () {
				setHidden(true)
			}.bind(this),
			1000
		)
	}

	return (
		<div className="absolute top-0 right-0 h-full m-1 copy-button-wrapper">
			<button
				className={`border-solid rounded h-9 border-1 w-10 text-cardBackground border-cardBackground bg-background hover:text-green hover:border-green ${
					isHidden & "active"
				}`}
				onClick={handleCopy}>
				<IoCopy className="ml-3" />
			</button>
			<span
				className={`absolute px-2 rounded font-sans text-sm py-1 -top-10 -right-3 bg-background top-50 text-green transition-opacity ease-in-out ${
					isHidden ? "opacity-0" : "opacity-100"
				}`}>
				Copied
			</span>
		</div>
	)
}

export default CopyButton
