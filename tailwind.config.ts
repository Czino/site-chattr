import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class', // Enable dark mode
    theme: {
        extend: {
            colors: {
                purple: {
                    50: 'var(--purple-50)',
                    100: 'var(--purple-100)',
                    200: 'var(--purple-200)',
                    300: 'var(--purple-300)',
                    400: 'var(--purple-400)',
                    500: 'var(--purple-500)',
                    600: 'var(--purple-600)',
                    700: 'var(--purple-700)',
                    800: 'var(--purple-800)',
                    900: 'var(--purple-900)',
                },
                highlight: 'var(--highlight)',
            },
            backgroundImage: {
                'gradient-purple': 'linear-gradient(-45deg, var(--purple-300) 0%, var(--purple-900) 100%)',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['dark'], // Enable dark mode variants
            textColor: ['dark'], // Enable dark mode variants
        },
    },
    plugins: [],
}
export default config
