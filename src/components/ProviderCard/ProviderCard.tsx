'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { CloudProviderData, ProviderType, StatusType } from '@/lib/api';
import { CountUp } from '../ui/CountUp';
import { PROVIDER_ICONS } from './ProviderIcons';

import { PROVIDER_COLOR_TOKEN, RESOURCE_COLOR_TOKEN, STATUS_COLOR_TOKEN } from '@/tokens';

/* ─── Color helpers — CSS var references, never raw hex ─────────────── */
const pc = (p: ProviderType) => PROVIDER_COLOR_TOKEN[p];
const pl = (p: ProviderType) => `var(--color-${p === 'google-cloud' ? 'google-cloud' : p === 'on-premise' ? 'on-premise' : p}-light)`;
const pg = (p: ProviderType) => `var(--color-${p === 'google-cloud' ? 'google-cloud' : p === 'on-premise' ? 'on-premise' : p}-glow)`;
const sc = (s: StatusType) => STATUS_COLOR_TOKEN[s];

/* ─── Styled components ──────────────────────────────────────────────── */

const Card = styled(motion.div) <{ $p: ProviderType; $sel: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: linear-gradient(135deg,
    rgba(255,255,255,0.05) 0%,
    rgba(255,255,255,0.02) 100%
  );
  backdrop-filter: blur(16px);
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  /* Top accent bar */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${({ $p }) => pc($p)};
    opacity: ${({ $sel }) => $sel ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  /* Ambient glow layer */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $p }) => pl($p)};
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ $p }) => pc($p)};
    box-shadow:
      0 0 28px ${({ $p }) => pg($p)},
      0 8px 32px rgba(0,0,0,0.4);

    &::before { opacity: 1; }
    &::after  { opacity: 1; }
  }

  ${({ $sel, $p }) => $sel && css`
    border-color: ${pc($p)};
    box-shadow:
      0 0 36px ${pg($p)},
      0 12px 40px rgba(0,0,0,0.5);

    &::before { opacity: 1; }
    &::after  { opacity: 1; }
  `}
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  padding: var(--space-xl);
`;

/* Header row */
const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
  gap: var(--space-md);
`;

const IconWrap = styled.div<{ $p: ProviderType }>`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  background: ${({ $p }) => pl($p)};
  border: 1px solid ${({ $p }) => pc($p)}33;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $p }) => pc($p)};

  svg {
    width: 26px;
    height: 26px;
  }
`;

const BadgeGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const StatusPill = styled.span<{ $s: StatusType }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $s }) => sc($s)};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $s }) => sc($s)};
    box-shadow: 0 0 7px ${({ $s }) => sc($s)};
    animation: ${({ $s }) =>
    $s === 'optimized' ? 'status-pulse 2s ease infinite' : 'none'
  };
  }

  @keyframes status-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%        { opacity: 0.5; transform: scale(1.4); }
  }
`;

const TrendPill = styled.span<{ $up: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.65rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: ${({ $up }) => $up ? 'var(--color-accent-error)' : 'var(--color-accent-success)'};
  background: ${({ $up }) => $up ? 'var(--color-accent-error-light)' : 'var(--color-accent-success-light)'};
  padding: 3px 7px;
  border-radius: var(--radius-full);
`;

/* Provider name */
const Name = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md) 0;
  line-height: 1.2;
`;

/* Cost block */
const CostBlock = styled.div`
  margin-bottom: var(--space-md);
`;

const CostLabel = styled.div`
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-tertiary);
  font-weight: 700;
  margin-bottom: 3px;
`;

const CostValue = styled.div<{ $p: ProviderType }>`
  font-size: 1.75rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: ${({ $p }) => pc($p)};
  line-height: 1;
  letter-spacing: -0.02em;
  filter: drop-shadow(0 0 10px ${({ $p }) => pg($p)});
`;

const CostRate = styled.div`
  font-size: 0.62rem;
  color: var(--color-text-tertiary);
  font-family: var(--font-mono);
  margin-top: 3px;
`;

/* Efficiency */
const EffRow = styled.div`
  margin-bottom: var(--space-lg);
`;

const EffHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const EffLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
`;

const EffPct = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--color-text-primary);
`;

const EffTrack = styled.div`
  height: 5px;
  background: rgba(255,255,255,0.06);
  border-radius: var(--radius-full);
  overflow: hidden;
`;

const EffFill = styled(motion.div) <{ $p: ProviderType }>`
  height: 100%;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg,
    ${({ $p }) => pc($p)},
    ${({ $p }) => pg($p)}
  );
  box-shadow: 0 0 8px ${({ $p }) => pg($p)};
`;

/* Resources grid */
const ResGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
  /* Logical properties — respects LTR/RTL and block/inline axes */
  padding-block: var(--space-md);
  padding-inline: 0;
  margin-block-end: var(--space-md);
  border-block-start: 1px solid var(--color-border);
  border-block-end:   1px solid var(--color-border);
`;

const ResItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  text-align: center;
`;

const ResIcon = styled.div<{ $p: ProviderType }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${({ $p }) => pl($p)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block-end: 2px;

  svg {
    width: 14px;
    height: 14px;
    color: ${({ $p }) => pc($p)};
  }
`;

const ResValue = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--color-text-primary);
`;

const ResLabel = styled.span`
  font-size: 0.58rem;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 600;
`;

/* CTA hint */
const HintBar = styled.div<{ $p: ProviderType }>`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 8px var(--space-md);
  background: ${({ $p }) => pl($p)};
  border: 1px solid ${({ $p }) => pc($p)}2A;
  border-radius: var(--radius-md);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-text-secondary);

  strong {
    color: var(--color-accent-primary);
    font-family: var(--font-mono);
  }
`;

/* ─── Resource SVG icons ─────────────────────────────────────────────── */
const CPUIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="3" y="3" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <rect x="5" y="5" width="6" height="6" rx="0.5" fill="currentColor" opacity="0.6" />
    <line x1="6" y1="1.5" x2="6" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="10" y1="1.5" x2="10" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="6" y1="13" x2="6" y2="14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="10" y1="13" x2="10" y2="14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="1.5" y1="6" x2="3" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="1.5" y1="10" x2="3" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="13" y1="6" x2="14.5" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="13" y1="10" x2="14.5" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const RAMIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="1" y="4" width="14" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <line x1="4" y1="6.5" x2="4" y2="9.5" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    <line x1="6.5" y1="6.5" x2="6.5" y2="9.5" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    <line x1="9" y1="6.5" x2="9" y2="9.5" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    <line x1="11.5" y1="6.5" x2="11.5" y2="9.5" stroke="currentColor" strokeWidth="1" opacity="0.7" />
    <line x1="4" y1="12" x2="4" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="12" y1="12" x2="12" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const StorageIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="12" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <rect x="2" y="7" width="12" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <rect x="2" y="12" width="12" height="2" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <circle cx="13" cy="4" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="13" cy="9" r="1" fill="var(--color-accent-primary)" />
    <circle cx="13" cy="13" r="0.8" fill="var(--color-accent-primary)" />
  </svg>
);

/* ─── Component ──────────────────────────────────────────────────────── */
interface ProviderCardProps {
  data: CloudProviderData;
  index: number;
  isSelected: boolean;
  isConnected: boolean;
  onClick: () => void;
}

export const ProviderCard = React.forwardRef<HTMLDivElement, ProviderCardProps>(
  ({ data, index, isSelected, isConnected, onClick }, ref) => {
    const Icon = PROVIDER_ICONS[data.provider];
    const perSec = (data.monthlyCost / (30 * 24 * 3600)).toFixed(4);
    const savings = Math.floor(data.monthlyCost * 0.15);

    return (
      <Card
        ref={ref}
        $p={data.provider}
        $sel={isSelected}
        onClick={onClick}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 + index * 0.12, duration: 0.55, ease: 'easeOut' }}
        whileHover={{ y: -3 }}
      >
        <Inner>
          <HeaderRow>
            <IconWrap $p={data.provider}><Icon /></IconWrap>
            <BadgeGroup>
              <StatusPill $s={data.status}>{data.status}</StatusPill>
              <TrendPill $up={data.trend > 0}>
                {data.trend > 0 ? '▲' : '▼'} {Math.abs(data.trend)}%
              </TrendPill>
            </BadgeGroup>
          </HeaderRow>

          <Name>{data.name}</Name>

          <CostBlock>
            <CostLabel>Monthly Cost</CostLabel>
            <CostValue $p={data.provider}>
              {isConnected
                ? <CountUp end={data.monthlyCost} duration={1.6} prefix="$" />
                : '$—'}
            </CostValue>
            <CostRate>${perSec}/sec</CostRate>
          </CostBlock>

          <EffRow>
            <EffHeader>
              <EffLabel>Efficiency</EffLabel>
              <EffPct>{data.efficiency}%</EffPct>
            </EffHeader>
            <EffTrack>
              <EffFill
                $p={data.provider}
                initial={{ width: 0 }}
                animate={{ width: isConnected ? `${data.efficiency}%` : '0%' }}
                transition={{ delay: 0.4 + index * 0.1, duration: 1.1, ease: 'easeOut' }}
              />
            </EffTrack>
          </EffRow>

          <ResGrid>
            <ResItem>
              <ResIcon $p={data.provider}><CPUIcon /></ResIcon>
              <ResValue>{data.resources.cpu}</ResValue>
              <ResLabel>Cores</ResLabel>
            </ResItem>
            <ResItem>
              <ResIcon $p={data.provider}><RAMIcon /></ResIcon>
              <ResValue>{data.resources.memory}GB</ResValue>
              <ResLabel>RAM</ResLabel>
            </ResItem>
            <ResItem>
              <ResIcon $p={data.provider}><StorageIcon /></ResIcon>
              <ResValue>
                {data.resources.storage >= 1024
                  ? `${(data.resources.storage / 1024).toFixed(1)}TB`
                  : `${data.resources.storage}GB`}
              </ResValue>
              <ResLabel>Storage</ResLabel>
            </ResItem>
          </ResGrid>

          <HintBar $p={data.provider}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 5h2v2H7V5zm0 3h2v5H7V8z" fill="currentColor" />
            </svg>
            Click to save&nbsp;<strong>${savings}/mo</strong>
          </HintBar>
        </Inner>
      </Card>
    );
  }
);

ProviderCard.displayName = 'ProviderCard';
