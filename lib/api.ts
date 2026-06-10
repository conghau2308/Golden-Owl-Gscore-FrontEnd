const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

const cache = new Map<string, { data: unknown; expiry: number }>();

async function fetchWithCache<T>(url: string, ttl: number): Promise<T> {
    const cached = cache.get(url);
    if (cached && Date.now() < cached.expiry) return cached.data as T;

    const res = await fetch(`${BASE_URL}${url}`);
    const json = await res.json();

    if (!json.success) throw new Error(json.message);

    cache.set(url, { data: json.data, expiry: Date.now() + ttl });
    return json.data as T;
}

export const getStudentScore = (sbd: string) =>
    fetchWithCache<import('@/types').StudentScore>(
        `/api/students/${sbd}/score`, 2 * 60 * 1000
    );

export const getScoreStatistics = () =>
    fetchWithCache<import('@/types').SubjectStatistics[]>(
        '/api/students/statistics/score-level', 10 * 60 * 1000
    );

export const getTop10GroupA = () =>
    fetchWithCache<import('@/types').TopStudent[]>(
        '/api/students/rank/top10-group-a', 10 * 60 * 1000
    );