/**
 * 다른 프로젝트에 디자인 시스템 파일을 복사한다 (원칙 9 — 코드 복사형 배포).
 *   npm run copy-to -- ../my-app          웹 (React + Tailwind v4)
 *   npm run copy-to -- ../MyApp --swift   iOS (UCColor.swift만)
 * 이미 있는 파일은 덮어쓴다. 받는 쪽에서 고친 컴포넌트가 있으면 git diff로 확인할 것.
 */
import { cpSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const [target, ...flags] = process.argv.slice(2)
if (!target || !existsSync(target) || !statSync(target).isDirectory()) {
  console.error('사용법: npm run copy-to -- <프로젝트 폴더> [--swift]')
  process.exit(1)
}
const dest = resolve(target)

const WEB = [
  'src/styles/tokens.css',
  'src/styles/tokens.theme.css',
  'src/styles/shadcn.css',
  'src/styles/globals.css',
  'src/components/ui',
  'src/lib/utils.ts',
  'DESIGN.md',
  'AGENTS.md',
  '.claude/skills/uc-ui',
  'eslint.config.js',
]
const SWIFT = [['dist/swift/UCColor.swift', 'UCColor.swift']]

const files: [string, string][] = flags.includes('--swift') ? (SWIFT as [string, string][]) : WEB.map((f) => [f, f])
for (const [from, to] of files) {
  const out = join(dest, to)
  if (existsSync(out)) console.log('  덮어씀', to)
  mkdirSync(dirname(out), { recursive: true })
  cpSync(join(ROOT, from), out, { recursive: true })
  console.log('✓', to)
}
console.log(`\n${dest}에 복사했어요. 처음이면 README의 '다른 프로젝트에 붙이기'를 따라 하세요.`)
