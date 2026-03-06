export type ProviderType = 'aws' | 'azure' | 'google-cloud' | 'on-premise';
export type StatusType = 'optimized' | 'warning' | 'critical';

export interface CloudProviderData {
    id: string;
    name: string;
    provider: ProviderType;
    monthlyCost: number;
    efficiency: number;
    status: StatusType;
    trend: number; // % change vs last month
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

const PROVIDERS: Array<{ name: string; provider: ProviderType; status: StatusType; efficiency: number; trend: number }> = [
    { name: 'AWS Production', provider: 'aws', status: 'warning', efficiency: 78, trend: 12.4 },
    { name: 'Azure Staging', provider: 'azure', status: 'optimized', efficiency: 65, trend: -3.1 },
    { name: 'Google Cloud Dev', provider: 'google-cloud', status: 'optimized', efficiency: 82, trend: 5.8 },
    { name: 'On-Premise Legacy', provider: 'on-premise', status: 'critical', efficiency: 45, trend: 0.2 },
];

export const fetchCloudData = async (): Promise<CloudProviderData[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Failed to fetch cloud data');
    const users = await response.json();

    return PROVIDERS.map((tpl, i) => ({
        id: String(i + 1),
        name: tpl.name,
        provider: tpl.provider,
        status: tpl.status,
        efficiency: tpl.efficiency,
        trend: tpl.trend,
        monthlyCost: Math.floor(users[i].id * 600) + [1850, 1290, 930, 490][i],
        resources: {
            cpu: [128, 64, 32, 48][i],
            memory: [512, 256, 128, 192][i],
            storage: [2048, 1024, 512, 4096][i],
        },
    }));
};

export const fetchCostMetrics = async (): Promise<CostMetrics> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
    if (!response.ok) throw new Error('Failed to fetch metrics');
    const posts = await response.json();

    return {
        totalCost: 16460,
        cpuCost: posts[0].id * 162,  // 3240
        gpuCost: posts[1].id * 94,   // 1880  (rounded)
        ramCost: posts[2].id * 138,  // 4140
        pvCost: posts[3].id * 73,   // 2920 (rounded)
        networkCost: posts[4].id * 50, // 2500 -> cap
        cloudCost: posts[5].id * 34,   // 2040 -> cap remainder
    };
};
