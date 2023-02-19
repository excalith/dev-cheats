/** @type {import('tailwindcss').Config} */
const { createThemes } = require("tw-colors")

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: ["class", '[data-mode="dark"]'],
	important: true,
	theme: {
		fontFamily: {
			sans: ["Rubik", "Helvetica", "Arial", "sans-serif"],
			mono: ["FiraCode", "ui-monospace", "SFMono-Regular"]
		},
		fontSize: {
			xs: ["14px", "20px"],
			sm: ["15px", "20px"],
			base: ["16px", "24px"],
			lg: ["18px", "28px"],
			xl: ["20px", "32px"],
			"2xl": ["30px", "36px"],
			"4xl": ["36px", "40px"]
		},
		container: {
			center: true,
			screens: {
				sm: "600px",
				md: "728px",
				lg: "876px"
			}
		},
		borderWidth: {
			DEFAULT: "1px",
			accent: "3px",
			0: "0",
			1: "1px",
			2: "2px",
			3: "3px",
			4: "4px",
			5: "5px",
			6: "6px",
			8: "8px"
		},
		extend: {
			dropShadow: {
				"2xl": "0px 5px 15px rgba(0, 0, 0, 0.25)"
			}
		}
	},
	plugins: [
		createThemes({
			light: {
				background: "#e5e5e5",
				cardBackground: "#fafafa",
				default: "#000",
				code: "#000",
				description: "#6B7280",
				white: "#fafafa",
				gray: "#999999",
				black: "#000000",
				red: "#ff5252",
				green: "#8bc34a",
				blue: "#6366f1",
				orange: "#ff8800",
				purple: "#774aff",
				cyan: "#00bcd4",
				cherry: "#c2185b"
			},
			dark: {
				background: "#181926",
				cardBackground: "#24273a",
				default: "#fff",
				code: "#fff",
				description: "#cdd6f4",
				white: "#fafafa",
				gray: "#999999",
				black: "#000000",
				red: "#ff5252",
				green: "#8bc34a",
				blue: "#6366f1",
				orange: "#ff8800",
				purple: "#774aff",
				cyan: "#00bcd4",
				cherry: "#c2185b"
			}
		})
	]
}
