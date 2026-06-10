import { getTop10GroupA } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal } from 'lucide-react';

const RANK_COLOR: Record<number, string> = {
    1: 'text-yellow-500',
    2: 'text-zinc-400',
    3: 'text-amber-600',
};

export default async function Top10Page() {
    const top10 = await getTop10GroupA();

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Top 10 Khối A
                </h1>
                <p className="text-muted-foreground text-sm mt-1">Toán – Vật Lý – Hóa Học</p>
            </div>

            <div className="space-y-2">
                {top10.map(({ rank, studentRankDto: s }) => (
                    <Card key={s.registrationNumber} className={rank <= 3 ? 'border-primary/40' : ''}>
                        <CardContent className="py-3 px-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-8 text-center font-bold text-lg ${RANK_COLOR[rank] ?? 'text-muted-foreground'}`}>
                                    {rank <= 3 ? <Medal className="w-5 h-5 mx-auto" /> : rank}
                                </div>

                                <div className="flex-1">
                                    <span className="font-mono text-sm">{s.registrationNumber}</span>
                                    {rank <= 3 && <Badge className="ml-2 text-xs" variant="outline">Hạng {rank}</Badge>}
                                </div>

                                <div className="flex gap-4 text-sm">
                                    {[
                                        { label: 'Toán', val: s.math },
                                        { label: 'Lý', val: s.physics },
                                        { label: 'Hóa', val: s.chemistry },
                                    ].map(({ label, val }) => (
                                        <div key={label} className="text-center">
                                            <div className="text-xs text-muted-foreground">{label}</div>
                                            <div className="font-semibold">{val}</div>
                                        </div>
                                    ))}
                                    <div className="text-center border-l pl-4">
                                        <div className="text-xs text-muted-foreground">Tổng</div>
                                        <div className="font-bold text-primary">{s.totalScore}</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}