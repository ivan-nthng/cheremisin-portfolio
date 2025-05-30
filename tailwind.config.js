module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Bricolage Grotesque"', 'sans-serif'],
            },
            fontWeight: {
                header: '600', // font-semibold
                body: '400', // font-normal
            },
            fontSize: {
                tech: ['9px', { lineHeight: 'theme(lineHeight.tech)' }],
                xs: [
                    'theme(spacing.3)',
                    { lineHeight: 'theme(lineHeight.xs)' },
                ],
                sm: [
                    'theme(spacing.3_5)',
                    { lineHeight: 'theme(lineHeight.sm)' },
                ],
                base: [
                    'theme(spacing.4)',
                    { lineHeight: 'theme(lineHeight.base)' },
                ],
                md: [
                    'theme(spacing.5)',
                    { lineHeight: 'theme(lineHeight.md)' },
                ],
                lg: [
                    'theme(spacing.6)',
                    { lineHeight: 'theme(lineHeight.lg)' },
                ],
                xl: [
                    'theme(spacing.7)',
                    { lineHeight: 'theme(lineHeight.xl)' },
                ],
                '2xl': [
                    'theme(spacing.8)',
                    { lineHeight: 'theme(lineHeight.2xl)' },
                ],
                '3xl': [
                    'theme(spacing.10)',
                    { lineHeight: 'theme(lineHeight.3xl)' },
                ],
                '4xl': [
                    'theme(spacing.12)',
                    { lineHeight: 'theme(lineHeight.4xl)' },
                ],
            },
            lineHeight: {
                tech: 'theme(spacing.4)',
                xs: 'theme(spacing.4)',
                sm: 'theme(spacing.5)',
                base: 'theme(spacing.6)',
                md: 'theme(spacing.7)',
                lg: 'theme(spacing.8)',
                xl: 'theme(spacing.9)',
                '2xl': 'theme(spacing.10)',
                '3xl': 'theme(spacing.12)',
                '4xl': 'theme(spacing.14)',
            },
            spacing: {
                3: '12px',
                '3_5': '14px',
                4: '16px',
                5: '20px',
                6: '24px',
                7: '28px',
                8: '32px',
                9: '36px',
                10: '40px',
                12: '48px',
                14: '56px',
            },
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                background: 'var(--color-bg)',
                text: 'var(--color-text)',
                // Add warm variants if needed
            },
        },
    },
    plugins: [],
}
