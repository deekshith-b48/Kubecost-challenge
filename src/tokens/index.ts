export const tokens = {
    colors: {
        // Backgrounds
        bgPrimary: 'var(--color-bg-primary)',
        bgSecondary: 'var(--color-bg-secondary)',
        bgTertiary: 'var(--color-bg-tertiary)',
        bgCard: 'var(--color-bg-card)',
        bgGlass: 'var(--color-bg-glass)',

        // Text
        textPrimary: 'var(--color-text-primary)',
        textSecondary: 'var(--color-text-secondary)',
        textTertiary: 'var(--color-text-tertiary)',

        // Brand accent — Kubecost green
        accentPrimary: 'var(--color-accent-primary)',
        accentPrimaryHover: 'var(--color-accent-primary-hover)',
        accentPrimaryLight: 'var(--color-accent-primary-light)',
        accentPrimaryGlow: 'var(--color-accent-primary-glow)',

        // Semantic status
        accentSuccess: 'var(--color-accent-success)',
        accentSuccessLight: 'var(--color-accent-success-light)',
        accentWarning: 'var(--color-accent-warning)',
        accentWarningLight: 'var(--color-accent-warning-light)',
        accentError: 'var(--color-accent-error)',
        accentErrorLight: 'var(--color-accent-error-light)',

        // Resource category colors  (referenced via CSS var — never raw hex in components)
        cpu: 'var(--color-cpu)',
        gpu: 'var(--color-gpu)',
        ram: 'var(--color-ram)',
        storage: 'var(--color-storage)',
        network: 'var(--color-network)',
        cloud: 'var(--color-cloud)',

        // Cloud Provider Brand Colors
        aws: 'var(--color-aws)',
        awsLight: 'var(--color-aws-light)',
        azure: 'var(--color-azure)',
        azureLight: 'var(--color-azure-light)',
        gcp: 'var(--color-google-cloud)',
        gcpLight: 'var(--color-google-cloud-light)',
        onPrem: 'var(--color-on-premise)',
        onPremLight: 'var(--color-on-premise-light)',

        // UI
        border: 'var(--color-border)',
        borderHover: 'var(--color-border-hover)',
        borderLight: 'var(--color-border-light)',
    },

    spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
    },

    radius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
    },

    shadows: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        glowGreen: 'var(--shadow-glow-green)',
    },

    transitions: {
        fast: 'var(--transition-fast)',
        base: 'var(--transition-base)',
        slow: 'var(--transition-slow)',
    },

    typography: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
    },
} as const;

export type Tokens = typeof tokens;

// ── Convenience maps — use these in component data arrays ──────────────────
// Maps ProviderType → CSS variable token (no raw hex in components)
export const PROVIDER_COLOR_TOKEN: Record<string, string> = {
    aws: tokens.colors.aws,
    azure: tokens.colors.azure,
    'google-cloud': tokens.colors.gcp,
    'on-premise': tokens.colors.onPrem,
};

// Maps resource type → CSS variable token
export const RESOURCE_COLOR_TOKEN: Record<string, string> = {
    cpu: tokens.colors.cpu,
    gpu: tokens.colors.gpu,
    ram: tokens.colors.ram,
    storage: tokens.colors.storage,
    network: tokens.colors.network,
    cloud: tokens.colors.cloud,
};

// Maps status → CSS variable token
export const STATUS_COLOR_TOKEN: Record<string, string> = {
    optimized: tokens.colors.accentSuccess,
    warning: tokens.colors.accentWarning,
    critical: tokens.colors.accentError,
};
