/** @type {import('tailwindcss').Config} */
require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#1c1c28",
        "mid-gray": "#28293d",
        "light-gray": "#8f90a6",

        "light-blue": "#9dbff9",
        "mid-blue": "#5b8def",
        "dark-blue": "#0063f7",

        "light-orange": "#fccc75",
        "mid-orange": "#fdac42",
        "dark-orange": "#ff8800",
        
        "light-purple": "#dda5e9",
        "mid-purple": "#ac5dd9",
        "dark-purple": "#6600cc",

        "brand": "#6b64f2"

      },
      fontSize: {
        xss: "0.6rem"
      },
      gridTemplateColumns: {
        "dashboard": "180px 1fr"
      },
      gridTemplateRows: {
        "dashboard": "50px auto 1fr 50px",
        "dashboard-md": "50px 1fr 50px"
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio")
  ],
};
