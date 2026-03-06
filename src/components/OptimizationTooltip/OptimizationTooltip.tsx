'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { CloudProviderData, ProviderType } from '@/lib/api';

/* ─── Styled ──────────────────────────────────────────────────────── */
const PROVIDER_COLOR: Record<ProviderType, string> = {
    aws: 'var(--color-aws)',
    azure: 'var(--color-azure)',
    'google-cloud': 'var(--color-google-cloud)',
    'on-premise': 'var(--color-on-premise)',
};

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
`;

const Modal = styled(motion.div)`
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-hover);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  width: 100%;
  max-width: 480px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg);

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--provider-color, var(--color-accent-primary));
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: var(--space-lg);
  right: var(--space-lg);
  width: 32px; height: 32px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all var(--transition-fast);

  &:hover { background: var(--color-border); color: var(--color-text-primary); }
`;

const ProviderBadge = styled.span<{ $provider: ProviderType }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ $provider }) => PROVIDER_COLOR[$provider]};
  background: ${({ $provider }) => `${PROVIDER_COLOR[$provider]}18`};
  border: 1px solid ${({ $provider }) => `${PROVIDER_COLOR[$provider]}33`};
  padding: 4px 10px;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-sm);
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-xl) 0;
`;

const SectionTitle = styled.h3`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-md);
`;

const UsageBlock = styled.div`
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  margin-bottom: var(--space-md);
`;

const UsageRow = styled.div`
  display: grid;
  grid-template-columns: 120px 52px 1fr 42px;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: 8px;

  &:last-child { margin-bottom: 0; }
`;

const UsageLabel = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  font-weight: 600;
`;

const UsageNum = styled.span`
  font-size: 0.75rem;
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--color-text-primary);
  text-align: right;
`;

const UsageTrack = styled.div`
  height: 6px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
`;

const UsageFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  border-radius: var(--radius-full);
  transition: width 0.8s ease;
`;

const UsagePct = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
  text-align: right;
`;

const SavingsLine = styled.div`
  font-size: 0.75rem;
  color: var(--color-accent-success);
  font-weight: 700;
  margin-top: var(--space-sm);
  text-align: right;
`;

const BreakdownList = styled.div`
  margin-bottom: var(--space-xl);
`;

const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.8rem;
  color: var(--color-text-secondary);

  &:last-child { border-bottom: none; }
`;

const BreakdownValue = styled.span`
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--color-accent-success);
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  background: var(--color-accent-primary-light);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
`;

const TotalValue = styled.span`
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-accent-primary);
`;

const CTA = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

const SavedBadge = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-accent-primary-light);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--color-accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
`;

const OptimizeBtn = styled(motion.button)`
  flex: 1;
  padding: var(--space-md) var(--space-xl);
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--radius-md);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  box-shadow: 0 0 20px var(--color-accent-primary-glow);
`;

/* ─── Component ──────────────────────────────────────────────────── */
interface OptimizationTooltipProps {
    provider: CloudProviderData | null;
    isOpen: boolean;
    onClose: () => void;
}

export const OptimizationTooltip: React.FC<OptimizationTooltipProps> = ({
    provider, isOpen, onClose,
}) => {
    if (!provider) return null;

    const cpuUsage = Math.floor(provider.resources.cpu * 0.9);  // millicores
    const cpuRequest = provider.resources.cpu;
    const cpuSavings = Math.floor(cpuRequest * 0.4);

    const memUsageMb = Math.floor(provider.resources.memory * 0.11 * 1024);  // MB
    const memRequestGb = provider.resources.memory;
    const memSavings = Math.floor(memRequestGb * 38);

    const otherSavings = [
        { label: 'Right-size cluster nodes', value: cpuSavings },
        { label: 'Right-size container requests', value: memSavings },
        { label: 'Remedy abandoned workloads', value: 110 },
        { label: 'Reserve instances', value: 98 },
    ];
    const totalSavings = otherSavings.reduce((s, o) => s + o.value, 0);
    const color = PROVIDER_COLOR[provider.provider];

    return (
        <AnimatePresence>
            {isOpen && (
                <Backdrop
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <Modal
                        style={{ '--provider-color': color } as React.CSSProperties}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CloseBtn onClick={onClose} aria-label="Close">✕</CloseBtn>

                        <ProviderBadge $provider={provider.provider}>
                            {provider.name}
                        </ProviderBadge>
                        <Title>Optimization Insights</Title>

                        <SectionTitle>Resource Usage vs Requests</SectionTitle>

                        {/* CPU */}
                        <UsageBlock>
                            <UsageRow>
                                <UsageLabel>CPU Usage:</UsageLabel>
                                <UsageNum>{cpuUsage}M</UsageNum>
                                <UsageTrack>
                                    <UsageFill $pct={Math.round((cpuUsage / cpuRequest) * 100)} $color={color} />
                                </UsageTrack>
                                <UsagePct>{Math.round((cpuUsage / cpuRequest) * 100)}%</UsagePct>
                            </UsageRow>
                            <UsageRow>
                                <UsageLabel>CPU Request:</UsageLabel>
                                <UsageNum>{cpuRequest}M</UsageNum>
                                <UsageTrack>
                                    <UsageFill $pct={100} $color="var(--color-text-tertiary)" />
                                </UsageTrack>
                                <UsagePct>100%</UsagePct>
                            </UsageRow>
                            <SavingsLine>Savings: ${cpuSavings}/mo</SavingsLine>
                        </UsageBlock>

                        {/* Memory */}
                        <UsageBlock>
                            <UsageRow>
                                <UsageLabel>Memory Usage:</UsageLabel>
                                <UsageNum>{memUsageMb}MB</UsageNum>
                                <UsageTrack>
                                    <UsageFill $pct={Math.round((memUsageMb / (memRequestGb * 1024)) * 100)} $color={color} />
                                </UsageTrack>
                                <UsagePct>{Math.round((memUsageMb / (memRequestGb * 1024)) * 100)}%</UsagePct>
                            </UsageRow>
                            <UsageRow>
                                <UsageLabel>Memory Request:</UsageLabel>
                                <UsageNum>{memRequestGb}GB</UsageNum>
                                <UsageTrack>
                                    <UsageFill $pct={100} $color="var(--color-text-tertiary)" />
                                </UsageTrack>
                                <UsagePct>100%</UsagePct>
                            </UsageRow>
                            <SavingsLine>Savings: ${memSavings}/mo</SavingsLine>
                        </UsageBlock>

                        <SectionTitle>Estimated Monthly Savings</SectionTitle>
                        <BreakdownList>
                            {otherSavings.map((item) => (
                                <BreakdownItem key={item.label}>
                                    <span>{item.label}</span>
                                    <BreakdownValue>${item.value}/mo</BreakdownValue>
                                </BreakdownItem>
                            ))}
                        </BreakdownList>

                        <TotalRow>
                            <span>Total Potential Savings</span>
                            <TotalValue>${totalSavings}/mo</TotalValue>
                        </TotalRow>

                        <CTA>
                            <SavedBadge>💰 Up to 70% saved</SavedBadge>
                            <OptimizeBtn
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={onClose}
                            >
                                Optimize Now →
                            </OptimizeBtn>
                        </CTA>
                    </Modal>
                </Backdrop>
            )}
        </AnimatePresence>
    );
};
