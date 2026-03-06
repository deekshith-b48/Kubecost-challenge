'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CountUp } from '../ui/CountUp';

/* ── Styled ───────────────────────────────────────────── */
const Section = styled.section`
  padding: 100px clamp(1.5rem, 5vw, 4rem) 140px;
  background: linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-border), transparent);
  }
`;

const Inner = styled.div` max-width: 1100px; margin: 0 auto; `;

const SectionHeader = styled.div`
  text-align: center; margin-bottom: 5rem;
`;

const Eyebrow = styled.div`
  font-size: 0.68rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: var(--color-accent-primary); margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800; letter-spacing: -0.03em;
  color: var(--color-text-primary); line-height: 1.15;
  margin: 0 0 1rem 0;
`;

const SectionSub = styled.p`
  color: var(--color-text-secondary); font-size: 1rem; line-height: 1.7;
  max-width: 560px; margin: 0 auto;
`;

/* ── Bridge layout ─────────────────────────────────────── */
const Bridge = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  gap: 0;
  align-items: center;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

/* ── Team card ─────────────────────────────────────────── */
const TeamCard = styled(motion.div) <{ $side: 'left' | 'right' }>`
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  backdrop-filter: blur(16px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    ${({ $side }) => $side === 'left' ? 'left: 0; top: 0; bottom: 0; width: 2px;' : 'right: 0; top: 0; bottom: 0; width: 2px;'}
    background: ${({ $side }) => $side === 'left' ? '#10B981' : '#4285F4'};
    border-radius: 2px;
  }
`;

const TeamLabel = styled.div<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${({ $color }) => $color};
  margin-bottom: 1.5rem;
`;

const TeamRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TeamIcon = styled.div<{ $color: string }>`
  width: 52px; height: 52px;
  border-radius: 14px;
  background: ${({ $color }) => $color}18;
  border: 1px solid ${({ $color }) => $color}30;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  svg { width: 26px; height: 26px; }
`;

const TeamMeta = styled.div``;
const TeamName = styled.div`
  font-size: 1rem; font-weight: 700;
  color: var(--color-text-primary); margin-bottom: 3px;
`;
const TeamSub = styled.div`
  font-size: 0.75rem; color: var(--color-text-tertiary);
`;

/* Mini bar chart (engineering side) */
const MiniChart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 6px;
  height: 80px;
  padding: 0.75rem;
  background: rgba(16,185,129,0.05);
  border-radius: var(--radius-md);
  border: 1px solid rgba(16,185,129,0.12);
  margin-bottom: 1.25rem;
`;

const MiniBar = styled(motion.div) <{ $h: number; $color: string }>`
  flex: 1;
  height: ${({ $h }) => $h}%;
  background: ${({ $color }) => $color};
  border-radius: 3px 3px 0 0;
  max-width: 28px;
  min-width: 14px;
`;

/* Mini area chart (finance side) */
const AreaChartWrap = styled.div`
  padding: 0.75rem;
  background: rgba(66,133,244,0.05);
  border-radius: var(--radius-md);
  border: 1px solid rgba(66,133,244,0.12);
  margin-bottom: 1.25rem;
`;

/* Stat rows */
const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const StatBox = styled.div<{ $color: string }>`
  padding: 0.75rem 1rem;
  background: ${({ $color }) => $color}0D;
  border: 1px solid ${({ $color }) => $color}22;
  border-radius: var(--radius-md);
`;
const StatBoxLabel = styled.div`
  font-size: 0.62rem; text-transform: uppercase;
  letter-spacing: 0.09em; color: var(--color-text-tertiary); font-weight: 700;
  margin-bottom: 4px;
`;
const StatBoxValue = styled.div<{ $color: string }>`
  font-size: 1.1rem; font-weight: 800;
  font-family: var(--font-mono);
  color: ${({ $color }) => $color};
`;

/* Center connector */
const Connector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  position: relative;
  padding: 2rem 0;

  @media (max-width: 820px) {
    flex-direction: row;
    padding: 0 2rem;
    justify-content: center;
    gap: 1rem;
  }
`;

const ConnLine = styled.div`
  width: 1px;
  flex: 1;
  background: repeating-linear-gradient(
    180deg,
    var(--color-accent-primary) 0px,
    var(--color-accent-primary) 6px,
    transparent 6px,
    transparent 14px
  );
  min-height: 60px;

  @media (max-width: 820px) {
    width: 80px; height: 1px; min-height: unset;
    background: repeating-linear-gradient(
      90deg,
      var(--color-accent-primary) 0px,
      var(--color-accent-primary) 6px,
      transparent 6px,
      transparent 14px
    );
  }
`;

const ConnCenter = styled.div`
  width: 48px; height: 48px;
  border-radius: 50%;
  border: 2px solid var(--color-accent-primary);
  background: rgba(16,185,129,0.12);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 20px rgba(16,185,129,0.3);
  flex-shrink: 0;
  position: relative;
  z-index: 2;

  svg { width: 20px; height: 20px; color: var(--color-accent-primary); }
`;

const ConnLabel = styled.div`
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent-primary);
  text-align: center;
  max-width: 60px;
  line-height: 1.3;
`;

/* Bottom tagline */
const Tagline = styled(motion.div)`
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  background: rgba(16,185,129,0.05);
  border: 1px solid rgba(16,185,129,0.15);
  border-radius: var(--radius-xl);
`;

const TaglineText = styled.p`
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 700;
  color: var(--color-text-primary);
  font-style: italic;
  margin: 0;
`;

const TaglineSub = styled.p`
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin: 0.5rem 0 0 0;
`;

/* ── Component ─────────────────────────────────────────── */
const ENG_BARS = [65, 45, 80, 55, 70, 40, 90];
const BAR_COLORS = ['#10B981', '#10B981', '#10B981', '#059669', '#10B981', '#10B981', '#34D399'];
const SPEND_POINTS = [20, 35, 28, 48, 38, 55, 45, 65, 52, 75, 62, 80];

export const FinOpsSection: React.FC = () => {
    // Build SVG area chart path
    const w = 280; const h = 68;
    const pts = SPEND_POINTS.map((v, i) => ({
        x: (i / (SPEND_POINTS.length - 1)) * w,
        y: h - (v / 100) * h,
    }));
    const linePts = pts.map(p => `${p.x},${p.y}`).join(' L ');
    const areaPath = `M ${linePts} L ${w} ${h} L 0 ${h} Z`;
    const linePath = `M ${linePts}`;

    return (
        <Section id="finops">
            <Inner>
                <SectionHeader>
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <Eyebrow>FinOps Alignment</Eyebrow>
                        <SectionTitle>
                            Bridging Engineering<br />and Finance
                        </SectionTitle>
                        <SectionSub>
                            Kubecost creates a shared language between the teams that build
                            the infrastructure and the teams that pay for it.
                        </SectionSub>
                    </motion.div>
                </SectionHeader>

                <Bridge>
                    {/* ── ENGINEERING ── */}
                    <TeamCard
                        $side="left"
                        initial={{ opacity: 0, x: -32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <TeamLabel $color="#10B981">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                            Engineering
                        </TeamLabel>

                        <TeamRow>
                            <TeamIcon $color="#10B981">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="#10B981" strokeWidth="2" fill="none" />
                                    <path d="M8 21h8M12 17v4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M6 8l3 3 2-2 4 4" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </TeamIcon>
                            <TeamMeta>
                                <TeamName>Monthly Savings Dashboard</TeamName>
                                <TeamSub>Infrastructure optimization insights</TeamSub>
                            </TeamMeta>
                        </TeamRow>

                        {/* Mini savings bar chart */}
                        <MiniChart>
                            {ENG_BARS.map((h, i) => (
                                <MiniBar
                                    key={i}
                                    $h={h}
                                    $color={BAR_COLORS[i]}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.07, duration: 0.6 }}
                                />
                            ))}
                        </MiniChart>

                        <StatGrid>
                            <StatBox $color="#10B981">
                                <StatBoxLabel>Total Savings</StatBoxLabel>
                                <StatBoxValue $color="#10B981">
                                    $<CountUp end={613} duration={1.8} />/mo
                                </StatBoxValue>
                            </StatBox>
                            <StatBox $color="#10B981">
                                <StatBoxLabel>Opportunities</StatBoxLabel>
                                <StatBoxValue $color="#10B981">4 items</StatBoxValue>
                            </StatBox>
                            <StatBox $color="#10B981">
                                <StatBoxLabel>Cluster Eff.</StatBoxLabel>
                                <StatBoxValue $color="#10B981">67%</StatBoxValue>
                            </StatBox>
                            <StatBox $color="#10B981">
                                <StatBoxLabel>Unused Res.</StatBoxLabel>
                                <StatBoxValue $color="#10B981">31%</StatBoxValue>
                            </StatBox>
                        </StatGrid>
                    </TeamCard>

                    {/* ── CONNECTOR ── */}
                    <Connector>
                        <ConnLine />
                        <ConnCenter>
                            {/* Bidirectional arrow */}
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ConnCenter>
                        <ConnLabel>Shared visibility</ConnLabel>
                        <ConnLine />
                    </Connector>

                    {/* ── FINANCE ── */}
                    <TeamCard
                        $side="right"
                        initial={{ opacity: 0, x: 32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <TeamLabel $color="#4285F4">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path d="M12 6v2M12 16v2M8.5 9.5a3.5 1.5 0 017 0 3.5 1.5 0 01-7 0zM8 15.5c0 .83 1.79 1.5 4 1.5s4-.67 4-1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                            Finance
                        </TeamLabel>

                        <TeamRow>
                            <TeamIcon $color="#4285F4">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M2 20h20M4 20V10l8-6 8 6v10" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    <path d="M9 14v6M15 14v6M9 11h6" stroke="#4285F4" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </TeamIcon>
                            <TeamMeta>
                                <TeamName>Monthly Spending Report</TeamName>
                                <TeamSub>Budget allocation & tracking</TeamSub>
                            </TeamMeta>
                        </TeamRow>

                        {/* SVG area chart */}
                        <AreaChartWrap>
                            <svg width="100%" height="68" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4285F4" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#4285F4" stopOpacity="0.02" />
                                    </linearGradient>
                                </defs>
                                <path d={areaPath} fill="url(#area-grad)" />
                                <motion.path
                                    d={linePath}
                                    fill="none"
                                    stroke="#4285F4"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
                                />
                            </svg>
                        </AreaChartWrap>

                        <StatGrid>
                            <StatBox $color="#4285F4">
                                <StatBoxLabel>Total Spend</StatBoxLabel>
                                <StatBoxValue $color="#4285F4">
                                    $<CountUp end={16} duration={1.5} suffix=".5k" />/mo
                                </StatBoxValue>
                            </StatBox>
                            <StatBox $color="#4285F4">
                                <StatBoxLabel>vs Budget</StatBoxLabel>
                                <StatBoxValue $color="#F59E0B">+8.2%</StatBoxValue>
                            </StatBox>
                            <StatBox $color="#4285F4">
                                <StatBoxLabel>Providers</StatBoxLabel>
                                <StatBoxValue $color="#4285F4">4 clouds</StatBoxValue>
                            </StatBox>
                            <StatBox $color="#4285F4">
                                <StatBoxLabel>Forecasted</StatBoxLabel>
                                <StatBoxValue $color="#4285F4">$19.2k</StatBoxValue>
                            </StatBox>
                        </StatGrid>
                    </TeamCard>
                </Bridge>

                {/* Tagline */}
                <Tagline
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <TaglineText>
                        &ldquo;Breaking the barrier between engineering performance and financial governance.&rdquo;
                    </TaglineText>
                    <TaglineSub>
                        Kubecost aligns every technical decision with its true business impact.
                    </TaglineSub>
                </Tagline>
            </Inner>
        </Section>
    );
};
