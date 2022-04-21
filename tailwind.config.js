module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Some useful comment
      fontFamily: {
        'DMSerifDisplay': ['DM Serif Display', 'serif'],
      },
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}