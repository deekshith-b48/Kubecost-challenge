'use client';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useCloudProviders, useCostMetrics } from '@/hooks/useCostData';
import { CloudProviderData } from '@/lib/api';
import { ProviderCard } from '../ProviderCard';
import { ConnectionLines } from '../ConnectionLines';
import { CostDashboard } from '../CostDashboard';
import { OptimizationTooltip } from '../OptimizationTooltip';

/* ─────────────────────────────────────────────────────────
   Layout:

   Desktop (≥ 960px) — a 3-column CSS grid:
     [card]  [gap+SVG]  [center-dash]  [gap+SVG]  [card]
   with two card rows stacked on each side column.

   We use grid-column / grid-row to place things exactly,
   then measure real DOM positions for the SVG overlay.
   ───────────────────────────────────────────────────────── */

const Section = styled.section`
  background: var(--color-bg-primary);
  padding: 100px clamp(1rem, 3vw, 2.5rem) 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -15%;
    left: 50%;
    transform: translateX(-50%);
    width: 90vw; height: 90vw;
    max-width: 1100px;
    background: radial-gradient(ellipse,
      rgba(16,185,129,0.07) 0%,
      rgba(66,133,244,0.04) 35%,
      transparent 65%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Header = styled.div`
  text-align: center;
  max-width: 680px;
  margin-bottom: 3rem;
  position: relative;
  z-index: 10;
`;

const Eyebrow = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: var(--color-accent-primary-light);
  border: 1px solid rgba(16,185,129,0.3);
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-accent-primary);
  margin-bottom: var(--space-lg);

  &::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--color-accent-primary);
    animation: ey-pulse 2s ease infinite;
  }
  @keyframes ey-pulse { 0%,100%{ opacity:1; } 50%{ opacity:0.3; } }
`;

const STitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin: 0 0 var(--space-lg) 0;
`;

const Accent = styled.span`
  background: linear-gradient(135deg, #10B981, #4285F4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
  max-width: 480px;
  margin: 0 auto;
`;

/* ── Arena: relative container for SVG overlay + grid ─────────────── */
const Arena = styled.div`
  position: relative;
  width: 100%;
  max-width: 1160px;
  margin: 0 auto 3rem;
  z-index: 10;
`;

/*
 * Grid layout:
 * On desktop: 3 columns — [cards-left] [center] [cards-right]
 * Each side column is a mini 1-col grid with 2 card rows and a gap.
 */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem 3rem;
  align-items: center;
  justify-items: stretch;

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 1rem;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

/* The center column spans both rows */
const CenterCol = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 960px) {
    grid-column: 1 / span 2;
    grid-row: auto;
    order: -1;
  }

  @media (max-width: 560px) {
    grid-column: 1;
  }
`;

/* Left side: slot 0 = row1, slot 2 = row2 */
const CardCell = styled.div<{ $slot: 0 | 1 | 2 | 3 }>`
  ${({ $slot }) => {
    if ($slot === 0) return 'grid-column: 1; grid-row: 1;';
    if ($slot === 1) return 'grid-column: 3; grid-row: 1;';
    if ($slot === 2) return 'grid-column: 1; grid-row: 2;';
    if ($slot === 3) return 'grid-column: 3; grid-row: 2;';
  }}

  @media (max-width: 960px) {
    grid-column: unset !important;
    grid-row: unset !important;
  }
`;

/* Footer stats */
const StatsBar = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  max-width: 760px;
  width: 100%;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(16px);
  overflow: hidden;
  position: relative;
  z-index: 10;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const StatItem = styled.div<{ $c: string }>`
  display: flex; flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  gap: 5px;
  &:not(:last-child) { border-right: 1px solid var(--color-border); }
`;
const StatLbl = styled.div`
  font-size: 0.62rem; text-transform: uppercase;
  letter-spacing: 0.12em; color: var(--color-text-tertiary); font-weight: 700;
`;
const StatVal = styled.div<{ $c: string }>`
  font-size: 1.8rem; font-weight: 800;
  font-family: var(--font-mono);
  color: ${({ $c }) => $c};
  filter: drop-shadow(0 0 10px ${({ $c }) => $c}66);
  line-height: 1;
`;

/* Loading */
const LoadWrap = styled.div`
  display: flex; flex-direction: column; align-items: center;
  gap: 1.5rem; min-height: 60vh; justify-content: center; z-index: 10;
`;
const Spin = styled.div`
  width: 56px; height: 56px; border-radius: 50%;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent-primary);
  animation: sp 0.85s linear infinite;
  box-shadow: 0 0 24px rgba(16,185,129,0.3);
  @keyframes sp { to { transform: rotate(360deg); } }
`;

/* ─── Component ──────────────────────────────────────────────────────── */
export const MultiCloudSection: React.FC = () => {
  const { data: providers, isLoading: pLoading } = useCloudProviders();
  const { data: metrics, isLoading: mLoading } = useCostMetrics();

  const arenaRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cardRef0 = useRef<HTMLDivElement>(null);
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  const cardRefs = useMemo(() => [cardRef0, cardRef1, cardRef2, cardRef3], []);

  const [connectedCount, setConnectedCount] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<CloudProviderData | null>(null);

  // Start connection animation as soon as data is available
  // (not gated on useInView which can misbehave in SSR/static environments)
  useEffect(() => {
    if (!providers || connectedCount > 0) return;
    let i = 0;
    const tick = () => {
      i += 1;
      setConnectedCount(i);
      if (i < providers.length) setTimeout(tick, 380);
    };
    // Small delay so the layout has painted and ResizeObserver has measured
    const timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providers]);

  if (pLoading || mLoading) return (
    <Section id="cloud">
      <LoadWrap>
        <Spin />
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
          Connecting to cloud regions…
        </p>
      </LoadWrap>
    </Section>
  );

  if (!providers || !metrics) return null;

  const total = providers.reduce((s, p) => s + p.monthlyCost, 0);
  const avgEff = Math.round(providers.reduce((s, p) => s + p.efficiency, 0) / providers.length);
  const allConnected = connectedCount >= providers.length;

  return (
    <Section id="cloud">
      <Header>
        <Eyebrow initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Multi-Cloud Cost Management
        </Eyebrow>
        <STitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.6 }}>
          Unified visibility across <Accent>all your cloud</Accent>
        </STitle>
        <Subtitle initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
          Costs flow in real-time from every provider into one global dashboard.
        </Subtitle>
      </Header>

      {/* Arena: relative wrapper so SVG can overlay the grid */}
      <Arena ref={arenaRef}>
        {/* SVG connection lines — absolutely fills the arena */}
        <ConnectionLines
          providers={providers}
          connectedCount={connectedCount}
          cardRefs={cardRefs}
          centerRef={centerRef}
          arenaRef={arenaRef}
        />

        <Grid>
          {/* 4 provider cards */}
          {(providers as CloudProviderData[]).map((p, i) => (
            <CardCell key={p.id} $slot={i as 0 | 1 | 2 | 3} style={{ zIndex: 5, position: 'relative' }}>
              <ProviderCard
                ref={cardRefs[i]}
                data={p}
                index={i}
                isSelected={selectedProvider?.id === p.id}
                isConnected={i < connectedCount}
                onClick={() => setSelectedProvider(p)}
              />
            </CardCell>
          ))}

          {/* Central dashboard */}
          <CenterCol style={{ zIndex: 10, position: 'relative' }}>
            <div ref={centerRef} style={{ width: '100%' }}>
              <CostDashboard metrics={metrics} isActive={allConnected} />
            </div>
          </CenterCol>
        </Grid>
      </Arena>

      {/* Stats footer */}
      <StatsBar
        initial={{ opacity: 0, y: 28 }}
        animate={allConnected ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.55 }}
      >
        {[
          { label: 'Total Monthly Spend', val: `$${(total / 1000).toFixed(1)}k`, c: '#10B981' },
          { label: 'Avg Efficiency', val: `${avgEff}%`, c: '#4285F4' },
          { label: 'Cloud Providers', val: `${providers.length}`, c: '#FF9900' },
        ].map(s => (
          <StatItem key={s.label} $c={s.c}>
            <StatLbl>{s.label}</StatLbl>
            <StatVal $c={s.c}>{s.val}</StatVal>
          </StatItem>
        ))}
      </StatsBar>

      <OptimizationTooltip
        provider={selectedProvider}
        isOpen={!!selectedProvider}
        onClose={() => setSelectedProvider(null)}
      />
    </Section>
  );
};
