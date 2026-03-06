export type ProviderType = 'aws' | 'azure' | 'google-cloud' | 'on-premise';
export type StatusType = 'optimized' | 'warning' | 'critical';

export interface CloudProviderData {
    id: string;
    name: string;
    provider: ProviderType;
    monthlyCost: number;
    efficiency: number;
    status: StatusType;
    trend: number;
    resources: {
        cpu: number;
        memory: number;
        storage: number;
    };
}

export interface CostMetrics {
    totalCost: number;
    cpuCost: number;
    gpuCost: number;
    ramCost: number;
    pvCost: number;
    networkCost: number;
    cloudCost: number;
}

/* ── Fully static mock data — no external API required ─────────────── */
const MOCK_PROVIDERS: CloudProviderData[] = [
    {
        id: '1',
        name: 'AWS Production',
        provider: 'aws',
        status: 'warning',
        efficiency: 78,
        trend: 12.4,
        monthlyCost: 2450,
        resources: { cpu: 128, memory: 512, storage: 2048 },
    },
    {
        id: '2',
        name: 'Azure Staging',
        provider: 'azure',
        status: 'optimized',
        efficiency: 65,
        trend: -3.1,
        monthlyCost: 2490,
        resources: { cpu: 64, memory: 256, storage: 1024 },
    },
    {
        id: '3',
        name: 'Google Cloud Dev',
        provider: 'google-cloud',
        status: 'optimized',
        efficiency: 82,
        trend: 5.8,
        monthlyCost: 2730,
        resources: { cpu: 32, memory: 128, storage: 512 },
    },
    {
        id: '4',
        name: 'On-Premise Legacy',
        provider: 'on-premise',
        status: 'critical',
        efficiency: 45,
        trend: 0.2,
        monthlyCost: 2890,
        resources: { cpu: 48, memory: 192, storage: 4096 },
    },
];

const MOCK_METRICS: CostMetrics = {
    totalCost: 16460,
    cpuCost: 5420,
    gpuCost: 2188,
    ramCost: 3414,
    pvCost: 2292,
    networkCost: 2150,
    cloudCost: 996,
};

/* Async wrappers kept for API compatibility with useCostData hooks */
export const fetchCloudData = async (): Promise<CloudProviderData[]> => {
    // Small artificial delay so loading state flickers nicely
    await new Promise(r => setTimeout(r, 300));
    return MOCK_PROVIDERS;
};

export const fetchCostMetrics = async (): Promise<CostMetrics> => {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_METRICS;
};
