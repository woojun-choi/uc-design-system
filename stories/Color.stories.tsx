import type { Meta, StoryObj } from '@storybook/react-vite'
import { parse, wcagContrast } from 'culori'
import { STEPS } from '@/lib/palette'
import { Section, useCssVars } from './_shared'

const FAMILIES = ['gray', 'brand', 'red', 'green', 'yellow', 'blue']
const TONES = ['brand', 'danger', 'success', 'warning', 'info']

/** 브라우저가 계산한 색으로 대비를 잰다 */
function ratio(a?: string, b?: string) {
  const pa = a && parse(a), pb = b && parse(b)
  return pa && pb ? wcagContrast(pa, pb) : NaN
}

function Palette({ v }: { v: Record<string, string> }) {
  const bg = v['--uc-color-background']
  return (
    <div className="space-y-3">
      {FAMILIES.map((f) => (
        <div key={f} className="grid grid-cols-[4rem_repeat(12,1fr)] items-stretch gap-1">
          <div className="self-center text-footnote text-muted">{f}</div>
          {STEPS.map((s) => {
            const c = v[`--uc-color-${f}-${s}`]
            return (
              <div key={s} className="flex h-14 flex-col justify-end p-1 text-caption2" style={{ background: c, color: s >= 50 ? bg : v['--uc-color-gray-95'] }}>
                <span>{s}</span>
                <span className="opacity-80">{ratio(c, bg).toFixed(2)}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function Swatch({ name, v }: { name: string; v: Record<string, string> }) {
  return (
    <div className="w-40">
      <div className="h-10 rounded-md border" style={{ background: `var(--uc-${name})` }} />
      <code className="text-caption1 text-muted">{name}</code>
    </div>
  )
}

function Tones({ v }: { v: Record<string, string> }) {
  return (
    <div className="space-y-3">
      {TONES.map((t) => (
        <div key={t} className="flex flex-wrap items-center gap-3">
          <code className="w-16 text-footnote text-muted">{t}</code>
          {(['solid', 'solid-hover', 'solid-pressed'] as const).map((s) => (
            <div key={s} className="flex w-32 flex-col rounded-md px-3 py-2 text-callout" style={{ background: `var(--uc-bg-${t}-${s})`, color: `var(--uc-fg-on-${t})` }}>
              <span>{s}</span>
              <span className="text-caption2">{ratio(v[`--uc-fg-on-${t}`], v[`--uc-bg-${t}-${s}`]).toFixed(2)}</span>
            </div>
          ))}
          {(['weak', 'weak-hover'] as const).map((s) => (
            <div key={s} className="flex w-32 flex-col rounded-md px-3 py-2 text-callout" style={{ background: `var(--uc-bg-${t}-${s})`, color: `var(--uc-fg-${t})` }}>
              <span>{s}</span>
              <span className="text-caption2">{ratio(v[`--uc-fg-${t}`], v[`--uc-bg-${t}-${s}`]).toFixed(2)}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const FG = ['default', 'muted', 'subtle', 'disabled', ...TONES]
const LAYERS = ['bg-layer-1', 'bg-layer-2', 'bg-layer-3']

function ContrastTable({ v }: { v: Record<string, string> }) {
  return (
    <table className="text-footnote">
      <thead>
        <tr className="text-left text-muted">
          <th className="pr-6 font-regular">글자 \ 배경</th>
          {LAYERS.map((l) => <th key={l} className="px-3 font-regular">{l}</th>)}
        </tr>
      </thead>
      <tbody>
        {FG.map((f) => (
          <tr key={f}>
            <td className="py-1 pr-6"><code className="text-muted">fg-{f}</code></td>
            {LAYERS.map((l) => {
              const r = ratio(v[`--uc-fg-${f}`], v[`--uc-${l}`])
              return (
                <td key={l} className="px-3 py-1" style={{ background: `var(--uc-${l})`, color: `var(--uc-fg-${f})` }}>
                  가나다 Aa {r.toFixed(2)} {f !== 'disabled' && (r >= 4.5 ? '✓' : '✗')}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const VARS = [
  '--uc-color-background',
  ...FAMILIES.flatMap((f) => STEPS.map((s) => `--uc-color-${f}-${s}`)),
  ...FG.map((f) => `--uc-fg-${f}`),
  ...LAYERS.map((l) => `--uc-${l}`),
  ...TONES.flatMap((t) => [`--uc-fg-on-${t}`, ...['solid', 'solid-hover', 'solid-pressed', 'weak', 'weak-hover'].map((s) => `--uc-bg-${t}-${s}`)]),
]

function ColorPage({ globals }: { globals: Record<string, unknown> }) {
  const v = useCssVars(VARS, globals)
  return (
    <div>
      <Section title="팔레트" desc="단계 번호 = 배경 대비. 숫자는 지금 배경과의 실제 대비. 50 이상은 글자로 써도 4.5 이상">
        <Palette v={v} />
      </Section>
      <Section title="배경 · 테두리">
        <div className="flex flex-wrap gap-3">
          {['bg-layer-1', 'bg-layer-2', 'bg-layer-3', 'bg-overlay', 'stroke-default', 'stroke-strong', 'stroke-focus', 'stroke-danger'].map((n) => (
            <Swatch key={n} name={n} v={v} />
          ))}
        </div>
      </Section>
      <Section title="tone" desc="solid 위 글자는 fg-on-*, weak 위 글자는 fg-*. 숫자는 글자 대비">
        <Tones v={v} />
      </Section>
      <Section title="글자 대비표" desc="fg-disabled는 비활성 표시 전용이라 기준에서 뺀다. 전체 조합 검사는 npm run check:contrast">
        <ContrastTable v={v} />
      </Section>
    </div>
  )
}

const meta: Meta = { title: '기초/색' }
export default meta
export const 색: StoryObj = { render: (_, { globals }) => <ColorPage globals={globals} /> }
