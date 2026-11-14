/**
 * 대비 자동 검사 — dist/tokens.json의 모든 테마 × 모드 × 대비 조합에서
 * fg × bg 짝이 기준을 넘는지 본다. 하나라도 못 넘으면 exit 1.
 * 글자 4.5 (WCAG AA), UI 경계 3 (WCAG 1.4.11)
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse, wcagContrast } from 'culori'

const ROOT = join(import.meta.dirname, '..')
const { themes } = JSON.parse(readFileSync(join(ROOT, 'dist/tokens.json'), 'utf8')) as {
  themes: Record<string, Record<string, Record<string, string>>>
}

const TONES = ['neutral', 'brand', 'danger', 'success', 'warning', 'info']
const LAYERS = ['bg-layer-1', 'bg-layer-2', 'bg-layer-3']
type Pair = [fg: string, bg: string, min: number]
const pairs: Pair[] = []
for (const l of LAYERS) {
  for (const f of ['default', 'muted', 'subtle', ...TONES]) pairs.push([`fg-${f}`, l, 4.5])
  for (const s of ['strong', 'focus', 'danger']) pairs.push([`stroke-${s}`, l, 3])
}
for (const t of TONES) {
  for (const s of ['solid', 'solid-hover', 'solid-pressed']) pairs.push([`fg-on-${t}`, `bg-${t}-${s}`, 4.5])
  for (const s of ['weak', 'weak-hover']) pairs.push([`fg-${t}`, `bg-${t}-${s}`, 4.5])
  // Alert: 연한 tone 배경 위 본문
  for (const f of ['default', 'muted']) pairs.push([`fg-${f}`, `bg-${t}-weak`, 4.5])
}

let fails = 0
for (const [theme, combos] of Object.entries(themes))
  for (const [combo, v] of Object.entries(combos)) {
    const bad = pairs
      .map(([f, b, min]) => ({ f, b, min, ratio: wcagContrast(parse(v[`--uc-${f}`])!, parse(v[`--uc-${b}`])!) }))
      .filter((x) => x.ratio < x.min)
    const label = `${theme} · ${combo}`.padEnd(24)
    if (!bad.length) console.log(`✓ ${label} ${pairs.length}쌍 통과`)
    else {
      fails += bad.length
      console.log(`✗ ${label} ${bad.length}쌍 미달`)
      for (const x of bad) console.log(`    ${x.f} / ${x.b}: ${x.ratio.toFixed(2)} (기준 ${x.min})`)
    }
  }
if (fails) {
  console.error(`\n대비 미달 ${fails}쌍. tokens/semantic 또는 tokens/modes에서 단계를 고치세요.`)
  process.exit(1)
}
