module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-theme-color-100": "#FEAF00",
        "main-theme-color-50": "#F8D442",
        "light-beige-color": "#F2EAE1",
        "dim-gray-color": "#6C6C6C",
        "light-gray-color": "#E5E5E5",
        "off-white-shade-color": "#F2EAE1B2",
        "red-color": "#FE0000",
        "semi-transparent-gray": "#8080808C",
        "semi-transparent-black": "#00000080",
      },
      spacing: {
        "476px": "476px",
        "200px": "200px",
        "270px": "270px",
        "100px": "100px",
        "109px": "109px",
        "150px": "150px",
        "91px": "91px",
        "85px": "85px",
        "30px": "30px",
        "31px": "31px",
        "35px": "35px",
        "38px": "38px",
        "15px": "15px",
        "41px": "41px",
        "42px": "42px",
        "43px": "43px",
        "50px": "50px",
        "54px": "54px",
        "9px": "9px",
        "11px": "11px",
      },
      borderRadius: {
        "20px": "20px",
      },
      fontSize: {
        "22px": "22px",
      },
      boxShadow: {
        "custom-shadow": "8px 8px 4px 0px #00000040",
      },
      screens: {
        "custom-screen": "1349px",
        "custom-screen-2": "1036px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".before-content": {
          position: "relative",
        },
        ".before-content::before": {
          content: '""',
          position: "absolute",
          top: "-2px",
          left: "-14px",
          width: "4px",
          height: "36%",
          backgroundColor: "#F8D442",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
