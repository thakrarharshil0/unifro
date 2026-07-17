// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton", "sans-serif"],
      },
      screens: {
        '3xl': '2500px',
      },
      animation: {
        infiniteScroll: "infiniteScroll 40s linear infinite",
        slideBanner: "slideBanner 20s linear infinite",
        rotateAsterisk: "rotateAsterisk 2s linear infinite",
        pulseX: 'pulseX 2s ease-in-out infinite',
        dropIn: 'dropIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        infiniteScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slideBanner: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        rotateAsterisk: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseX: {
          '0%,100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
        },
        dropIn: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
