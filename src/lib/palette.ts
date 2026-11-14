/**
 * seed 색 → 대비 단계 팔레트 (원칙 3·4).
 * 단계 번호 = 배경 대비. 50 이상은 배경 위 글자로 4.5:1 이상.
 * Node(빌드 스크립트)와 브라우저(Storybook) 양쪽에서 쓴다.
 */
import { BackgroundColor, Color, Theme } from '@adobe/leonardo-contrast-colors'
import { clampChroma, formatHex, oklch } from 'culori'

export const STEPS = [5, 10, 20, 30, 40, 45, 50, 60, 70, 80, 90, 95] as const
export type Step = (typeof STEPS)[number]

/** 단계별 목표 대비 (docs/04-tokens.md §2, §9) */
export const RATIOS: Record<Step, number> = {
  5: 1.05, 10: 1.15, 20: 1.3, 30: 1.6, 40: 2.5, 45: 3.5,
  50: 4.5, 60: 6, 70: 8, 80: 11, 90: 15, 95: 18,
}

export type Mode = 'light' | 'dark'
export type Contrast = 'standard' | 'more'

/** 고대비 모드에서 Leonardo contrast 배율 (docs/04-tokens.md §9) */
export const CONTRAST_MORE = 1.4

/**
 * 어두운 배경에서 낮은 단계(5~30)는 Leonardo가 채도를 그대로 둬서 진한 남색·자주색이 된다.
 * weak 배경으로 쓰기에 무거워서 이 단계만 채도를 줄인다 (밝기는 그대로 → 대비 거의 그대로).
 */
const DARK_MUTED_STEPS: Step[] = [5, 10, 20, 30]
const DARK_MAX_CHROMA = 0.045

function muteChroma(hex: string): string {
  const c = oklch(hex)
  if (!c || (c.c ?? 0) <= DARK_MAX_CHROMA) return hex
  return formatHex(clampChroma({ ...c, c: DARK_MAX_CHROMA }, 'oklch'))
}

export interface PaletteInput {
  /** 회색 계열 key 색. 배경도 이 계열에서 나온다 */
  gray: string[]
  /** gray 말고 나머지 계열: brand, red, green … */
  colors: Record<string, string[]>
  /** 배경 밝기 0~100 (Leonardo lightness) */
  lightness: number
  /** 대비 배율. 1 = 기본 */
  contrast?: number
}

export interface Palette {
  background: string
  scales: Record<string, Record<Step, string>>
}

export function generatePalette({ gray, colors, lightness, contrast = 1 }: PaletteInput): Palette {
  const ratios = STEPS.map((s) => RATIOS[s])
  const grayColor = new BackgroundColor({ name: 'gray', colorKeys: gray as never, ratios, colorSpace: 'OKLCH' })
  const others = Object.entries(colors).map(
    ([name, keys]) => new Color({ name, colorKeys: keys as never, ratios, colorSpace: 'OKLCH' }),
  )
  // Leonardo가 내부에서 deprecated 경고를 찍어서 계산하는 동안만 끈다
  const warn = console.warn
  console.warn = () => {}
  let bg: { background: string }, out: { name: string; values: { value: string }[] }[]
  try {
    const theme = new Theme({ colors: [grayColor, ...others], backgroundColor: grayColor, lightness, contrast, output: 'HEX' })
    ;[bg, ...out] = theme.contrastColors as unknown as [typeof bg, ...typeof out]
  } finally {
    console.warn = warn
  }
  const dark = lightness < 50
  const scales = Object.fromEntries(
    out.map((c) => [
      c.name,
      Object.fromEntries(
        STEPS.map((s, i) => {
          const v = c.values[i].value
          return [s, dark && c.name !== 'gray' && DARK_MUTED_STEPS.includes(s) ? muteChroma(v) : v]
        }),
      ) as Record<Step, string>,
    ]),
  )
  return { background: bg.background, scales }
}
