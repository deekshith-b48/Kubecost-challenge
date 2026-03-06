'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { CostMetrics } from '@/lib/api';
import { CountUp } from '../ui/CountUp';

/* ─── Styled ──────────────────────────────────────────────────────── */
const Wrap = styled(motion.div)`
  background: var(--gradient-card);
  border: 1px solid var(--color-accent-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-glow-green), var(--shadow-lg);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-glow);
    pointer-events: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-xl);
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 4px 0;
`;

const LiveBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent-success);
  background: var(--color-accent-success-light);
  border: 1px solid rgba(34, 197, 94, 0.3);
  padding: 3px 8px;
  border-radius: var(--radius-full);

  &::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--color-accent-success);
    animation: live-pulse 1.5s ease infinite;
  }

  @keyframes live-pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
    50% { opacity: 0.6; box-shadow: 0 0 0 4px rgba(34,197,94,0); }
  }
`;

const TotalBlock = styled.div`
  text-align: right;
`;

const TotalLabel = styled.div`
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-tertiary);
  font-weight: 600;
`;

const TotalValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--color-accent-primary);
  line-height: 1.1;
  margin-top: 2px;
`;

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  z-index: 1;
  margin-bottom: var(--space-lg);
`;

const BarRow = styled.div`
  display: grid;
  grid-template-columns: 52px 1fr 72px;
  align-items: center;
  gap: 10px;
`;

const BarLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
`;

const BarTrack = styled.div`
  height: 28px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  position: relative;
`;

const BarFill = styled(motion.div) <{ $color: string }>`
  height: 100%;
  background: ${({ $color }) => $color};
  border-radius: var(--radius-sm);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
      rgba(255,255,255,0.18) 0%,
      transparent 50%,
      rgba(0,0,0,0.12) 100%
    );
  }
`;

const BarEnd = styled.div<{ $color: string }>`
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 18px;
  background: ${({ $color }) => $color};
  filter: blur(8px);
  opacity: 0.6;
`;

const BarValue = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--color-text-primary);
  text-align: right;
  white-space: nowrap;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
  position: relative;
  z-index: 1;
`;

const UpdatedText = styled.span`
  font-size: 0.65rem;
  color: var(--color-text-tertiary);
`;

/* ─── Bar config ──────────────────────────────────────────────────── */
const BARS = [
    { key: 'cpuCost', label: 'CPU', color: '#10B981' },
    { key: 'gpuCost', label: 'GPU', color: '#FF9900' },
    { key: 'ramCost', label: 'RAM', color: '#0089D6' },
    { key: 'pvCost', label: 'PV', color: '#4285F4' },
    { key: 'networkCost', label: 'Network', color: '#8B5CF6' },
    { key: 'cloudCost', label: 'Cloud', color: '#EC4899' },
] as const;

/* ─── Component ──────────────────────────────────────────────────── */
interface CostDashboardProps {
    metrics: CostMetrics;
    isActive: boolean;
}

export const CostDashboard: React.FC<CostDashboardProps> = ({ metrics, isActive }) => {
    const values = BARS.map(b => metrics[b.key as keyof CostMetrics] as number);
    const maxVal = Math.max(...values);

    return (
        <Wrap
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 120 }}
        >
            <Header>
                <div>
                    <Title>Global Cost Overview</Title>
                    <LiveBadge>Live</LiveBadge>
                </div>
                <TotalBlock>
                    <TotalLabel>Monthly Run Rate</TotalLabel>
                    <TotalValue>
                        {isActive
                            ? <CountUp end={metrics.totalCost} duration={2} prefix="$" />
                            : '$0'}
                    </TotalValue>
                </TotalBlock>
            </Header>

            <Chart>
                {BARS.map(({ key, label, color }, i) => {
                    const value = metrics[key as keyof CostMetrics] as number;
                    const pct = Math.max((value / maxVal) * 100, 4);

                    return (
                        <BarRow key={key}>
                            <BarLabel>{label}</BarLabel>
                            <BarTrack>
                                <BarFill
                                    $color={color}
                                    initial={{ width: 0 }}
                                    animate={{ width: isActive ? `${pct}%` : '0%' }}
                                    transition={{ delay: 0.8 + i * 0.1, duration: 0.7, ease: 'easeOut' }}
                                >
                                    <BarEnd $color={color} />
                                </BarFill>
                            </BarTrack>
                            <BarValue>
                                {isActive
                                    ? <CountUp end={value} duration={1.5} prefix="$" />
                                    : '$0'}
                            </BarValue>
                        </BarRow>
                    );
                })}
            </Chart>

            <Footer>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-tertiary)' }}>
                    6 cost categories
                </span>
                <UpdatedText>Updated just now</UpdatedText>
            </Footer>
        </Wrap>
    );
};
