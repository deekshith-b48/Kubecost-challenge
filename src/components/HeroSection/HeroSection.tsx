'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

/* ── animated network background ───────────────────────── */
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
`;

const NODES = [
    { cx: 8, cy: 18 }, { cx: 22, cy: 38 }, { cx: 12, cy: 60 },
    { cx: 38, cy: 12 }, { cx: 52, cy: 32 }, { cx: 44, cy: 58 },
    { cx: 68, cy: 20 }, { cx: 82, cy: 42 }, { cx: 74, cy: 68 },
    { cx: 28, cy: 78 }, { cx: 58, cy: 80 }, { cx: 90, cy: 72 },
];
const EDGES = [
    [0, 1], [1, 2], [1, 4], [3, 4], [4, 5], [4, 7], [6, 7],
    [7, 8], [7, 11], [2, 9], [5, 10], [10, 11], [3, 6], [9, 10],
];

const NodeNetworkSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  opacity: 0.18;
`;

const NodeDot = styled.circle`
  animation: ${float} 4s ease-in-out infinite;
`;

/* ── section shell ─────────────────────────────────────── */
const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 120px clamp(1.5rem, 5vw, 4rem) 80px;
  background: radial-gradient(
    ellipse 80% 60% at 50% -10%,
    rgba(16,185,129,0.1) 0%,
    transparent 60%
  ),
  var(--color-bg-primary);
`;

/* ── badge ─────────────────────────────────────────────── */
const Badge = styled(motion.div)`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.3);
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-accent-primary);
  margin-bottom: 1.5rem;
`;

const PulsingDot = styled.span`
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--color-accent-primary);
  display: block;
  animation: pulse-dot 2s ease infinite;

  @keyframes pulse-dot {
    0%,100% { opacity:1; box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
    50% { opacity:0.4; box-shadow: 0 0 0 5px rgba(16,185,129,0); }
  }
`;

/* ── headline ──────────────────────────────────────────── */
const Headline = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  text-align: center;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--color-text-primary);
  max-width: 820px;
  margin: 0 auto 1.5rem;
`;

const Green = styled.span`
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Sub = styled(motion.p)`
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  color: var(--color-text-secondary);
  max-width: 560px;
  text-align: center;
  line-height: 1.75;
  margin: 0 auto 3rem;
`;

/* ── CTA ───────────────────────────────────────────────── */
const CTARow = styled(motion.div)`
  display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
  margin-bottom: 5rem;
`;

const PrimaryBtn = styled.a`
  padding: 14px 32px;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  color: #fff; font-weight: 700; font-size: 0.95rem;
  text-decoration: none;
  box-shadow: 0 0 24px rgba(16,185,129,0.35);
  transition: all 0.25s ease;
  cursor: pointer;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 36px rgba(16,185,129,0.5);
  }
`;

const SecondaryBtn = styled.a`
  padding: 14px 32px;
  border-radius: var(--radius-full);
  color: var(--color-text-primary); font-weight: 700; font-size: 0.95rem;
  text-decoration: none;
  border: 1px solid var(--color-border-hover);
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255,255,255,0.08);
    border-color: var(--color-accent-primary);
  }
`;

/* ── 3 pillars ─────────────────────────────────────────── */
const PillarsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  max-width: 900px;
  width: 100%;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const PillarCard = styled(motion.div) <{ $color: string }>`
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(12px);

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${({ $color }) => $color};
    border-radius: 2px;
  }

  &:hover {
    border-color: ${({ $color }) => $color}66;
    box-shadow: 0 0 30px ${({ $color }) => $color}22;
  }
`;

const PillarIcon = styled.div<{ $bg: string }>`
  width: 56px; height: 56px;
  border-radius: 14px;
  background: ${({ $bg }) => $bg};
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1rem;

  svg { width: 26px; height: 26px; }
`;

const PillarTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
`;

const PillarDesc = styled.div`
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
`;

/* ── scroll indicator ──────────────────────────────────── */
const ScrollHint = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
`;

const ScrollBar = styled(motion.div)`
  width: 1px;
  height: 36px;
  background: linear-gradient(180deg, var(--color-accent-primary) 0%, transparent 100%);
`;

/* ── Component ─────────────────────────────────────────── */
const PILLARS = [
    {
        title: 'Cost Monitoring',
        desc: 'Real-time cost visibility across every cluster, namespace, and pod.',
        color: '#10B981',
        bg: 'rgba(16,185,129,0.12)',
        icon: (
            <svg viewBox="0 0 24 24" fill="none">
                {/* Bar chart + magnifying glass */}
                <rect x="3" y="12" width="3" height="9" rx="1" fill="currentColor" opacity="0.4" />
                <rect x="8" y="7" width="3" height="14" rx="1" fill="currentColor" opacity="0.6" />
                <rect x="13" y="4" width="3" height="17" rx="1" fill="currentColor" />
                <circle cx="20" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <line x1="22.1" y1="8.1" x2="24" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'Optimization Insights',
        desc: 'Cut waste by up to 70% with AI-driven right-sizing recommendations.',
        color: '#F59E0B',
        bg: 'rgba(245,158,11,0.12)',
        icon: (
            <svg viewBox="0 0 24 24" fill="none">
                {/* Lightbulb */}
                <path d="M9 21h6M12 3C8.69 3 6 5.69 6 9c0 2.12 1.1 3.99 2.74 5.08L9 18h6l.26-3.92C16.9 12.99 18 11.12 18 9c0-3.31-2.69-6-6-6z"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M9 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'Smart Alerts',
        desc: 'Get notified when costs spike or budgets approach thresholds.',
        color: '#8B5CF6',
        bg: 'rgba(139,92,246,0.12)',
        icon: (
            <svg viewBox="0 0 24 24" fill="none">
                {/* Bell */}
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="18" cy="5" r="3" fill="#EF4444" />
            </svg>
        ),
    },
];

export const HeroSection: React.FC = () => (
    <Section id="hero">
        {/* Animated node-network SVG background */}
        <NodeNetworkSvg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            {EDGES.map(([a, b], i) => (
                <line
                    key={i}
                    x1={NODES[a].cx} y1={NODES[a].cy}
                    x2={NODES[b].cx} y2={NODES[b].cy}
                    stroke="#10B981" strokeWidth="0.3" strokeDasharray="1 2"
                />
            ))}
            {NODES.map((n, i) => (
                <NodeDot
                    key={i} cx={n.cx} cy={n.cy} r="1.2"
                    fill="#10B981"
                    style={{ animationDelay: `${i * 0.35}s`, animationDuration: `${3.5 + (i % 3) * 0.8}s` }}
                />
            ))}
        </NodeNetworkSvg>

        {/* Badge */}
        <Badge initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <PulsingDot />
            Kubernetes Cost Intelligence Platform
        </Badge>

        {/* Headline */}
        <Headline initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.65 }}>
            Full visibility into your{' '}
            <Green>Kubernetes & cloud costs</Green>
        </Headline>

        {/* Subtitle */}
        <Sub initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.6 }}>
            Monitor, optimize, and govern cloud spend across every cluster, namespace,
            and pod — with real-time insights that save up to 70% of your bill.
        </Sub>

        {/* CTA */}
        <CTARow initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.55 }}>
            <PrimaryBtn href="#granular">Explore Visibility →</PrimaryBtn>
            <SecondaryBtn href="#savings">See Savings</SecondaryBtn>
        </CTARow>

        {/* 3 pillar cards */}
        <PillarsGrid
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.65, staggerChildren: 0.1 }}
        >
            {PILLARS.map((p, i) => (
                <PillarCard
                    key={p.title}
                    $color={p.color}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 + i * 0.12, duration: 0.55 }}
                    whileHover={{ y: -4 }}
                >
                    <PillarIcon $bg={p.bg} style={{ color: p.color }}>
                        {p.icon}
                    </PillarIcon>
                    <PillarTitle>{p.title}</PillarTitle>
                    <PillarDesc>{p.desc}</PillarDesc>
                </PillarCard>
            ))}
        </PillarsGrid>

        {/* Scroll indicator */}
        <ScrollHint
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
        >
            <ScrollBar
                animate={{ scaleY: [0, 1, 0], y: [0, 10, 20] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            Scroll to explore
        </ScrollHint>
    </Section>
);
