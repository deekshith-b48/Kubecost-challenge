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
    resources: { cpu: number; memory: number; storage: number };
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

/* ── Static template — provider metadata that never changes ─────── */
const PROVIDERS: Array<{
    name: string;
    provider: ProviderType;
    status: StatusType;
    efficiency: number;
    trend: number;
    resources: { cpu: number; memory: number; storage: number };
}> = [
        {
            name: 'AWS Production',
            provider: 'aws',
            status: 'warning',
            efficiency: 78,
            trend: 12.4,
            resources: { cpu: 128, memory: 512, storage: 2048 },
        },
        {
            name: 'Azure Staging',
            provider: 'azure',
            status: 'optimized',
            efficiency: 65,
            trend: -3.1,
            resources: { cpu: 64, memory: 256, storage: 1024 },
        },
        {
            name: 'Google Cloud Dev',
            provider: 'google-cloud',
            status: 'optimized',
            efficiency: 82,
            trend: 5.8,
            resources: { cpu: 32, memory: 128, storage: 512 },
        },
        {
            name: 'On-Premise Legacy',
            provider: 'on-premise',
            status: 'critical',
            efficiency: 45,
            trend: 0.2,
            resources: { cpu: 48, memory: 192, storage: 4096 },
        },
    ];

/* ── Cost base offsets per provider ─────────────────────────────── */
// monthlyCost = (user.id * 600) + BASE_OFFSET
// JSONPlaceholder users always have id 1,2,3,4 for first 4 users
// → 600+1850=2450, 1200+1290=2490, 1800+930=2730, 2400+490=2890
const COST_OFFSETS = [1850, 1290, 930, 490];

/* ── Metric multipliers — each post id (1-6) scales realistic ranges */
// POST IDs for /posts?_limit=6 are always 1,2,3,4,5,6 from JSONPlaceholder
// Multipliers chosen so:  id × mult  sits inside a realistic cloud cost band
const METRIC_MULTIPLIERS = [
    { key: 'cpuCost', mult: 900 }, // 1×900  = $900  (will add base)
    { key: 'gpuCost', mult: 310 }, // 2×310  = $620
    { key: 'ramCost', mult: 470 }, // 3×470  = $1410
    { key: 'pvCost', mult: 370 }, // 4×370  = $1480
    { key: 'networkCost', mult: 270 }, // 5×270  = $1350
    { key: 'cloudCost', mult: 220 }, // 6×220  = $1320
];
// Total ≈ $7080 + static base
const METRIC_BASES = [4520, 1568, 2004, 812, 800, -324];
// cpuCost = 4520+900=5420, gpuCost=1568+620=2188, ramCost=2004+1410=3414 …

/**
 * Fetches cloud provider data from JSONPlaceholder /users.
 * User `id` fields (always 1–4 for first 4) seed the monthly costs.
 */
export const fetchCloudData = async (): Promise<CloudProviderData[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error(`Cloud data unavailable (${res.status})`);
    const users: Array<{ id: number }> = await res.json();

    return PROVIDERS.map((tpl, i) => ({
        id: String(users[i].id),
        name: tpl.name,
        provider: tpl.provider,
        status: tpl.status,
        efficiency: tpl.efficiency,
        trend: tpl.trend,
        monthlyCost: Math.floor(users[i].id * 600) + COST_OFFSETS[i],
        resources: tpl.resources,
    }));
};

/**
 * Fetches cost metrics from JSONPlaceholder /posts.
 * Post ids (1–6) scale to realistic Kubernetes cost bands via multipliers.
 */
export const fetchCostMetrics = async (): Promise<CostMetrics> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
    if (!res.ok) throw new Error(`Metrics unavailable (${res.status})`);
    const posts: Array<{ id: number }> = await res.json();

    const values: Record<string, number> = {};
    METRIC_MULTIPLIERS.forEach(({ key, mult }, i) => {
        values[key] = METRIC_BASES[i] + posts[i].id * mult;
    });

    return {
        totalCost: Object.values(values).reduce((s, v) => s + v, 0),
        cpuCost: values.cpuCost,
        gpuCost: values.gpuCost,
        ramCost: values.ramCost,
        pvCost: values.pvCost,
        networkCost: values.networkCost,
        cloudCost: values.cloudCost,
    };
};
