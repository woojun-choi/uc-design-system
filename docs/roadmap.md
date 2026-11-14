# 로드맵

> 기존 plan.md의 Phase 1~5와 idea_bank 구체화(M0~M4)를 합친 것. 2026-11-14.

| 단계 | 이름 | 완료 기준 |
|---|---|---|
| **M0** ▶ | 스파이크 | seed 색 하나 바꾸면 CSS · Tailwind · Swift 출력이 다 바뀐다 |
| M1 | 기초 토큰 + DESIGN.md 초안 | 테마 2 × 모드 3을 Storybook에서 토글로 보고, 대비 자동 검사 통과 |
| M2 | 핵심 컴포넌트 5개 | 5개 × variant × tone 스토리 완성, 키보드·포커스 확인 |
| M3 | AI 레이어 | AI에게 카드 화면을 시켰을 때 하드코딩 값 0개 |
| M4 | 문서 정리 · 배포 | Storybook 배포, 문서만 보고 다른 프로젝트에 붙일 수 있다 |
| M5 | 실전 적용 | 포트폴리오에 적용, 부족한 토큰·컴포넌트 보강 |

## M0 — 스파이크
- [ ] 프로젝트 셋업: Vite + React 19 + TS + Tailwind v4 + Storybook
- [ ] `tokens/` DTCG JSON 뼈대 (gray·brand 2계열만)
- [ ] Leonardo로 seed 색 → 11단계 팔레트 (대비 목표값 [04-tokens](04-tokens.md#2-색-단계--흰-배경-대비-원칙-4))
- [ ] Style Dictionary → `tokens.css`(OKLCH) · Tailwind `@theme` · `UCColor.swift`
- [ ] seed 색 후보 몇 개로 neutral·paper 초안 만들어 보고 고르기

## M1 — 기초 토큰
- [ ] semantic 토큰 전체 (색·글자·간격·모서리·그림자·모션)
- [ ] 라이트 / 다크 / 고대비 생성
- [ ] globals.css에서 shadcn 변수 ↔ uc 토큰 연결
- [ ] Storybook 툴바: 테마 · 모드 토글
- [ ] Storybook "기초" 페이지: 팔레트 + 대비표, 글자 크기, 간격
- [ ] 대비 자동 검사 스크립트 (`fg.*` × `bg.*` 짝)
- [ ] DESIGN.md 1~3장 초안 (병행)

## M2 — 핵심 컴포넌트
- [ ] Button · Input · Card · Badge · Dialog ([05-components](05-components.md))
- [ ] 컴포넌트마다 문서 1장 형식 (MDX)
- [ ] 접근성 애드온 통과
- [ ] DESIGN.md 4장(컴포넌트 규격)

## M3 — AI 레이어
- [ ] DESIGN.md 완성 (5~9장)
- [ ] AGENTS.md · Claude Code 스킬 · llms.txt
- [ ] lint: hex·임의 px 금지 규칙
- [ ] AI 테스트 ([06-ai-layer](06-ai-layer.md#검증-방법))

## M4 — 문서 정리 · 배포
- [ ] UX 문구 규칙 페이지
- [ ] README 사용법 정비
- [ ] Storybook 배포 (Vercel 또는 GitHub Pages)
- [ ] 2차 컴포넌트(Typography, Separator, Textarea, Select, Sheet, Tooltip) 중 필요한 것

## M5 — 실전 적용
- [ ] 사진 포트폴리오에 적용 → 3차 컴포넌트(Figure, Gallery Grid, Lightbox, 내비게이션)
- [ ] 이때 workspace 전환 여부 판단 ([03-architecture](03-architecture.md#나중에-나눌-때-workspace-전환-조건))
- [ ] 안정되면 Next.js 문서 사이트 + shadcn 레지스트리
- [ ] 이후 다른 사이드 프로젝트(감시 뽀모도로 iOS는 Swift 토큰만)
