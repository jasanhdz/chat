/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './client/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                teal: 'var(--teal)',
                outgoing: 'var(--outgoing-background)'
            }
        },
    },
    plugins: [],
}
