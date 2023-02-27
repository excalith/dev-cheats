import React, { useRef, useEffect } from "react"
import { openLink } from "@utils/openLink"
import { useLocalStorage } from "@/hooks/useLocalStorage"

const Search = ({ slug, metadata, onSearchChange, onComplexityChange }) => {
	const searchElement = useRef(null)
	const complexityElement = useRef(null)
	const [complexityValue, setComplexityValue] = useLocalStorage(
		`${slug}-complexity`,
		0
	)

	useEffect(() => {
		complexityElement.current.value = complexityValue
		onComplexityChange(complexityValue)
	}, [complexityValue, onComplexityChange])

	useEffect(() => {
		// Focus on search bar
		if (searchElement.current) {
			searchElement.current.focus()
		}
	}, [])

	const handleHomeClick = (e) => {
		openLink("/", "_self")
	}

	return (
		<div className="sticky z-50 top-0 h-16 mt-3.5 mb-6 p-1.5 space-x-2 rounded-lg drop-shadow-2xl bg-cardBackground flex">
			<button
				className="px-4 font-sans text-xl text-center text-white align-middle transition duration-300 ease-in-out delay-150 rounded cursor-pointer w-25 bg-red hover:-translate-2 hover:scale-125 hover:bg-blue"
				onClick={handleHomeClick}>
				D
			</button>
			<input
				className="h-full px-4 font-sans text-xl text-center rounded-lg outline-none grow bg-background"
				type="text"
				onChange={(e) => onSearchChange(e.target.value)}
				placeholder={`Search ${metadata.title} Commands`}
				autoFocus
				ref={searchElement}
			/>
			{metadata.complexity && metadata.complexity.length > 0 && (
				<select
					className="h-full px-4 font-sans rounded-lg outline-none w-25 p-5text-large bg-background"
					onChange={(e) => setComplexityValue(e.target.value)}
					ref={complexityElement}>
					{metadata.complexity.map((item, index) => {
						return (
							<option key={index} value={index}>
								{item}
							</option>
						)
					})}
				</select>
			)}
		</div>
	)
}

export default Search
