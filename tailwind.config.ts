import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-poppins)', 'sans-serif'],
                mono: ['var(--font-azeret-mono)', 'monospace'],
                heading: ['var(--font-poppins)', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f5f7fb', // Lightest - for backgrounds
                    100: '#e4e9f4', // Very light - for hover states
                    200: '#c9d3e8', // Light - for borders
                    300: '#9eafd3', // Medium light - for secondary text
                    400: '#7289be', // Medium - for primary elements
                    500: '#274284', // Base color - for primary actions
                    600: '#233a77', // Darker - for hover states
                    700: '#1f326a', // Dark - for active states
                    800: '#1a2a5c', // Very dark - for text
                    900: '#15234f', // Darkest - for emphasis
                },
                brand: {
                    50: '#f5f7fb', // Lightest - for backgrounds
                    100: '#e4e9f4', // Very light - for hover states
                    200: '#c9d3e8', // Light - for borders
                    300: '#9eafd3', // Medium light - for secondary text
                    400: '#7289be', // Medium - for primary elements
                    500: '#274284', // Base color - for primary actions
                    600: '#233a77', // Darker - for hover states
                    700: '#1f326a', // Dark - for active states
                    800: '#1a2a5c', // Very dark - for text
                    900: '#15234f', // Darkest - for emphasis
                },
                accent: {
                    50: '#fff1f1',
                    100: '#ffe1e1',
                    200: '#ffc7c7',
                    300: '#ffa3a3',
                    400: '#ff6b6b',
                    500: '#ff4e51', // Base accent color
                    600: '#e63e41',
                    700: '#bf3436',
                    800: '#992a2c',
                    900: '#732021',
                },
            },
        },
    },
    plugins: [],
}

export default config
