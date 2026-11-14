/**
 * uc 토큰 lint (원칙 1·10) — 하드코딩을 에러로 막는다.
 * 다른 프로젝트에 복사해 쓸 때는 entryPoint만 그 프로젝트의 globals.css로 바꾼다.
 */
import tseslint from 'typescript-eslint'
import tailwind from 'eslint-plugin-better-tailwindcss'

/** 색·간격·크기·글자 유틸리티의 임의 값. var(--uc-*)를 쓰는 경우만 허용 */
const ARBITRARY = String.raw`^(?:.*:)?-?(bg|text|border(-[trblxy])?|outline|ring|fill|stroke|shadow|from|via|to|decoration|caret|accent|p[trblxy]?|m[trblxy]?|gap(-[xy])?|space-[xy]|w|h|size|min-w|max-w|min-h|max-h|inset(-[xy])?|top|right|bottom|left|rounded(-[trbl]{1,2})?|leading|tracking|font|opacity|duration|delay|ease|z)-\[(?!.*var\(--uc-).+\]$`

const HARDCODED = [
  {
    selector: String.raw`Literal[value=/#[0-9a-fA-F]{3,8}\b/]`,
    message: 'hex 색 금지 — semantic 토큰 클래스(bg-layer-1, text-default …)나 var(--uc-*)를 쓰세요. DESIGN.md 2장',
  },
  {
    selector: String.raw`Literal[value=/\b(rgba?|hsla?|oklch|oklab|lab|lch)\(/]`,
    message: '색 함수 금지 — semantic 토큰을 쓰세요. DESIGN.md 2장',
  },
  {
    selector: String.raw`JSXAttribute[name.name='style'] Property > Literal[value=/^-?\d*\.?\d+(px|rem|em)$/]`,
    message: 'style에 직접 쓴 크기 금지 — 간격 클래스(p-4, gap-2)나 var(--uc-space-*)를 쓰세요. DESIGN.md 5장',
  },
  {
    selector: String.raw`JSXAttribute[name.name='style'] Property > Literal[raw=/^\d+$/]`,
    message: 'style에 직접 쓴 숫자 금지 — 토큰 클래스를 쓰세요. DESIGN.md 5장',
  },
]

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'node_modules'] },
  {
    files: ['src/**/*.{ts,tsx}', 'stories/**/*.{ts,tsx}'],
    extends: [tseslint.configs.base],
    plugins: { 'better-tailwindcss': tailwind },
    settings: { 'better-tailwindcss': { entryPoint: 'src/styles/globals.css' } },
    rules: {
      // 토큰에 없는 클래스 = 에러. Tailwind 기본 색·크기(bg-blue-500, text-sm)는 지워져 있어서 여기 걸린다
      'better-tailwindcss/no-unknown-classes': 'error',
      'better-tailwindcss/no-conflicting-classes': 'error',
      'better-tailwindcss/no-restricted-classes': [
        'error',
        { restrict: [{ pattern: ARBITRARY, message: '임의 값 "$0" 금지 — 토큰 클래스를 쓰세요 (DESIGN.md 2·3·5장)' }] },
      ],
      'no-restricted-syntax': ['error', ...HARDCODED],
    },
  },
  {
    // seed 후보 비교 화면은 날것의 색을 보여 주는 게 목적이라 예외
    files: ['stories/SeedCandidates.stories.tsx'],
    rules: { 'no-restricted-syntax': 'off' },
  },
)
