import { useMemo, useState } from 'react';

export type Student = {
  id: string;
  regNo?: string;
  chinese?: number | null;
  english?: number | null;
  mathA?: number | null;
  mathB?: number | null;
  social?: number | null;
  science?: number | null;
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

// Two common 4-subject combinations requested by the user
const COMMON_COMBOS: { key: string; label: string; subjects: (keyof Student)[] }[] = [
  { key: 'chi_eng_ma_sci', label: '國+英+數A+自', subjects: ['chinese', 'english', 'mathA', 'science'] },
  { key: 'chi_eng_mb_sci', label: '國+英+數B+自', subjects: ['chinese', 'english', 'mathB', 'science'] },
];

export default function Benchmarks({ students }: { students: Student[] }) {
  const [thresholds, setThresholds] = useState<Record<string, number[]>>(() =>
    Object.fromEntries(SUBJECTS.map(s => [s.key, DEFAULT_THRESHOLDS[s.key as string] ?? [0, 0, 0, 0, 0]])) as Record<string, number[]>
  );

  // viewMode: 'cumulative' shows >= thresholds (current behaviour)
  // 'exclusive' shows mutually exclusive buckets: 未達均標 / 達均標_未達前標 / 達前標_未達頂標 / 達頂標
  const [viewMode, setViewMode] = useState<'cumulative' | 'exclusive'>('cumulative');

  const stats = useMemo(() => {
    // For each subject compute:
    // - takersCount
    // - cumulative counts (>= each threshold)
    // - exclusive buckets (4 groups as requested)
    const subjectStats = SUBJECTS.map(s => {
      const key = s.key as keyof Student;
      const thr = thresholds[key as string] ?? [0, 0, 0, 0, 0];
      const takers = students.filter(st => typeof (st as any)[key] === 'number');

      // cumulative: counts for each threshold value (>=)
      const cumulativeCounts = thr.map(t => takers.filter(st => ((st as any)[key] as number) >= t).length);

      // find indices: top=0, front=1, mean=2
      const topV = thr[0];
      const frontV = thr[1];
      const meanV = thr[2];

      const exclusiveBuckets = {
        未達均標: takers.filter(st => ((st as any)[key] as number) < meanV).length,
        達均標_未達前標: takers.filter(st => ((st as any)[key] as number) >= meanV && ((st as any)[key] as number) < frontV).length,
        達前標_未達頂標: takers.filter(st => ((st as any)[key] as number) >= frontV && ((st as any)[key] as number) < topV).length,
        達頂標: takers.filter(st => ((st as any)[key] as number) >= topV).length,
      };

      return { key, label: s.label, takersCount: takers.length, thresholds: thr, cumulativeCounts, exclusiveBuckets };
    });

    // Combos: for the two requested combos compute
    // - sumOfMeans (均標總和)
    // - count_total_ge_sumMeans: number of students with all scores present and total >= sumOfMeans
    // - count_each_subject_ge_mean: number of students with each subject >= mean (i.e., meet mean in all subjects)

    const comboStats = COMMON_COMBOS.map(c => {
      const means = c.subjects.map(sub => (thresholds[sub as string] ?? DEFAULT_THRESHOLDS[sub as string] ?? [0, 0, 0, 0, 0])[2]);
      const sumMean = means.reduce((a, b) => a + b, 0);

      let count_total_ge_sumMeans = 0;
      let count_each_subject_ge_mean = 0;
      const takerIds: string[] = [];

      students.forEach(st => {
        const vals = c.subjects.map(sub => (st as any)[sub] as number | null | undefined);
        const hasAll = vals.every(v => typeof v === 'number');
        if (!hasAll) return;
        const total = vals.reduce((a, b) => (a || 0) + (b || 0), 0);
        if (total >= sumMean) count_total_ge_sumMeans++;
        const eachOk = vals.every((v, idx) => (v as number) >= means[idx]);
        if (eachOk) count_each_subject_ge_mean++;
        if (total >= sumMean || eachOk) takerIds.push(st.id);
      });

      return { key: c.key, label: c.label, subjects: c.subjects, sumMean, count_total_ge_sumMeans, count_each_subject_ge_mean, takerIds };
    });

    return { subjectStats, comboStats };
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
      <p style={{ marginTop: 6, marginBottom: 12, color: '#555' }}>以下為你提供的五標（可微調），比例以「有該科成績的學生」為母體。可切換「累積」或「互斥」視圖；下方也會顯示兩組常用四科組合的均標相關統計。</p>

      <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="radio" checked={viewMode === 'cumulative'} onChange={() => setViewMode('cumulative')} /> 累積 ({'>='} 標準)
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="radio" checked={viewMode === 'exclusive'} onChange={() => setViewMode('exclusive')} /> 互斥分組
        </label>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {stats.subjectStats.map(s => (
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
                {viewMode === 'cumulative'
                  ? s.thresholds.map((t, i) => {
                      const c = s.cumulativeCounts[i] ?? 0;
                      const denom = s.takersCount || 0;
                      const pct = denom ? ((c / denom) * 100).toFixed(1) : '0.0';
                      return (
                        <tr key={i}>
                          <td style={{ padding: 6, borderBottom: '1px solid #fafafa' }}>{FIVE_LABELS[i]}：{t} 級分以上</td>
                          <td style={{ padding: 6, textAlign: 'right', borderBottom: '1px solid #fafafa' }}>{c}</td>
                          <td style={{ padding: 6, textAlign: 'right', borderBottom: '1px solid #fafafa' }}>{pct}%</td>
                        </tr>
                      );
                    })
                  : Object.entries(s.exclusiveBuckets).map(([label, c]) => {
                      const denom = s.takersCount || 0;
                      const pct = denom ? ((c / denom) * 100).toFixed(1) : '0.0';
                      return (
                        <tr key={label}>
                          <td style={{ padding: 6, borderBottom: '1px solid #fafafa' }}>{label}</td>
                          <td style={{ padding: 6, textAlign: 'right', borderBottom: '1px solid #fafafa' }}>{c}</td>
                          <td style={{ padding: 6, textAlign: 'right', borderBottom: '1px solid #fafafa' }}>{pct}%</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        ))}

        {/* 四科組合統計 */}
        <div style={{ border: '1px solid #eee', padding: 10, borderRadius: 8 }}>
          <strong>四科組合：均標相關統計</strong>
          <p style={{ marginTop: 6, marginBottom: 12, color: '#555' }}>針對常用兩個組合同時計算：(1) 四科總分 {'>='} 均標總和 的人數；(2) 四科每科皆達均標的人數。</p>

          <table style={{ width: '100%', marginTop: 8, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 6, borderBottom: '1px solid #f3f3f3' }}>組合</th>
                <th style={{ textAlign: 'right', padding: 6, borderBottom: '1px solid #f3f3f3' }}>均標總和</th>
                <th style={{ textAlign: 'right', padding: 6, borderBottom: '1px solid #f3f3f3' }}>總分 {'>='} 均標總和 (人數)</th>
                <th style={{ textAlign: 'right', padding: 6, borderBottom: '1px solid #f3f3f3' }}>各科皆 {'>='} 均標 (人數)</th>
              </tr>
            </thead>
            <tbody>
              {stats.comboStats.map(c => (
                <tr key={c.key} className="hover:bg-black/[0.02] transition-colors">
                  <td style={{ padding: 6 }}>{c.label}</td>
                  <td style={{ padding: 6, textAlign: 'right' }}>{c.sumMean}</td>
                  <td style={{ padding: 6, textAlign: 'right' }}>{c.count_total_ge_sumMeans}</td>
                  <td style={{ padding: 6, textAlign: 'right' }}>{c.count_each_subject_ge_mean}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
