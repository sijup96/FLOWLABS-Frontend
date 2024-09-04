/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      'gray-custom':'#7D8DA5',
      'gray-dark':'#30363F'
    },
    backgroundImage:{
      'gradient-gray':'linear-gradient(to bottom, #30363F, #7D8DA5)'
    }
  },
  plugins: [
    //...
    require('@tailwindcss/forms'),
  ],
}

