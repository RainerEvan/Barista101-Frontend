/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: "'Poppins', sans-serif",
                roboto: "'Roboto Mono', monospace",
            },
            fontSize: {},
            fontWeight: {
                light: 300,
                regular: 400,
                medium: 500,
                semibold: 600,
                bold: 700
            },
            colors: {
                brown:'#541103'
            }
        },
    },
}