'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CountUp } from '../ui/CountUp';

/* ── Styled ────────────────────────────────────────────── */
const Section = styled.section`
  padding: 100px clamp(1.5rem, 5vw, 4rem);
  background: var(--color-bg-primary);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% 100%, rgba(16,185,129,0.06) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4.5rem;
`;

const HeroBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 24px;
  background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05));
  border: 1px solid rgba(16,185,129,0.4);
  border-radius: var(--radius-full);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--color-accent-primary);
  text-transform: uppercase;
  box-shadow: 0 0 30px rgba(16,185,129,0.2);
  margin-bottom: 1.5rem;
`;

const SavingsPct = styled.span`
  font-size: 2.5rem;
  font-weight: 900;
  font-family: var(--font-mono);
  line-height: 1;
`;

const Eyebrow = styled.div`
  font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: var(--color-accent-primary); margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text-primary);
  line-height: 1.15;
  margin: 0 0 1rem 0;
`;

const SectionSub = styled.p`
  color: var(--color-text-secondary);
  font-size: 1rem; line-height: 1.7;
  max-width: 520px; margin: 0 auto;
`;

/* ── Two-col layout ────────────────────────────────────── */
const TwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 860px) { grid-template-columns: 1fr; }
`;

/* Left: resource usage tooltip card */
const UsageCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(16,185,129,0.3);
  border-radius: var(--radius-xl);
  padding: 2rem;
  backdrop-filter: blur(16px);
  box-shadow: 0 0 40px rgba(16,185,129,0.12);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--gradient-primary);
  }
`;

const UsageTitle = styled.div`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-tertiary);
  margin-bottom: 1.5rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

const MetricItem = styled.div`
  padding: 1rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
`;

const MetricLabel = styled.div`
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-tertiary);
  font-weight: 700;
  margin-bottom: 6px;
`;

const MetricValue = styled.div<{ $highlight?: boolean }>`
  font-size: 1.35rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: ${({ $highlight }) => $highlight ? 'var(--color-accent-primary)' : 'var(--color-text-primary)'};
  filter: ${({ $highlight }) => $highlight ? 'drop-shadow(0 0 10px rgba(16,185,129,0.5))' : 'none'};
  line-height: 1;
`;

const MetricUnit = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  font-weight: 600;
  margin-left: 3px;
`;

const UsageBarGroup = styled.div`
  display: flex; flex-direction: column; gap: 0.75rem;
  margin-top: 1.5rem;
`;

const UsageBarRow = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  align-items: center;
  gap: 0.75rem;
`;

const UsageBarLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-text-secondary);
`;

const UsageTrack = styled.div`
  height: 8px;
  background: rgba(255,255,255,0.06);
  border-radius: var(--radius-full);
  overflow: hidden;
`;

const UsageFill = styled(motion.div) <{ $color: string }>`
  height: 100%;
  background: ${({ $color }) => $color};
  border-radius: var(--radius-full);
  box-shadow: 0 0 8px ${({ $color }) => $color}66;
`;

const UsagePct = styled.div`
  font-size: 0.72rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
  text-align: right;
`;

const SavingsHighlight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.25);
  border-radius: var(--radius-md);
  margin-top: 1.5rem;
`;

const SavingsLabel = styled.div`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent-primary);
`;

const SavingsAmount = styled.div`
  font-size: 1.35rem;
  font-weight: 900;
  font-family: var(--font-mono);
  color: var(--color-accent-primary);
  filter: drop-shadow(0 0 12px rgba(16,185,129,0.5));
`;

/* Right: savings breakdown */
const BreakdownCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  backdrop-filter: blur(16px);
`;

const BreakdownTitle = styled.div`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-tertiary);
  margin-bottom: 1.5rem;
`;

const BreakdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

const BreakdownItem = styled.div``;

const BreakdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const BreakdownName = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-primary);
`;

const BreakdownAmt = styled.div`
  font-size: 0.85rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--color-accent-success);
`;

const BreakdownTrack = styled.div`
  height: 6px;
  background: rgba(255,255,255,0.05);
  border-radius: var(--radius-full);
  overflow: hidden;
`;

const BreakdownFill = styled(motion.div) <{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
`;

const TotalSavings = styled.div`
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TotalLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text-primary);
`;

const TotalValue = styled.div`
  font-size: 2rem;
  font-weight: 900;
  font-family: var(--font-mono);
  color: var(--color-accent-primary);
  filter: drop-shadow(0 0 16px rgba(16,185,129,0.4));
`;

const OptiBtn = styled(motion.button)`
  width: 100%;
  margin-top: 1.5rem;
  padding: 14px;
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--radius-md);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 24px rgba(16,185,129,0.3);
`;

/* ── Data ──────────────────────────────────────────────── */
const BREAKDOWN = [
  { label: 'Right-size cluster nodes', amount: 230, max: 613 },
  { label: 'Right-size container requests', amount: 175, max: 613 },
  { label: 'Remedy abandoned workloads', amount: 110, max: 613 },
  { label: 'Reserve instances', amount: 98, max: 613 },
];
const TOTAL_SAVINGS = 613;

const USAGE_BARS = [
  { label: 'CPU Usage', pct: 9, color: 'var(--color-cpu)', display: '63M / 700M' },
  { label: 'CPU Request', pct: 100, color: 'var(--color-border)', display: '700M' },
  { label: 'Mem Usage', pct: 11, color: 'var(--color-ram)', display: '557MiB / 5GiB' },
  { label: 'Mem Request', pct: 100, color: 'var(--color-border)', display: '5 GiB' },
];

/* ── Component ─────────────────────────────────────────── */
export const SavingsSection: React.FC = () => (
  <Section id="savings">
    <Inner>
      <SectionHeader>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <HeroBadge
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <SavingsPct>70%</SavingsPct>
            Saved on average
          </HeroBadge>
          <Eyebrow>Optimization Engine</Eyebrow>
          <SectionTitle>
            Slash cloud waste<br />with surgical precision
          </SectionTitle>
          <SectionSub>
            Our ML-driven engine analyzes actual vs. requested resources, identifying
            exactly where you&apos;re overspending — and by how much.
          </SectionSub>
        </motion.div>
      </SectionHeader>

      <TwoCols>
        {/* Left — usage card */}
        <UsageCard
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <UsageTitle>Resource Usage vs Requests — Azure Staging</UsageTitle>

          <MetricsGrid>
            <MetricItem>
              <MetricLabel>CPU Usage</MetricLabel>
              <MetricValue>63<MetricUnit>M</MetricUnit></MetricValue>
            </MetricItem>
            <MetricItem>
              <MetricLabel>CPU Request</MetricLabel>
              <MetricValue>700<MetricUnit>M</MetricUnit></MetricValue>
            </MetricItem>
            <MetricItem>
              <MetricLabel>Memory Usage</MetricLabel>
              <MetricValue>557<MetricUnit>MiB</MetricUnit></MetricValue>
            </MetricItem>
            <MetricItem>
              <MetricLabel>Memory Request</MetricLabel>
              <MetricValue>5<MetricUnit>GiB</MetricUnit></MetricValue>
            </MetricItem>
          </MetricsGrid>

          <UsageTitle style={{ marginBottom: '1rem' }}>Usage Overview</UsageTitle>
          <UsageBarGroup>
            {USAGE_BARS.map((b, i) => (
              <UsageBarRow key={b.label}>
                <UsageBarLabel>{b.label}</UsageBarLabel>
                <UsageTrack>
                  <UsageFill
                    $color={b.color}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                  />
                </UsageTrack>
                <UsagePct>{b.display}</UsagePct>
              </UsageBarRow>
            ))}
          </UsageBarGroup>

          <SavingsHighlight>
            <SavingsLabel>
              <div>Estimated Savings</div>
              <div style={{ fontSize: '0.58rem', marginTop: 2, color: 'var(--color-text-tertiary)' }}>
                from this namespace alone
              </div>
            </SavingsLabel>
            <SavingsAmount>$237.4<span style={{ fontSize: '0.8rem', fontWeight: 600 }}>/mo</span></SavingsAmount>
          </SavingsHighlight>
        </UsageCard>

        {/* Right — breakdown */}
        <BreakdownCard
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <BreakdownTitle>Monthly Savings Breakdown</BreakdownTitle>

          <BreakdownList>
            {BREAKDOWN.map(({ label, amount, max }, i) => (
              <BreakdownItem key={label}>
                <BreakdownHeader>
                  <BreakdownName>{label}</BreakdownName>
                  <BreakdownAmt>
                    $<CountUp end={amount} duration={1.8} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>/mo</span>
                  </BreakdownAmt>
                </BreakdownHeader>
                <BreakdownTrack>
                  <BreakdownFill
                    $pct={(amount / max) * 100}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(amount / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                  />
                </BreakdownTrack>
              </BreakdownItem>
            ))}
          </BreakdownList>

          <TotalSavings>
            <div>
              <TotalLabel>Total Potential Savings</TotalLabel>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)', marginTop: 3 }}>
                Per month, across all providers
              </div>
            </div>
            <TotalValue>
              $<CountUp end={TOTAL_SAVINGS} duration={2} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>/mo</span>
            </TotalValue>
          </TotalSavings>

          <OptiBtn
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Optimizing →
          </OptiBtn>
        </BreakdownCard>
      </TwoCols>
    </Inner>
  </Section>
);
