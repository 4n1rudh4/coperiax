/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // daisyui: {
    //     themes: ["light", "dark", "cupcake", "agrow"],
    // },
    daisyui: {
        themes: [
            {
                agrow: {
                    primary: "#77bfa3",
                    primaryfocus: "#dde7c7",
                    primarycontent: "#fff",

                    secondary: "#98c9a3",
                    secondaryfocus: "#edeec9",
                    secondarycontent: "#fff",

                    accent: "#bfd8bd",
                    accentfocus: "#dde7c7",
                    accentcontent: "#fff",

                    neutral: "#2a2a2a",
                    neutralfocus: "#2a2a2a",
                    neutralcontent: "#b5dccd",

                    base100: "#faf7f5",
                    base200: "#edeec9",
                    base300: "#cee0c2",
                    basecontent: "#2a2a2a",

                    info: "#1c92f2",
                    success: "#77bfa3",
                    warning: "#ff9900",
                    error: "#ff5724",

                    "--rounded-box": "1rem",
                    "--rounded-btn": "1rem",
                    "--rounded-badge": "1rem",

                    "--animation-btn": "0.5s",
                    "--animation-input": "0.5s",

                    "--btn-text-case": "uppercase",
                    "--navbar-padding": "1rem",
                    "--border-btn": "1px",
                },
            },
        ],
    },
    theme: {
        extend: {
            backgroundImage: {
                "hero-pattern": "url('../public/resources/customer.png')",
                "prediction-pattern": "url('../public/resources/crop.png')",
            },
            fontFamily: {
                poppins: ["Poppins"],
                cabin: ["Cabin"],
                inter: ["Inter"],
            },
            colors: {
                brwn: ["#E7E1C7"],
            },
        },
    },
    plugins: [require("daisyui")],
};
