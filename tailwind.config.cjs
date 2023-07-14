module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
      xl2: "1360px",
    },
    extend: {
      lineClamp: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#8FD7D9",
          secondary: "#cffafe",
          accent: "#d1d5db",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#6b7280",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
