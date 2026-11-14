/**
 * 토큰 빌드 (docs/03-architecture.md "토큰 흐름")
 *
 * tokens/themes/*.json (seed) ─ Leonardo ─→ color.* 팔레트 (모드 × 대비마다)
 *   + tokens/primitive, tokens/semantic, tokens/modes (덮어쓰기)
 *   └─ Style Dictionary
 *        ├─ src/styles/tokens.css         --uc-* CSS 변수 (OKLCH), 테마 × 모드 × 대비
 *        ├─ src/styles/tokens.theme.css   Tailwind v4 @theme
 *        ├─ dist/tokens.json              조합별 최종 값 (대비 검사·다른 도구용)
 *        └─ dist/swift/UCColor.swift      SwiftUI, 다크·고대비 자동 전환
 *
 * 생성 파일은 직접 고치지 않는다. tokens/만 고친다.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import StyleDictionary from 'style-dictionary'
import { formatHex8, oklch, parse } from 'culori'
import { CONTRAST_MORE, generatePalette, type Contrast, type Mode } from '../src/lib/palette'

const ROOT = join(import.meta.dirname, '..')
const MODES: Mode[] = ['light', 'dark']
const CONTRASTS: Contrast[] = ['standard', 'more']
const DEFAULT_THEME = 'neutral'
const HEADER = '자동 생성 — 직접 고치지 마세요. 원본: tokens/ → npm run tokens'

type Json = Record<string, any>
type Combo = `${Mode}-${Contrast}`
const readJson = (p: string): Json => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const readDir = (dir: string) =>
  merge(...readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.json')).map((f) => readJson(join(dir, f))))
const readOpt = (p: string) => (existsSync(join(ROOT, p)) ? readJson(p) : {})

function merge(...objs: Json[]): Json {
  const out: Json = {}
  for (const o of objs)
    for (const [k, v] of Object.entries(o))
      out[k] = v && typeof v === 'object' && !Array.isArray(v) && out[k] ? merge(out[k], v) : v
  return out
}

// ── 색 → OKLCH 문자열 ─────────────────────────────────
const r = (n: number | undefined, d: number) => Number((n ?? 0).toFixed(d))
function toOklch(color: string): string {
  const c = oklch(parse(color))
  if (!c) throw new Error(`색을 읽을 수 없음: ${color}`)
  const a = c.alpha !== undefined && c.alpha < 1 ? ` / ${r(c.alpha, 3)}` : ''
  return `oklch(${r(c.l, 4)} ${r(c.c, 4)} ${r(c.h, 2)}${a})`
}

StyleDictionary.registerTransform({
  name: 'uc/color/oklch',
  type: 'value',
  transitive: true,
  filter: (t) => t.$type === 'color',
  transform: (t) => toOklch(t.$value),
})

// ── 테마 × 모드 × 대비별 토큰 트리 ─────────────────────
const base = readJson('tokens/themes/_base.json')
const themes = readdirSync(join(ROOT, 'tokens/themes'))
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .map((f) => ({ name: basename(f, '.json'), json: merge(base, readJson(join('tokens/themes', f))) }))
  .sort((a, b) => (a.name === DEFAULT_THEME ? -1 : b.name === DEFAULT_THEME ? 1 : a.name.localeCompare(b.name)))

const primitive = readDir('tokens/primitive')
const semantic = readDir('tokens/semantic')

function tokensFor(theme: Json, mode: Mode, contrast: Contrast): Json {
  const { seed, $description, modes = {}, ...overrides } = theme
  const { gray, lightness, $description: _, ...colorSeeds } = seed
  const palette = generatePalette({
    gray: gray.$value,
    colors: Object.fromEntries(Object.entries(colorSeeds).map(([k, v]) => [k, (v as Json).$value])),
    lightness: lightness.$value[mode],
    contrast: contrast === 'more' ? CONTRAST_MORE : 1,
  })
  const steps = (s: Record<string, string>) => Object.fromEntries(Object.entries(s).map(([k, v]) => [k, { $value: v }]))
  const paletteTokens = {
    color: {
      $type: 'color',
      background: { $value: palette.background },
      ...Object.fromEntries(Object.entries(palette.scales).map(([k, v]) => [k, steps(v)])),
    },
  }
  const more = contrast === 'more'
  return merge(
    primitive,
    paletteTokens,
    semantic,
    overrides,
    mode === 'dark' ? readOpt('tokens/modes/dark.json') : {},
    more ? readOpt('tokens/modes/contrast-more.json') : {},
    mode === 'dark' && more ? readOpt('tokens/modes/dark.contrast-more.json') : {},
    modes[mode] ?? {},
  )
}

// ── 빌드 ────────────────────────────────────────────
/** css[theme][combo] = 변수 선언 본문 */
const cssBody: Record<string, Record<string, string>> = {}
/** resolved[theme][combo][--uc-name] = 최종 값 (색은 #rrggbbaa) */
const resolved: Record<string, Record<string, Record<string, string | number>>> = {}
/** swift[theme][camelName][combo] = #rrggbbaa */
const swift: Record<string, Record<string, Partial<Record<Combo, string>>>> = {}
let varNames: string[] = []

for (const { name: themeName, json } of themes) {
  cssBody[themeName] = {}
  resolved[themeName] = {}
  swift[themeName] = {}
  for (const mode of MODES)
    for (const contrast of CONTRASTS) {
      const combo: Combo = `${mode}-${contrast}`
      const sd = new StyleDictionary({
        tokens: tokensFor(json, mode, contrast),
        log: { verbosity: 'silent', warnings: 'disabled' },
        platforms: {
          css: {
            prefix: 'uc',
            transforms: ['name/kebab', 'uc/color/oklch', 'fontFamily/css', 'cubicBezier/css'],
            files: [{ destination: 'x', format: 'css/variables', options: { outputReferences: true, showFileHeader: false, selector: '@@' } }],
          },
          raw: { prefix: 'uc', transforms: ['name/kebab', 'fontFamily/css', 'cubicBezier/css'] },
          swift: { transforms: ['name/camel'] },
        },
      })

      const [css] = await sd.formatPlatform('css')
      cssBody[themeName][combo] = String(css.output).replace(/^@@ \{\n/, '').replace(/\n\}\s*$/, '')

      const { allTokens: raw } = await sd.getPlatformTokens('raw')
      resolved[themeName][combo] = Object.fromEntries(
        raw.map((t) => [`--${t.name}`, t.$type === 'color' ? formatHex8(parse(t.$value))! : t.$value]),
      )
      if (themeName === DEFAULT_THEME && combo === 'light-standard') varNames = raw.map((t) => t.name)

      const { allTokens } = await sd.getPlatformTokens('swift')
      for (const t of allTokens)
        if (t.$type === 'color' && ['bg', 'fg', 'stroke'].includes(t.path[0]))
          (swift[themeName][t.name] ??= {})[combo] = formatHex8(parse(t.$value))
    }
}

// ── tokens.css ───────────────────────────────────────
// 모든 규칙은 명시도 (0,2,0)로 맞추고 순서로 우선순위를 정한다.
// 속성(data-uc-mode / data-uc-contrast)이 있으면 그걸, 없으면 시스템 설정을 따른다.
const A = { mode: 'data-uc-mode', contrast: 'data-uc-contrast', theme: 'data-uc-theme' }
const notDark = `:not([${A.mode}="dark"])`, dark = `[${A.mode}="dark"]`, noMode = `:not([${A.mode}])`
const notMore = `:not([${A.contrast}="more"])`, more = `[${A.contrast}="more"]`, noContrast = `:not([${A.contrast}])`
const MQ_DARK = '(prefers-color-scheme: dark)', MQ_MORE = '(prefers-contrast: more)'
const RULES: { combo: Combo; sel: string; media?: string }[] = [
  { combo: 'light-standard', sel: notDark + notMore },
  { combo: 'dark-standard', sel: dark + notMore },
  { combo: 'dark-standard', sel: noMode + notMore, media: MQ_DARK },
  { combo: 'light-more', sel: notDark + more },
  { combo: 'dark-more', sel: dark + more },
  { combo: 'dark-more', sel: noMode + more, media: MQ_DARK },
  { combo: 'light-more', sel: notDark + noContrast, media: MQ_MORE },
  { combo: 'dark-more', sel: dark + noContrast, media: MQ_MORE },
  { combo: 'dark-more', sel: noMode + noContrast, media: `${MQ_DARK} and ${MQ_MORE}` },
]
const themeSel = (t: string) =>
  t === DEFAULT_THEME ? `:where(:root:not([${A.theme}]), [${A.theme}="${t}"])` : `:where([${A.theme}="${t}"])`

const cssBlocks: string[] = []
for (const { name } of themes)
  for (const { combo, sel, media } of RULES) {
    const rule = `${themeSel(name)}${sel} {\n${cssBody[name][combo]}\n}`
    const label = `/* ${name} · ${combo}${media ? ` · 시스템 ${media}` : ''} */`
    cssBlocks.push(media ? `${label}\n@media ${media} {\n${rule}\n}` : `${label}\n${rule}`)
  }
const durations = varNames.filter((n) => n.startsWith('uc-duration-'))
cssBlocks.push(
  `/* 모션 줄이기 */\n@media (prefers-reduced-motion: reduce) {\n  :root, [${A.theme}] {\n${durations.map((n) => `    --${n}: 0ms !important;`).join('\n')}\n  }\n}`,
)
write(
  'src/styles/tokens.css',
  `/* ${HEADER} */
/* <html data-uc-theme="neutral|paper" data-uc-mode="light|dark" data-uc-contrast="standard|more">
   mode·contrast 속성이 없으면 시스템 설정(prefers-color-scheme, prefers-contrast)을 따른다. */

${cssBlocks.join('\n\n')}
`,
)

// ── tokens.theme.css — Tailwind v4 ───────────────────
// 기본 팔레트·글자 크기·그림자를 지워서 bg-blue-500, text-sm 같은 하드코딩을 막는다 (원칙 1)
const tw: string[] = [
  '  --color-*: initial;',
  '  --text-*: initial;',
  '  --font-*: initial;',
  '  --font-weight-*: initial;',
  '  --radius-*: initial;',
  '  --shadow-*: initial;',
  '  --ease-*: initial;',
  '  --container-*: initial;',
  '  --color-transparent: transparent;',
  '  --color-current: currentColor;',
  '  --spacing: var(--uc-space-1);',
  '  --default-font-family: var(--uc-font-family-sans);',
  '  --default-border-width: var(--uc-stroke-width-default);',
  '  --default-outline-width: var(--uc-stroke-width-focus);',
  '  --default-ring-width: var(--uc-stroke-width-focus);',
  '  --default-transition-duration: var(--uc-duration-normal);',
  '  --default-transition-timing-function: var(--uc-easing-standard);',
]
const twMap: [RegExp, (m: RegExpMatchArray) => string[]][] = [
  [/^uc-bg-(.+)$/, (m) => [`--background-color-${m[1]}`]],
  [/^uc-fg-(.+)$/, (m) => [`--text-color-${m[1]}`]],
  [/^uc-stroke-width-/, () => []],
  [/^uc-stroke-(.+)$/, (m) => [`--border-color-${m[1]}`, `--outline-color-${m[1]}`, `--ring-color-${m[1]}`]],
  [/^uc-radius-(.+)$/, (m) => [`--radius-${m[1]}`]],
  [/^uc-shadow-(.+)$/, (m) => [`--shadow-${m[1]}`]],
  [/^uc-font-family-(.+)$/, (m) => [`--font-${m[1]}`]],
  [/^uc-font-weight-(.+)$/, (m) => [`--font-weight-${m[1]}`]],
  [/^uc-text-(.+)-size$/, (m) => [`--text-${m[1]}`]],
  [/^uc-text-(.+)-line-height$/, (m) => [`--text-${m[1]}--line-height`]],
  [/^uc-text-(.+)-weight$/, (m) => [`--text-${m[1]}--font-weight`]],
  [/^uc-easing-(.+)$/, (m) => [`--ease-${m[1]}`]],
  [/^uc-container-(.+)$/, (m) => [`--container-${m[1]}`]],
]
for (const v of varNames)
  for (const [re, f] of twMap) {
    const m = v.match(re)
    if (m) {
      for (const ns of f(m)) tw.push(`  ${ns}: var(--${v});`)
      break
    }
  }
write('src/styles/tokens.theme.css', `/* ${HEADER} */\n@theme inline {\n${tw.join('\n')}\n}\n`)

// ── dist/tokens.json ─────────────────────────────────
write('dist/tokens.json', JSON.stringify({ $description: HEADER, themes: resolved }, null, 2) + '\n')

// ── UCColor.swift ────────────────────────────────────
const hex = (h: string) => '0x' + h.slice(1).toUpperCase()
const names = Object.keys(swift[DEFAULT_THEME])
const swiftOut = `// ${HEADER}
import SwiftUI
import UIKit

/// 테마 하나의 semantic 색. 다크 모드·대비 높이기 설정을 따라 자동 전환된다.
public struct UCColors: Sendable {
${names.map((n) => `    public let ${n}: Color`).join('\n')}
}

extension UCColors {
${themes
  .map(({ name }) => {
    const c = swift[name]
    return `    public static let ${name} = UCColors(
${names
  .map((n) => `        ${n}: .uc(${hex(c[n]['light-standard']!)}, ${hex(c[n]['dark-standard']!)}, ${hex(c[n]['light-more']!)}, ${hex(c[n]['dark-more']!)})`)
  .join(',\n')}
    )`
  })
  .join('\n\n')}
}

extension Color {
    /// 값은 0xRRGGBBAA. 순서: 라이트, 다크, 라이트 고대비, 다크 고대비
    static func uc(_ light: UInt32, _ dark: UInt32, _ lightHC: UInt32, _ darkHC: UInt32) -> Color {
        Color(uiColor: UIColor { t in
            let hc = t.accessibilityContrast == .high
            switch (t.userInterfaceStyle == .dark, hc) {
            case (false, false): return .ucHex(light)
            case (true, false): return .ucHex(dark)
            case (false, true): return .ucHex(lightHC)
            case (true, true): return .ucHex(darkHC)
            }
        })
    }
}

private extension UIColor {
    static func ucHex(_ v: UInt32) -> UIColor {
        UIColor(
            red: CGFloat((v >> 24) & 0xFF) / 255,
            green: CGFloat((v >> 16) & 0xFF) / 255,
            blue: CGFloat((v >> 8) & 0xFF) / 255,
            alpha: CGFloat(v & 0xFF) / 255
        )
    }
}
`
write('dist/swift/UCColor.swift', swiftOut)

function write(rel: string, content: string) {
  const p = join(ROOT, rel)
  mkdirSync(join(p, '..'), { recursive: true })
  writeFileSync(p, content)
  console.log('✓', rel)
}
