/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    daisyui: {
        themes: ["light", "dark", "cupcake"],
    },
    theme: {
        extend: {
            backgroundImage: {
                "hero-pattern": "url('../public/resources/customer.png')",
                "prediction-pattern": "url('../public/resources/crop.png')",
            },
            fontFamily: {
                poppins: ["Poppins"],
            },
        },
        daisyui: {
            themes: ["light", "dark", "cupcake"],
        },
    },
    plugins: [require("daisyui")],
};
