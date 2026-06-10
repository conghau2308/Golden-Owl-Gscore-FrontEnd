import { getScoreStatistics } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatisticsChart from '@/components/StatisticsChart';

export const dynamic = 'force-dynamic';

export default async function StatisticsPage() {
    const stats = await getScoreStatistics();

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Thống kê điểm thi</h1>
                <p className="text-muted-foreground text-sm mt-1">Phân phối kết quả theo từng môn</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {stats.map(({ subjectName, statistics }) => (
                    <Card key={subjectName}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">{subjectName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StatisticsChart subjectName={subjectName} statistics={statistics} />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}