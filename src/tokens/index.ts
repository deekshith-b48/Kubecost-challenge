export const tokens = {
    colors: {
        // Background
        bgPrimary: "var(--color-bg-primary)",
        bgSecondary: "var(--color-bg-secondary)",
        bgTertiary: "var(--color-bg-tertiary)",

        // Text
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        textTertiary: "var(--color-text-tertiary)",

        // Accent - Primary (Kubecost Green)
        accentPrimary: "var(--color-accent-primary)",
        accentPrimaryHover: "var(--color-accent-primary-hover)",
        accentPrimaryLight: "var(--color-accent-primary-light)",

        // Accent - Success
        accentSuccess: "var(--color-accent-success)",
        accentSuccessLight: "var(--color-accent-success-light)",

        // Cloud Provider Colors
        aws: "var(--color-aws)",
        azure: "var(--color-azure)",
        googleCloud: "var(--color-google-cloud)",
        onPremise: "var(--color-on-premise)",

        // Utility
        border: "var(--color-border)",
        borderLight: "var(--color-border-light)",
    },

    spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
    },

    radius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
    },

    shadows: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
    },

    transitions: {
        fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
        base: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
        slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
} as const;

export type Tokens = typeof tokens;
