/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.{html,ejs}'
    , "./public/**/*.js",
  ],
  safelist: [
    'w-5', 'h-5', 'w-6', 'h-6', 'mr-1', 'ml-1'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

