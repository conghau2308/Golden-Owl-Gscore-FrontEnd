'use client';

import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SubjectStatistics } from '@/types';

const LEVELS = [
    { key: 'excellent' as const, label: 'Giỏi ≥8', color: '#10b981' },
    { key: 'good' as const, label: 'Khá 6–7.9', color: '#3b82f6' },
    { key: 'average' as const, label: 'TB 4–5.9', color: '#f59e0b' },
    { key: 'weak' as const, label: 'Yếu <4', color: '#ef4444' },
];

interface Props {
    subjectName: string;
    statistics: SubjectStatistics['statistics'];
}

export default function StatisticsChart({ statistics }: Props) {
    const total = Object.values(statistics).reduce((a, b) => a + b, 0);

    const data = LEVELS.map(({ key, label, color }) => ({
        name: label,
        value: statistics[key],
        percent: ((statistics[key] / total) * 100).toFixed(1),
        fill: color,
    }));

    return (
        <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-right">
                {total.toLocaleString('vi-VN')} thí sinh
            </p>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="45%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={2}
                        dataKey="value"
                    />
                    <Tooltip
                        formatter={(value, name) => {
                            if (value === undefined) return ['', String(name)];
                            const num = Number(value);
                            const item = data.find(d => d.name === name);
                            return [
                                `${num.toLocaleString('vi-VN')} (${item?.percent}%)`,
                                String(name),
                            ];
                        }}
                    />
                    <Legend
                        formatter={(value) => {
                            const item = data.find(d => d.name === value);
                            return `${value}: ${item?.percent}%`;
                        }}
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}