'use client';
import React, { useEffect, useState } from 'react';

interface CountUpProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export const CountUp: React.FC<CountUpProps> = ({
    end,
    duration = 2,
    prefix = '',
    suffix = '',
    decimals = 0,
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let rafId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(parseFloat((eased * end).toFixed(decimals)));
            if (progress < 1) rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [end, duration, decimals]);

    return (
        <span>
            {prefix}
            {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
            {suffix}
        </span>
    );
};
