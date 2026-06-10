'use client';

import { useState } from 'react';
import { getStudentScore } from '@/lib/api';
import type { StudentScore } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, AlertCircle } from 'lucide-react';

const SUBJECTS: { key: keyof StudentScore; label: string }[] = [
  { key: 'math', label: 'Toán' },
  { key: 'literature', label: 'Ngữ Văn' },
  { key: 'english', label: 'Ngoại Ngữ' },
  { key: 'physics', label: 'Vật Lý' },
  { key: 'chemistry', label: 'Hóa Học' },
  { key: 'biology', label: 'Sinh Học' },
  { key: 'history', label: 'Lịch Sử' },
  { key: 'geography', label: 'Địa Lý' },
  { key: 'civicEdu', label: 'GDCD' },
];

const GROUPS = [
  { name: 'Khối A', keys: ['math', 'physics', 'chemistry'] },
  { name: 'Khối B', keys: ['math', 'biology', 'chemistry'] },
  { name: 'Khối C', keys: ['literature', 'history', 'geography'] },
  { name: 'Khối D', keys: ['math', 'literature', 'english'] },
];

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <Badge variant="outline">—</Badge>;
  if (score >= 8) return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">{score}</Badge>;
  if (score >= 6.5) return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">{score}</Badge>;
  if (score >= 5) return <Badge className="bg-amber-500 hover:bg-amber-600 text-white">{score}</Badge>;
  return <Badge variant="destructive">{score}</Badge>;
}

export default function LookupPage() {
  const [input, setInput] = useState('');
  const [data, setData] = useState<StudentScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!input.trim()) return;
    setLoading(true); setError(null);
    try {
      setData(await getStudentScore(input.trim()));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tìm thấy thí sinh');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tra cứu điểm thi</h1>
        <p className="text-muted-foreground text-sm mt-1">Nhập số báo danh để xem kết quả</p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Số báo danh (VD: 01000005)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="font-mono"
        />
        <Button onClick={handleSearch} disabled={loading}>
          <Search className="w-4 h-4 mr-2" />
          Tra cứu
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {loading && (
        <Card><CardContent className="pt-6 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
        </CardContent></Card>
      )}

      {data && !loading && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <span>SBD: <span className="font-mono">{data.registrationNumber}</span></span>
                {data.referenceLanguageCode && (
                  <Badge variant="outline">Mã ngoại ngữ: {data.referenceLanguageCode}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SUBJECTS.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-sm">{label}</span>
                    <ScoreBadge score={data[key] as number | null} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Điểm tổ hợp xét tuyển</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {GROUPS.map(({ name, keys }) => {
                  const vals = keys.map(k => data[k as keyof StudentScore] as number | null);
                  const total = vals.some(v => v === null) ? null : vals.reduce((a, b) => a! + b!, 0);
                  return (
                    <div key={name} className="p-3 rounded-lg border text-center">
                      <div className="text-xs text-muted-foreground mb-1">{name}</div>
                      <div className="text-2xl font-bold text-primary">
                        {total !== null ? total!.toFixed(2) : '—'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}