'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Data ──────────────────────────────────────────────── */
type Level = 'cluster' | 'namespace' | 'pod';

const CLUSTERS = [
    { id: 'A', name: 'Cluster A', cpu: 2450, ram: 1890, storage: 340, network: 210, gpu: 890, efficiency: 72 },
    { id: 'B', name: 'Cluster B', cpu: 1870, ram: 1320, storage: 280, network: 165, gpu: 595, efficiency: 68 },
    { id: 'C', name: 'Cluster C', cpu: 1580, ram: 1110, storage: 210, network: 130, gpu: 860, efficiency: 81 },
    { id: 'D', name: 'Cluster D', cpu: 780, ram: 590, storage: 120, network: 75, gpu: 385, efficiency: 45 },
];

const NAMESPACES: Record<string, Array<{ id: string; name: string; cpu: number; ram: number; storage: number; network: number; gpu: number; efficiency: number }>> = {
    A: [
        { id: 'ns-a1', name: 'Namespace A', cpu: 1228, ram: 682, storage: 123, network: 153, gpu: 410, efficiency: 5 },
        { id: 'ns-a2', name: 'Namespace B', cpu: 735, ram: 408, storage: 73, network: 91, gpu: 246, efficiency: 20 },
        { id: 'ns-a3', name: 'Namespace C', cpu: 367, ram: 204, storage: 36, network: 46, gpu: 123, efficiency: 50 },
        { id: 'ns-a4', name: 'Namespace D', cpu: 122, ram: 68, storage: 12, network: 15, gpu: 41, efficiency: 40 },
    ],
    B: [
        { id: 'ns-b1', name: 'Namespace A', cpu: 980, ram: 620, storage: 110, network: 98, gpu: 340, efficiency: 35 },
        { id: 'ns-b2', name: 'Namespace B', cpu: 520, ram: 380, storage: 80, network: 45, gpu: 175, efficiency: 60 },
        { id: 'ns-b3', name: 'Namespace C', cpu: 370, ram: 220, storage: 55, network: 22, gpu: 80, efficiency: 72 },
    ],
    C: [
        { id: 'ns-c1', name: 'Namespace A', cpu: 1050, ram: 680, storage: 95, network: 75, gpu: 420, efficiency: 78 },
        { id: 'ns-c2', name: 'Namespace B', cpu: 530, ram: 280, storage: 68, network: 30, gpu: 280, efficiency: 88 },
    ],
    D: [
        { id: 'ns-d1', name: 'Namespace A', cpu: 450, ram: 310, storage: 62, network: 38, gpu: 215, efficiency: 42 },
        { id: 'ns-d2', name: 'Namespace B', cpu: 330, ram: 195, storage: 43, network: 20, gpu: 130, efficiency: 48 },
    ],
};

const PODS: Record<string, Array<{ id: string; name: string; cpu: number; ram: number; storage: number; network: number; gpu: number; efficiency: number }>> = {
    'ns-a1': [
        { id: 'p1', name: 'Pod A', cpu: 1228, ram: 682, storage: 123, network: 153, gpu: 410, efficiency: 5 },
        { id: 'p2', name: 'Pod B', cpu: 735, ram: 408, storage: 73, network: 91, gpu: 246, efficiency: 20 },
        { id: 'p3', name: 'Pod C', cpu: 367, ram: 204, storage: 36, network: 46, gpu: 123, efficiency: 50 },
        { id: 'p4', name: 'Pod D', cpu: 122, ram: 68, storage: 12, network: 15, gpu: 41, efficiency: 40 },
    ],
    'ns-a2': [
        { id: 'p5', name: 'Pod A', cpu: 430, ram: 240, storage: 42, network: 55, gpu: 145, efficiency: 30 },
        { id: 'p6', name: 'Pod B', cpu: 305, ram: 168, storage: 31, network: 36, gpu: 101, efficiency: 55 },
    ],
};

/* ── Styled ────────────────────────────────────────────── */
const Section = styled.section`
  padding: 100px clamp(1.5rem, 5vw, 4rem);
  background: var(--color-bg-primary);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--color-border), transparent);
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto 4rem;
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
`;

/* Breadcrumb */
const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const BreadcrumbItem = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  transition: all 0.2s;
  color: ${({ $active }) => $active ? '#fff' : 'var(--color-text-secondary)'};
  background: ${({ $active }) => $active ? 'var(--color-accent-primary)' : 'transparent'};

  &:hover:not([disabled]) {
    background: ${({ $active }) => $active ? 'var(--color-accent-primary-hover)' : 'rgba(255,255,255,0.07)'};
    color: var(--color-text-primary);
  }
`;

const Chevron = styled.span`
  color: var(--color-text-tertiary);
  font-size: 0.75rem;
`;

/* Level tabs */
const LevelTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  padding: 7px 18px;
  border-radius: var(--radius-md);
  border: 1px solid ${({ $active }) => $active ? 'var(--color-accent-primary)' : 'var(--color-border)'};
  background: ${({ $active }) => $active ? 'var(--color-accent-primary-light)' : 'transparent'};
  color: ${({ $active }) => $active ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)'};
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-accent-primary);
    color: var(--color-accent-primary);
  }
`;

/* Table card */
const TableCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  backdrop-filter: blur(12px);
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  gap: 1rem;
  flex-wrap: wrap;
`;

const TableTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AggBadge = styled.span`
  padding: 3px 10px;
  background: var(--color-accent-primary-light);
  border: 1px solid rgba(16,185,129,0.25);
  border-radius: var(--radius-full);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-accent-primary);
  letter-spacing: 0.05em;
`;

const PeriodBadge = styled.span`
  padding: 5px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-text-secondary);
`;

const Table = styled.div`
  overflow-x: auto;
`;

const TableEl = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`;

const Th = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: right;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--color-text-tertiary);
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;

  &:first-child { text-align: left; }
`;

const Tr = styled(motion.tr)`
  border-bottom: 1px solid rgba(255,255,255,0.04);
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: rgba(16,185,129,0.05); }
  &:last-child { border-bottom: none; }
`;

const Td = styled.td<{ $dimmed?: boolean; $total?: boolean; $eff?: boolean }>`
  padding: 1rem 1.5rem;
  text-align: right;
  font-size: 0.85rem;
  font-family: var(--font-mono);
  font-weight: ${({ $total }) => $total ? 800 : 500};
  color: ${({ $total, $dimmed, $eff }) =>
        $total ? 'var(--color-accent-primary)' :
            $eff ? '#F59E0B' :
                $dimmed ? 'var(--color-text-tertiary)' :
                    'var(--color-text-secondary)'};
  white-space: nowrap;

  &:first-child {
    text-align: left;
    font-family: var(--font-sans);
    font-weight: 600;
    color: var(--color-text-primary);
  }
`;

const EffCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const EffBar = styled.div<{ $pct: number }>`
  width: 48px; height: 5px;
  background: rgba(255,255,255,0.08);
  border-radius: 3px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ $pct }) => $pct}%;
    background: ${({ $pct }) => $pct < 30 ? '#EF4444' : $pct < 60 ? '#F59E0B' : '#10B981'};
    border-radius: 3px;
  }
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ClickArrow = styled.span`
  font-size: 0.6rem;
  opacity: 0;
  color: var(--color-accent-primary);
  transition: opacity 0.2s;
  
  tr:hover & { opacity: 1; }
`;

/* ── Helpers ────────────────────────────────────────────── */
const fmt = (n: number) => `$${n.toLocaleString()}`;
const total = (r: { cpu: number; ram: number; storage: number; network: number; gpu: number }) =>
    r.cpu + r.ram + r.storage + r.network + r.gpu;

/* ── Component ─────────────────────────────────────────── */
export const GranularSection: React.FC = () => {
    const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
    const [selectedNS, setSelectedNS] = useState<string | null>(null);

    const level: Level =
        selectedNS ? 'pod' :
            selectedCluster ? 'namespace' : 'cluster';

    const rows =
        level === 'cluster' ? CLUSTERS :
            level === 'namespace' ? (NAMESPACES[selectedCluster!] ?? []) :
                (PODS[selectedNS!] ?? []);

    const breadcrumbCluster = CLUSTERS.find(c => c.id === selectedCluster);
    const breadcrumbNS = selectedNS
        ? NAMESPACES[selectedCluster!]?.find(n => n.id === selectedNS)
        : null;

    const aggBy =
        level === 'cluster' ? 'Cluster' :
            level === 'namespace' ? 'Namespace' : 'Pod';

    const title =
        level === 'cluster' ? 'All Clusters' :
            level === 'namespace' ? `Cluster ${selectedCluster} — Namespaces` :
                `${breadcrumbNS?.name ?? ''} — Pods`;

    const handleRowClick = (rowId: string) => {
        if (level === 'cluster') {
            setSelectedCluster(rowId);
        } else if (level === 'namespace') {
            setSelectedNS(rowId);
        }
    };

    const jumpToCluster = () => { setSelectedCluster(null); setSelectedNS(null); };
    const jumpToNS = () => { setSelectedNS(null); };

    return (
        <Section id="granular">
            <SectionHeader>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Eyebrow>Granular Visibility</Eyebrow>
                    <SectionTitle>
                        Drill down from cluster<br />to individual pod
                    </SectionTitle>
                    <SectionSub>
                        Click any row to navigate deeper — from clusters, through namespaces,
                        all the way to individual container costs.
                    </SectionSub>
                </motion.div>
            </SectionHeader>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
            >
                {/* Breadcrumb */}
                <Breadcrumb>
                    <BreadcrumbItem $active={level === 'cluster'} onClick={jumpToCluster}>
                        All Clusters
                    </BreadcrumbItem>
                    {selectedCluster && (
                        <>
                            <Chevron>›</Chevron>
                            <BreadcrumbItem
                                $active={level === 'namespace'}
                                onClick={jumpToNS}
                            >
                                Cluster {selectedCluster}
                            </BreadcrumbItem>
                        </>
                    )}
                    {selectedNS && (
                        <>
                            <Chevron>›</Chevron>
                            <BreadcrumbItem $active onClick={() => { }}>
                                {breadcrumbNS?.name}
                            </BreadcrumbItem>
                        </>
                    )}
                </Breadcrumb>

                {/* Level tabs */}
                <LevelTabs>
                    {['cluster', 'namespace', 'pod'].map((lvl) => (
                        <TabBtn key={lvl} $active={level === lvl}>
                            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                        </TabBtn>
                    ))}
                </LevelTabs>

                {/* Table card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={level + selectedCluster + selectedNS}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                    >
                        <TableCard>
                            <TableHeader>
                                <TableTitle>
                                    {title}
                                    <AggBadge>Aggregated by: {aggBy}</AggBadge>
                                </TableTitle>
                                <PeriodBadge>Last 30 Days</PeriodBadge>
                            </TableHeader>

                            <Table>
                                <TableEl>
                                    <thead>
                                        <tr>
                                            <Th>{aggBy}</Th>
                                            <Th>CPU</Th>
                                            <Th>RAM</Th>
                                            <Th>Storage</Th>
                                            <Th>Network</Th>
                                            <Th>GPU</Th>
                                            <Th>Efficiency</Th>
                                            <Th>Total</Th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, i) => {
                                            const t = total(row);
                                            const clickable = level !== 'pod';
                                            return (
                                                <Tr
                                                    key={row.id}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.06 }}
                                                    onClick={() => clickable && handleRowClick(row.id)}
                                                    style={{ cursor: clickable ? 'pointer' : 'default' }}
                                                >
                                                    <Td>
                                                        <NameCell>
                                                            {row.name}
                                                            {clickable && <ClickArrow>→</ClickArrow>}
                                                        </NameCell>
                                                    </Td>
                                                    <Td>{fmt(row.cpu)}</Td>
                                                    <Td $dimmed>{fmt(row.ram)}</Td>
                                                    <Td $dimmed>{fmt(row.storage)}</Td>
                                                    <Td $dimmed>{fmt(row.network)}</Td>
                                                    <Td $dimmed>{fmt(row.gpu)}</Td>
                                                    <Td $eff>
                                                        <EffCell>
                                                            <EffBar $pct={row.efficiency} />
                                                            {row.efficiency}%
                                                        </EffCell>
                                                    </Td>
                                                    <Td $total>{fmt(t)}</Td>
                                                </Tr>
                                            );
                                        })}
                                    </tbody>
                                </TableEl>
                            </Table>
                        </TableCard>
                    </motion.div>
                </AnimatePresence>

                {level !== 'cluster' && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            marginTop: '1rem',
                            fontSize: '0.78rem',
                            color: 'var(--color-text-tertiary)',
                            textAlign: 'center',
                        }}
                    >
                        {level === 'pod' ? '↑ All pods for this namespace' : `Click a row to drill into ${level === 'namespace' ? 'namespaces' : 'pods'}`}
                    </motion.p>
                )}
            </motion.div>
        </Section>
    );
};
