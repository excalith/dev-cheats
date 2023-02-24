import { withOGImage } from "next-api-og-image"

export default withOGImage({
	template: {
		html: ({ name, description }) => `
      <html>
        <head>
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <h1 class="flex flex-row text-6xl text-blue-300">${name} - ${desc}<span>💻</span></h1>
        </body>
      </html>
    `
	}
})
