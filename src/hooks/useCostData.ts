import { useQuery } from '@tanstack/react-query';
import { fetchCloudData, fetchCostMetrics } from '@/lib/api';

export const useCloudProviders = () =>
    useQuery({
        queryKey: ['cloudProviders'],
        queryFn: fetchCloudData,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

export const useCostMetrics = () =>
    useQuery({
        queryKey: ['costMetrics'],
        queryFn: fetchCostMetrics,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
