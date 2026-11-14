# 결정 기록

> 새 결정은 아래에 추가. 바뀐 결정은 지우지 말고 새 줄로 남긴다.

| 날짜 | 결정 | 이유 |
|---|---|---|
| 2026-11-13 | 방향 = 읽고 → 만들기. 읽기 · 시작 도구 · 만들기 · AI 연동을 하나의 흐름으로 | 메모가 "DS 문서 읽어보기"뿐이라 공부·제작 둘 다로 해석 |
| 2026-11-13 | 웹 + iOS, 개인용 | iOS 앱들과 토큰 공유 |
| 2026-11-13 | 디자인 시스템 11개 읽기 (Material 3, Apple HIG, Atlassian, Primer, Fluent 2, Carbon, shadcn/ui, Polaris, 당근 SEED, 토스 TDS, KRDS) | 유명 DS 13개 지도에서 선택. Ant Design·GOV.UK 제외 |
| 2026-11-13 | 컴포넌트 베이스 = shadcn/ui | 코드 소유, 접근성, AI 친화 |
| 2026-11-13 | iOS는 토큰만 공유 (컴포넌트는 SwiftUI 기본) | 범위 줄이기 |
| 2026-11-13 | URL → 테마 추출기는 CSS 파싱 방식 | 실제 값 추출 |
| (plan.md) | 레퍼런스 = shadcn/ui 커스텀 사례 + Vercel Geist DESIGN.md | 처음 계획 |
| (plan.md) | 첫 활용처 = 사진 포트폴리오 | 처음 계획 |
| 2026-11-14 | 원칙 12개 전부 채택 + 운영 원칙 4개 | [02-principles](02-principles.md) |
| 2026-11-14 | 테마 2개(neutral · paper) 동시에 시작 | 테마만으로 무드 차이를 감당하는지 처음부터 확인 |
| 2026-11-14 | 1차 컴포넌트 = Button, Input, Card, Badge, Dialog | 토큰·문서 흐름 먼저 완성 |
| 2026-11-14 | 저장소 = **단일 패키지로 시작**, 필요할 때 workspace | plan.md("작게 시작")와 구체화안(처음부터 workspace)이 달라서 문답으로 정함 |
| 2026-11-14 | 토큰 원본 = **DTCG JSON 한 소스** (CSS 출력은 OKLCH) | plan.md(CSS 직접 작성)와 달라서 문답. iOS 공유에 필요 |
| 2026-11-14 | AI 문서 = **DESIGN.md + AGENTS.md·스킬 + lint 둘 다** | plan.md(DESIGN.md)와 구체화안(AGENTS.md+스킬)을 합침. DESIGN.md 단독은 토큰 비효율(Atlassian) |
| 2026-11-14 | 첫 적용 = **Storybook에서 먼저 완성 → 포트폴리오** | 두 계획을 순서로 합침 |
| 2026-11-14 | 문서는 Storybook 먼저, Next.js 문서 사이트는 workspace 전환 때 | 단일 패키지로 시작하기로 해서 |
| 2026-11-14 | idea_bank의 05 구체화 문서·읽기 노트를 이 저장소로 옮김, plan.md는 docs/로 나눠 합침 | 디자인 시스템 자료를 한곳에 |
