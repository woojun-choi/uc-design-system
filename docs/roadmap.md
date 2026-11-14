# 로드맵

> 기존 plan.md의 Phase 1~5와 idea_bank 구체화(M0~M4)를 합친 것. 2026-11-14.

| 단계 | 이름 | 완료 기준 |
|---|---|---|
| **M0** ✅ | 스파이크 | seed 색 하나 바꾸면 CSS · Tailwind · Swift 출력이 다 바뀐다 |
| **M1** ✅ | 기초 토큰 + DESIGN.md 초안 | 테마 2 × 모드 3을 Storybook에서 토글로 보고, 대비 자동 검사 통과 |
| **M2** ✅ | 핵심 컴포넌트 5개 | 5개 × variant × tone 스토리 완성, 키보드·포커스 확인 |
| **M3** ✅ | AI 레이어 | AI에게 카드 화면을 시켰을 때 하드코딩 값 0개 |
| **M4** ▶ | 문서 정리 · 배포 | Storybook 배포, 문서만 보고 다른 프로젝트에 붙일 수 있다 |
| M5 | 실전 적용 | 포트폴리오에 적용, 부족한 토큰·컴포넌트 보강 |

## M0 — 스파이크
> 2026-11-14 완료. seed 하나 바꾸면 `tokens.css`·`UCColor.swift` 값이 바뀌고, Tailwind는 `var(--uc-*)`를 가리켜서 따라 바뀐다. Swift는 iOS SDK로 타입 검사 통과.

- [x] 프로젝트 셋업: Vite + React 19 + TS + Tailwind v4 + Storybook 10 (npm)
- [x] `tokens/` DTCG JSON 뼈대 (gray·brand 2계열만)
- [x] Leonardo로 seed 색 → 11단계 팔레트 (`src/lib/palette.ts`, 목표 대비 ±5% 안)
- [x] Style Dictionary → `tokens.css`(OKLCH) · Tailwind `@theme` · `UCColor.swift` (`npm run tokens`)
- [x] seed 후보 비교 스토리 (`기초/seed 후보`) → neutral `#3e63dd`, paper `#9c4a2f` 확정
- [x] 덤: 테마 · 모드(light/dark) 툴바, `기초/팔레트` 스토리

## M1 — 기초 토큰
> 2026-11-14 완료. 테마 2 × 모드 2 × 대비 2 = 8조합 모두 대비 검사 통과 (M2에서 neutral tone 추가 후 66쌍).

- [x] semantic 토큰 전체 (색·글자·간격·모서리·그림자·모션·컨테이너)
- [x] 고대비 — 모드와 별도 축(`data-uc-contrast`)으로, 라이트·다크 둘 다
- [x] 색 계열 red · green · yellow · blue + tone 5개(brand/danger/success/warning/info)
- [x] 속성이 없으면 시스템 설정(다크·대비·모션 줄이기) 따르기
- [x] `src/styles/shadcn.css`: shadcn 변수 ↔ uc 토큰 연결
- [x] Storybook 툴바: 테마 · 모드(시스템/라이트/다크) · 대비(시스템/기본/고대비)
- [x] Storybook 기초 페이지: 색(팔레트·tone·대비표), 글자, 간격과 모양
- [x] 대비 자동 검사 `npm run check:contrast` (`npm run tokens`에 포함, 미달이면 실패)
- [x] Swift: 다크·고대비 4가지 자동 전환
- [x] DESIGN.md 1~3장 초안

## M2 — 핵심 컴포넌트
> 2026-11-14 완료. 스토리 16개 × 8조합 axe 검사 위반 0, Dialog 키보드(포커스 가두기·Esc·포커스 복귀) 확인.

- [x] Button · Input · Card · Badge · Dialog ([05-components](05-components.md))
- [x] neutral tone 토큰 추가 (`bg.neutral.*`, `fg.neutral`, `fg.on-neutral`)
- [x] 컴포넌트마다 문서 1장 형식 (MDX: 언제 쓰나 · Do/Don't · 접근성 · 코드 · 변경 이력)
- [x] 접근성 애드온(`@storybook/addon-a11y`) 통과
- [x] DESIGN.md 4장(컴포넌트 규격)
- [ ] 다크 모드 weak 배경(남색) 판단 — 아래 열린 질문

## M3 — AI 레이어
> 2026-11-15 완료. 규칙을 모르는 에이전트 2개가 문서만 보고 만든 화면에서 첫 초안 lint 에러 0.

- [x] DESIGN.md 완성 (5~9장)
- [x] AGENTS.md · Claude Code 스킬(`uc-ui`) · llms.txt
- [x] lint: 토큰에 없는 클래스, 임의 값, hex·색 함수, style 숫자 금지 (`npm run lint`)
- [x] AI 테스트 — 화면 2개, 첫 초안 하드코딩 0 ([06-ai-layer](06-ai-layer.md#검증-결과-m3-2026-11-15))

## M4 — 문서 정리 · 배포
- [ ] UX 문구 규칙 페이지
- [ ] README 사용법 정비
- [ ] Storybook 배포 (Vercel 또는 GitHub Pages)
- [ ] 2차 컴포넌트: **Textarea · Alert(알림)부터** (AI 테스트에서 빠져서 짐작함), 그다음 Separator, Select, Sheet, Tooltip

## M5 — 실전 적용
- [ ] 사진 포트폴리오에 적용 → 3차 컴포넌트(Figure, Gallery Grid, Lightbox, 내비게이션)
- [ ] 이때 workspace 전환 여부 판단 ([03-architecture](03-architecture.md#나중에-나눌-때-workspace-전환-조건))
- [ ] 안정되면 Next.js 문서 사이트 + shadcn 레지스트리
- [ ] 이후 다른 사이드 프로젝트(감시 뽀모도로 iOS는 Swift 토큰만)
