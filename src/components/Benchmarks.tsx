import React, { useMemo, useState } from 'react';

export type Student = {
  id: string;
  regNo?: string;
  chinese?: number;
  english?: number;
  mathA?: number;
  mathB?: number;
  social?: number;
  science?: number;
};

const SUBJECTS: { key: keyof Student; label: string }[] = [
  { key: 'chinese', label: '國文' },
  { key: 'english', label: '英文' },
  { key: 'mathA', label: '數學A' },
  { key: 'mathB', label: '數學B' },
  { key: 'social', label: '社會' },
  { key: 'science', label: '自然' },
];

const FIVE_LABELS = ['頂標', '前標', '均標', '底標', '後標'];

const DEFAULT_THRESHOLDS: Record<string, number[]> = {
  chinese: [13, 12, 10, 9, 7],
  mathA: [12, 10, 8, 5, 4],
  mathB: [11, 9, 5, 3, 2],
  english: [13, 11, 8, 5, 3],
  science: [13, 12, 9, 7, 5],
  social: [13, 12, 10, 8, 7],
};

export default function Benchmarks({ students }: { students: Student[] }) {
  const [thresholds, setThresholds] = useState<Record<string, number[]>>(() =>
    Object.fromEntries(SUBJECTS.map(s => [s.key, DEFAULT_THRESHOLDS[s.key as string] ?? [0, 0, 0, 0, 0]])) as Record<string, number[]>
  );

  const stats = useMemo(() => {
    return SUBJECTS.map(s => {
      const key = s.key as keyof Student;
      const thr = thresholds[key as string] ?? [0, 0, 0, 0, 0];
      const takers = students.filter(st => typeof (st as any)[key] === 'number');
      const counts = thr.map(t => takers.filter(st => ((st as any)[key] as number) >= t).length);
      return { key, label: s.label, takersCount: takers.length, thresholds: thr, counts };
    });
  }, [students, thresholds]);

  const handleThresholdChange = (subjectKey: string, idx: number, value: number) => {
    setThresholds(prev => {
      const copy = { ...prev, [subjectKey]: [...(prev[subjectKey] ?? [0, 0, 0, 0, 0])] };
      copy[subjectKey][idx] = value;
      return copy;
    });
  };

  return (
    <div style={{ padding: 12, borderRadius: 12, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 style={{ margin: 0 }}>學測五標達標人數</h3>
      <p style={{ marginTop: 6, marginBottom: 12, color: '#555' }}>以下為你提供的五標（可微調），比例以「有該科成績的學生」為母體。</p>

      <div style={{ display: 'grid', gap: 12 }}>
        {stats.map(s => (
          <div key={String(s.key)} style={{ border: '1px solid #eee', padding: 10, borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong>{s.label}</strong>
              <small style={{ color: '#666' }}>樣本數：{s.takersCount}</small>
            </div>

            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {s.thresholds.map((val, i) => (
                <label key={i} style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                  <small style={{ color: '#444' }}>{FIVE_LABELS[i]}</small>
                  <input
                    type="number"
                    value={val}
                    onChange={e => handleThresholdChange(s.key as string, i, Number(e.target.value))}
                    style={{ padding: 6, marginTop: 4 }}
                  />
                </label>
              ))}
            </div>

            <table style={{ width: '100%', marginTop: 10, borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: 6, borderBottom: '1px solid #f3f3f3' }}>標準</th>
                  <th style={{ textAlign: 'right', padding: 6, borderBottom: '1px solid #f3f3f3' }}>達標人數</th>
                  <th style={{ textAlign: 'right', padding: 6, borderBottom: '1px solid #f3f3f3' }}>比例</th>
                </tr>
              </thead>
              <tbody>
                {s.thresholds.map((t, i) => {
                  const c = s.counts[i] ?? 0;
                  const denom = s.takersCount || 0;
                  const pct = denom ? ((c / denom) * 100).toFixed(1) : '0.0';
                  return (
                    <tr key={i}>
                      <td style={{ padding: 6, borderBottom: '1px solid #fafafa' }}>{FIVE_LABELS[i]}：{t} 級分以上</td>
                      <td style={{ padding: 6, textAlign: 'right', borderBottom: '1px solid #fafafa' }}>{c}</td>
                      <td style={{ padding: 6, textAlign: 'right', borderBottom: '1px solid #fafafa' }}>{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
