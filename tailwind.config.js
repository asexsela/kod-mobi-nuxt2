/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},

  },
  daisyui: {
    themes: ["dracula"],
    logs: false,
  },
  plugins: [
    require("daisyui")
  ],
}

