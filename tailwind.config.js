const config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './public/*.html'],
    darkMode: 'class',
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
            backgroundColor: ['dark'],
            textColor: ['dark'],
        },
    },
    plugins: [],
}
export default config
