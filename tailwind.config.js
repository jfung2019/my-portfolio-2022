module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        'red-a': {
          css: {
            a: {
              color: '#FFFF00',
            },
          },
        },
      },
      // Some useful comment
      fontFamily: {
        'DMSerifDisplay': ['DM Serif Display', 'serif'],
        'DmSans': ['DM Sans', 'serif']
      },
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      backgroundColor: ['active'],
      colors: {
        'general-black': '#0B0B0B',
        'black-v1': '#202020',
        'gold': '#EABE7B',
        'portfolio-gold': '#eabe7b'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}