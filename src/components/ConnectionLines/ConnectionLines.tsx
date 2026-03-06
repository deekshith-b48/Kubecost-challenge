'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProviderType } from '@/lib/api';
import { PROVIDER_COLOR_TOKEN } from '@/tokens';


interface ConnectionLinesProps {
    providers: Array<{ id: string; provider: ProviderType }>;
    connectedCount: number;
    cardRefs: React.RefObject<HTMLDivElement | null>[];
    centerRef: React.RefObject<HTMLDivElement | null>;
    arenaRef: React.RefObject<HTMLDivElement | null>;
}

interface PathInfo {
    d: string;
    color: string;
    length: number; // approximate path length for dashoffset calc
}

/* ─── Measure approximate bezier length ────────────────────────────── */
function approxLength(d: string): number {
    // Parse the M x y C ... endpoint and compute a rough chord length
    const nums = d.match(/[-\d.]+/g)?.map(Number) ?? [];
    if (nums.length < 8) return 200;
    const dx = nums[6] - nums[0];
    const dy = nums[7] - nums[1];
    return Math.sqrt(dx * dx + dy * dy) * 1.3; // factor for curve
}

/* ─── Supply-flow dashed path ──────────────────────────────────────── */
const DASH = 10;  // dash length
const GAP = 14;  // gap length
const CYCLE = DASH + GAP; // one full pattern cycle = 24

interface SupplyPathProps {
    d: string;
    color: string;
    delay: number;
    drawDelay: number;
}

const SupplyPath: React.FC<SupplyPathProps> = ({ d, color, delay, drawDelay }) => {
    const len = approxLength(d);
    // Number of cycles that fits along the path — we animate by -CYCLE to make it loop seamlessly
    const cycles = Math.ceil(len / CYCLE) + 2;

    return (
        <>
            {/* ① Permanent faint dotted baseline (always visible) */}
            <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeDasharray={`2 ${CYCLE - 2}`}
                opacity="0.12"
            />

            {/* ② Brightest line draws in first (one-shot), stays as the "track highlight" */}
            <motion.path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={0}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.35 }}
                transition={{
                    pathLength: { delay: drawDelay, duration: 0.9, ease: 'easeOut' },
                    opacity: { delay: drawDelay, duration: 0.3 },
                }}
            />

            {/* ③ Flowing supply dashes — the main "data flowing" effect */}
            <motion.path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${DASH} ${GAP}`}
                initial={{ strokeDashoffset: 0, opacity: 0 }}
                animate={{
                    strokeDashoffset: [0, -(CYCLE * cycles)],
                    opacity: 1,
                }}
                transition={{
                    strokeDashoffset: {
                        delay,
                        duration: (len / 90), // ~90px per second feels natural
                        repeat: Infinity,
                        ease: 'linear',
                    },
                    opacity: { delay, duration: 0.4 },
                }}
                style={{ filter: `drop-shadow(0 0 3px ${color}) drop-shadow(0 0 6px ${color}88)` }}
            />

            {/* ④ Glowing dot at the dashboard end (arrowhead substitute) */}
            <motion.circle
                cx={0} cy={0}
                r={5}
                fill={color}
                style={{ filter: `drop-shadow(0 0 8px ${color})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ delay, duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
                {/* Animate circle along the path so it sits at the END (center dashboard) */}
                <animateMotion
                    dur="0.001s"
                    fill="freeze"
                    calcMode="linear"
                    keyPoints="1"
                    keyTimes="1"
                >
                    <mpath href={`#path-${color.replace('#', '')}`} />
                </animateMotion>
            </motion.circle>
        </>
    );
};

/* ─── Main component ──────────────────────────────────────────────────── */
export const ConnectionLines: React.FC<ConnectionLinesProps> = ({
    providers,
    connectedCount,
    cardRefs,
    centerRef,
    arenaRef,
}) => {
    const [paths, setPaths] = useState<(PathInfo | null)[]>([]);
    const [dims, setDims] = useState({ w: 0, h: 0 });
    const [mounted, setMounted] = useState(false);
    const rafRef = useRef<number | undefined>(undefined);
    const retryRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const retryCount = useRef(0);

    // Ensure we only run SVG logic client-side
    useEffect(() => { setMounted(true); }, []);

    const computePaths = useCallback(() => {
        const arena = arenaRef.current;
        const center = centerRef.current;
        if (!arena || !center) return;

        const arenaRect = arena.getBoundingClientRect();
        const centerRect = center.getBoundingClientRect();

        // Retry if DOM hasn't been painted yet (common in SSR/static deployments)
        if (arenaRect.width === 0) {
            if (retryCount.current < 15) {
                retryCount.current += 1;
                retryRef.current = setTimeout(computePaths, 150);
            }
            return;
        }
        retryCount.current = 0;

        setDims({ w: arenaRect.width, h: arenaRect.height });

        const dashLeft = centerRect.left - arenaRect.left;
        const dashRight = centerRect.right - arenaRect.left;
        const dashCY = (centerRect.top + centerRect.bottom) / 2 - arenaRect.top;

        const newPaths: (PathInfo | null)[] = cardRefs.map((ref, i) => {
            const card = ref.current;
            if (!card || i >= providers.length) return null;

            const cardRect = card.getBoundingClientRect();
            const cardLeft = cardRect.left - arenaRect.left;
            const cardRight = cardRect.right - arenaRect.left;
            const cardCX = (cardLeft + cardRight) / 2;
            const cardCY = (cardRect.top + cardRect.bottom) / 2 - arenaRect.top;

            const isLeft = cardCX < arenaRect.width / 2;
            const startX = isLeft ? cardRight : cardLeft;
            const endX = isLeft ? dashLeft : dashRight;

            // Slight vertical bend for visual interest
            const dx = Math.abs(endX - startX);
            const cp1x = isLeft ? startX + dx * 0.5 : startX - dx * 0.5;
            const cp1y = cardCY;
            const cp2x = isLeft ? endX - dx * 0.2 : endX + dx * 0.2;
            const cp2y = dashCY;

            const d = [
                `M ${startX.toFixed(1)} ${cardCY.toFixed(1)}`,
                `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)},`,
                `  ${cp2x.toFixed(1)} ${cp2y.toFixed(1)},`,
                `  ${endX.toFixed(1)} ${dashCY.toFixed(1)}`,
            ].join(' ');

            return { d, color: PROVIDER_COLOR_TOKEN[providers[i].provider], length: approxLength(d) };
        });

        setPaths(newPaths);
    }, [arenaRef, centerRef, cardRefs, providers]);

    useEffect(() => {
        computePaths();

        const observer = new ResizeObserver(() => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(computePaths);
        });

        if (arenaRef.current) observer.observe(arenaRef.current);
        window.addEventListener('resize', computePaths);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', computePaths);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (retryRef.current) clearTimeout(retryRef.current);
        };
    }, [computePaths, arenaRef]);

    // Don't render SVG during SSR or before mount
    if (!mounted || dims.w === 0) return null;

    return (
        <svg
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                width: dims.w,
                height: dims.h,
                pointerEvents: 'none',
                zIndex: 2,
                overflow: 'visible',
            }}
        >
            <defs>
                <filter id="glow-dot" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            {/* Hidden path definitions for animateMotion */}
            {paths.map((info, i) => {
                if (!info) return null;
                const id = `path-${info.color.replace('#', '')}-${i}`;
                return <path key={id} id={id} d={info.d} fill="none" stroke="none" />;
            })}

            {paths.map((info, i) => {
                if (!info) return null;
                const isActive = i < connectedCount;
                const { d, color } = info;
                const drawDelay = 0.4 + i * 0.3;
                const flowDelay = drawDelay + 0.9;

                return (
                    <AnimatePresence key={providers[i].id}>
                        {isActive && (
                            <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <SupplyPath
                                    d={d}
                                    color={color}
                                    delay={flowDelay}
                                    drawDelay={drawDelay}
                                />

                                {/* Pulsing dot at card origin */}
                                <motion.circle
                                    r="4"
                                    fill={color}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: [0.6, 1, 0.6], scale: [0.8, 1.1, 0.8] }}
                                    transition={{ delay: drawDelay, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                                >
                                    {/* Position dot at path start */}
                                    <animateMotion
                                        dur="0.001s"
                                        fill="freeze"
                                        calcMode="linear"
                                        keyPoints="0"
                                        keyTimes="1"
                                    >
                                        <mpath href={`#path-${color.replace('#', '')}-${i}`} />
                                    </animateMotion>
                                </motion.circle>
                            </motion.g>
                        )}
                    </AnimatePresence>
                );
            })}
        </svg>
    );
};
