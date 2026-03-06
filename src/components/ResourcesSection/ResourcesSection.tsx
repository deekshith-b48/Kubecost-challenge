'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ── Styled ────────────────────────────────────────────── */
const Section = styled.section`
  padding: 100px clamp(1.5rem, 5vw, 4rem);
  background: linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
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

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Eyebrow = styled.div`
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-accent-primary);
  margin-bottom: 0.75rem;
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
  font-size: 1rem;
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Card = styled(motion.div) <{ $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1.5rem;
  background: ${({ $color }) => $color}12;
  border: 1px solid ${({ $color }) => $color}30;
  border-radius: 20px;
  width: 160px;
  cursor: default;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${({ $color }) => $color};
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    border-color: ${({ $color }) => $color}55;
    box-shadow: 0 0 30px ${({ $color }) => $color}22;
    &::before { opacity: 1; }
  }

  @media (max-width: 560px) { width: 140px; }
`;

const IconBox = styled.div<{ $color: string }>`
  width: 72px; height: 72px;
  border-radius: 18px;
  background: ${({ $color }) => $color}22;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ $color }) => $color}33;

  svg { width: 34px; height: 34px; }
`;

const Label = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
`;

const Desc = styled.div`
  font-size: 0.72rem;
  color: var(--color-text-tertiary);
  text-align: center;
  line-height: 1.5;
`;

/* ── SVG Icons ─────────────────────────────────────────── */
const CPUIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 40" fill="none">
    <rect x="10" y="10" width="20" height="20" rx="3" stroke={color} strokeWidth="2" fill="none" />
    <rect x="14" y="14" width="12" height="12" rx="1.5" fill={color} opacity="0.35" />
    {/* Pins */}
    {[14, 18, 22, 26].map(x => <line key={x} x1={x} y1="8" x2={x} y2="10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />)}
    {[14, 18, 22, 26].map(x => <line key={x} x1={x} y1="30" x2={x} y2="32" stroke={color} strokeWidth="1.8" strokeLinecap="round" />)}
    {[14, 18, 22, 26].map(y => <line key={y} x1="8" y1={y} x2="10" y2={y} stroke={color} strokeWidth="1.8" strokeLinecap="round" />)}
    {[14, 18, 22, 26].map(y => <line key={y} x1="30" y1={y} x2="32" y2={y} stroke={color} strokeWidth="1.8" strokeLinecap="round" />)}
  </svg>
);

const GPUIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 40" fill="none">
    <rect x="6" y="12" width="28" height="18" rx="3" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="15" cy="21" r="5" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="25" cy="21" r="5" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="15" cy="21" r="2" fill={color} opacity="0.4" />
    <circle cx="25" cy="21" r="2" fill={color} opacity="0.4" />
    {/* Fan blades */}
    <line x1="6" y1="30" x2="6" y2="34" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="34" y1="30" x2="34" y2="34" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <line x1="12" y1="30" x2="12" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="28" y1="30" x2="28" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const RAMIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 40" fill="none">
    <rect x="4" y="13" width="32" height="14" rx="3" stroke={color} strokeWidth="2" fill="none" />
    {/* Memory slots */}
    {[9, 14, 19, 24].map(x => (
      <rect key={x} x={x} y="16" width="3.5" height="8" rx="0.8" stroke={color} strokeWidth="1.5" fill="none" />
    ))}
    {/* Legs */}
    {[10, 14, 18, 22, 26, 30].map(x => (
      <line key={x} x1={x} y1="27" x2={x} y2="31" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    ))}
    <rect x="30" y="16" width="3" height="8" rx="0.8" fill={color} opacity="0.4" />
  </svg>
);

const StorageIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 40" fill="none">
    <rect x="6" y="7" width="28" height="8" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
    <rect x="6" y="16" width="28" height="8" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
    <rect x="6" y="25" width="28" height="8" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="30" cy="11" r="2" fill={color} opacity="0.5" />
    <circle cx="30" cy="20" r="2" fill={color} />
    <circle cx="30" cy="29" r="2" fill={color} />
    <line x1="10" y1="11" x2="22" y2="11" stroke={color} strokeWidth="1.5" opacity="0.4" />
    <line x1="10" y1="20" x2="22" y2="20" stroke={color} strokeWidth="1.5" opacity="0.4" />
    <line x1="10" y1="29" x2="22" y2="29" stroke={color} strokeWidth="1.5" opacity="0.4" />
  </svg>
);

const NetworkIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="4" fill={color} />
    <circle cx="8" cy="12" r="3" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="32" cy="12" r="3" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="8" cy="28" r="3" stroke={color} strokeWidth="1.8" fill="none" />
    <circle cx="32" cy="28" r="3" stroke={color} strokeWidth="1.8" fill="none" />
    <line x1="11" y1="13.5" x2="17" y2="17.5" stroke={color} strokeWidth="1.5" />
    <line x1="29" y1="13.5" x2="23" y2="17.5" stroke={color} strokeWidth="1.5" />
    <line x1="11" y1="26.5" x2="17" y2="22.5" stroke={color} strokeWidth="1.5" />
    <line x1="29" y1="26.5" x2="23" y2="22.5" stroke={color} strokeWidth="1.5" />
  </svg>
);

/* ── Data ──────────────────────────────────────────────── */
const RESOURCES = [
  { label: 'CPU', desc: 'Compute cores usage & costs', color: 'var(--color-cpu)', Icon: CPUIcon },
  { label: 'GPU', desc: 'Accelerator workloads & spend', color: 'var(--color-gpu)', Icon: GPUIcon },
  { label: 'RAM', desc: 'Memory allocations & requests', color: 'var(--color-ram)', Icon: RAMIcon },
  { label: 'Storage', desc: 'Persistent volume spend', color: 'var(--color-storage)', Icon: StorageIcon },
  { label: 'Network', desc: 'Egress & ingress transfer costs', color: 'var(--color-network)', Icon: NetworkIcon },
];

/* ── Component ─────────────────────────────────────────── */
export const ResourcesSection: React.FC = () => (
  <Section id="resources">
    <Inner>
      <SectionHeader>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Eyebrow>Infrastructure Resources</Eyebrow>
          <SectionTitle>
            Every resource tracked,<br />accounted for
          </SectionTitle>
          <SectionSub>
            Kubecost breaks your cloud bill down by every infrastructure component —
            so you know exactly where every dollar goes.
          </SectionSub>
        </motion.div>
      </SectionHeader>

      <Grid>
        {RESOURCES.map(({ label, desc, color, Icon }, i) => (
          <Card
            key={label}
            $color={color}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.03 }}
          >
            <IconBox $color={color}>
              <Icon color={color} />
            </IconBox>
            <Label>{label}</Label>
            <Desc>{desc}</Desc>
          </Card>
        ))}
      </Grid>
    </Inner>
  </Section>
);
