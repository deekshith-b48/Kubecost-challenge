'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NavBar } from '@/components/NavBar';
import { HeroSection } from '@/components/HeroSection';
import { GranularSection } from '@/components/GranularSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { MultiCloudSection } from '@/components/MultiCloudSection';
import { SavingsSection } from '@/components/SavingsSection';
import { FinOpsSection } from '@/components/FinOpsSection';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 2 },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Sticky navigation */}
      <NavBar />

      <main style={{ paddingTop: 0 }}>
        {/* 1. Hero — intro & 3 pillars */}
        <HeroSection />

        {/* 2. Granular drill-down: Cluster → Namespace → Pod */}
        <GranularSection />

        {/* 3. Resource types: CPU / GPU / RAM / Storage / Network */}
        <ResourcesSection />

        {/* 4. Multi-cloud cost aggregation (existing) */}
        <div id="cloud">
          <MultiCloudSection />
        </div>

        {/* 5. Optimization & Savings */}
        <SavingsSection />

        {/* 6. FinOps: Engineering ↔ Finance alignment */}
        <FinOpsSection />
      </main>
    </QueryClientProvider>
  );
}
