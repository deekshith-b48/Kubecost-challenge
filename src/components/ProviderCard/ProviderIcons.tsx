'use client';
import React from 'react';
import { ProviderType } from '@/lib/api';

/* ─────────────────────────────────────────────────────────────────────
   Real SVG icons for each cloud provider
   ───────────────────────────────────────────────────────────────────── */

export const AWSIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-label="Amazon Web Services" role="img">
        {/* Cloud shape */}
        <path
            d="M20 9C15.1 9 11.1 12.7 10.7 17.4C8.1 18.2 6 20.6 6 23.5C6 27.1 9 30 12.5 30H27.5C31.6 30 35 26.8 35 22.8C35 19.3 32.7 16.4 29.5 15.5C29 11.8 24.9 9 20 9Z"
            fill="currentColor"
            opacity="0.9"
        />
        {/* AWS smile arrow */}
        <path
            d="M13 34.5 Q20 38.5 27 34.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
        />
        <path
            d="M24 33 L27 35 L24 37"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
        />
    </svg>
);

export const AzureIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-label="Microsoft Azure" role="img">
        {/* Azure A-shape */}
        <path
            d="M7 34 L18 7 L28 22 L22 22"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        <path
            d="M14 25 L33 25"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
        />
        <path
            d="M23 25 L33 34"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
        />
        <path
            d="M7 34 L19 34"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
        />
    </svg>
);

export const GCPIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-label="Google Cloud Platform" role="img">
        {/* Google Cloud cloud shape */}
        <path
            d="M20 11C16.5 11 13.5 13.2 12.4 16.2C10.4 16.7 9 18.6 9 20.8C9 23.4 11.1 25.5 13.7 25.5H26.3C29.4 25.5 32 23.1 32 20.2C32 17.6 30.1 15.4 27.6 15.0C27.1 12.7 24.8 11 20 11Z"
            fill="currentColor"
            opacity="0.85"
        />
        {/* GCP colorful dots (brand) */}
        <circle cx="11" cy="32" r="3" fill="#EA4335" />
        <circle cx="20" cy="32" r="3" fill="#FBBC04" />
        <circle cx="29" cy="32" r="3" fill="#34A853" />
        <path d="M14 32 L17 32" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M23 32 L26 32" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    </svg>
);

export const OnPremiseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-label="On-Premise Server" role="img">
        {/* Server rack - 3 units */}
        <rect x="5" y="6" width="30" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <rect x="5" y="16" width="30" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
        <rect x="5" y="26" width="30" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none" />
        {/* Drive indicators */}
        <circle cx="32" cy="10" r="1.8" fill="currentColor" opacity="0.5" />
        <circle cx="32" cy="20" r="1.8" fill="#10B981" opacity="0.9" />
        <circle cx="32" cy="30" r="1.8" fill="#10B981" opacity="0.9" />
        {/* Drive slots */}
        <line x1="9" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <line x1="9" y1="20" x2="23" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
        <line x1="9" y1="30" x2="23" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
    </svg>
);

/* ─── Icon map ──────────────────────────────────────────────────────── */
export const PROVIDER_ICONS: Record<
    ProviderType,
    React.FC<{ className?: string }>
> = {
    aws: AWSIcon,
    azure: AzureIcon,
    'google-cloud': GCPIcon,
    'on-premise': OnPremiseIcon,
};
