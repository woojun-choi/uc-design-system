import type { Meta, StoryObj } from '@storybook/react-vite'
import { contrast } from '@adobe/leonardo-contrast-colors'
import { useMemo, useState } from 'react'
import { generatePalette, RATIOS, STEPS, type Palette } from '@/lib/palette'

/**
 * M0: seed 색 후보 비교. 브라우저에서 바로 Leonardo를 돌린다.
 * 마음에 드는 값을 tokens/themes/*.json에 옮기면 된다.
 */
const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number]
const ratio = (a: string, b: string) => Math.abs(contrast(hexToRgb(a), hexToRgb(b)))

function Row({ label, palette, family }: { label: string; palette: Palette; family: string }) {
  return (
    <div className="grid grid-cols-[6rem_repeat(12,1fr)] items-stretch gap-1">
      <div className="self-center text-caption1" style={{ color: palette.scales.gray[70] }}>{label}</div>
      {STEPS.map((s) => {
        const c = palette.scales[family][s]
        const r = ratio(c, palette.background)
        const off = Math.abs(r - RATIOS[s]) > RATIOS[s] * 0.05
        return (
          <div key={s} className="flex h-14 flex-col justify-end p-1 text-caption2 leading-tight" style={{ background: c, color: s >= 50 ? palette.background : palette.scales.gray[95] }}>
            <span>{s}</span>
            <span style={off ? { textDecoration: 'underline wavy' } : undefined} title={off ? `목표 ${RATIOS[s]}` : undefined}>
              {r.toFixed(2)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function Candidate({ name, gray, brand, lightness }: { name: string; gray: string[]; brand: string; lightness: { light: number; dark: number } }) {
  const p = useMemo(
    () => ({
      light: generatePalette({ gray, colors: { brand: [brand] }, lightness: lightness.light }),
      dark: generatePalette({ gray, colors: { brand: [brand] }, lightness: lightness.dark }),
    }),
    [gray, brand, lightness],
  )
  return (
    <div className="grid grid-cols-2 gap-4">
      {(['light', 'dark'] as const).map((m) => (
        <div key={m} className="space-y-1 p-3" style={{ background: p[m].background }}>
          <div className="mb-2 flex items-center gap-3">
            <code className="text-caption1" style={{ color: p[m].scales.gray[90] }}>{name} · {brand} · {m}</code>
            <span className="px-3 py-1 text-caption1" style={{ background: p[m].scales.brand[50], color: p[m].background }}>저장하기</span>
            <span className="text-caption1" style={{ color: p[m].scales.brand[60] }}>링크 글자</span>
          </div>
          <Row label="gray" palette={p[m]} family="gray" />
          <Row label="brand" palette={p[m]} family="brand" />
        </div>
      ))}
    </div>
  )
}

const NEUTRAL = { gray: ['#737373'], lightness: { light: 100, dark: 8 } }
const PAPER = { gray: ['#f4ecda', '#8a7d66', '#2e2a24'], lightness: { light: 94, dark: 10 } }

function Candidates({ base, seeds }: { base: typeof NEUTRAL; seeds: string[] }) {
  const [custom, setCustom] = useState(seeds[0])
  return (
    <div className="space-y-6">
      <label className="flex items-center gap-2 text-footnote text-default">
        직접 넣어 보기 <input type="color" value={custom} onChange={(e) => setCustom(e.target.value)} />
        <code>{custom}</code>
      </label>
      <Candidate name="직접" brand={custom} {...base} />
      {seeds.map((s) => (
        <Candidate key={s} name="후보" brand={s} {...base} />
      ))}
      <p className="text-caption1 text-muted">숫자 = 배경 대비. 물결 밑줄 = 목표에서 5% 넘게 벗어남 (배경이 밝거나 어두워서 못 닿는 단계).</p>
    </div>
  )
}

const meta: Meta = { title: '기초/seed 후보', parameters: { layout: 'fullscreen' } }
export default meta

export const neutral: StoryObj = {
  render: () => <Candidates base={NEUTRAL} seeds={['#3e63dd', '#2f6fa8', '#4a5a8c', '#3b7a6e']} />,
}
export const paper: StoryObj = {
  render: () => <Candidates base={PAPER} seeds={['#9c4a2f', '#b0442c', '#7a3b2e', '#2d3a5c']} />,
}
