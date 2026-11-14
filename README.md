# uc-design-system

uzun choi의 개인 디자인 시스템. 사람과 AI가 모두 읽고 따르는 shadcn/ui 기반 토큰 중심 시스템으로, 웹과 iOS 사이드 프로젝트가 같이 쓴다.

> **상태:** 설계 완료, 코드 시작 전. 다음 단계는 **M0 스파이크** (토큰 파이프라인 확인) — [로드맵](docs/roadmap.md)

## 문서 지도
| 문서 | 내용 |
|---|---|
| [01. 개요](docs/01-overview.md) | 왜 만드나, 흐름, 쓰는 곳, 성공 기준 |
| [02. 원칙](docs/02-principles.md) | 원칙 12개 + 운영 원칙 4개 |
| [03. 구조 · 기술 스택](docs/03-architecture.md) | 스택, 폴더 구조, 토큰 빌드 흐름 |
| [04. 토큰 · 테마](docs/04-tokens.md) | 색 단계, semantic 토큰, 글자, 모드, neutral · paper |
| [05. 컴포넌트](docs/05-components.md) | variant/tone API, 1~3차 목록, 문서 형식 |
| [06. AI 레이어](docs/06-ai-layer.md) | DESIGN.md + AGENTS.md + 스킬 + lint |
| [로드맵](docs/roadmap.md) | M0~M5 단계별 체크리스트 |
| [결정 기록](docs/decisions.md) | 언제 무엇을 왜 정했나 |
| [열린 질문](docs/open-questions.md) | 정할 것 · 확인할 것 |
| [조사](research/README.md) | 디자인 시스템 11개 읽기 노트, 업계 흐름 |

## 한눈에
- **토큰:** DTCG JSON 한 소스 → CSS 변수(`--uc-*`, OKLCH) · Tailwind v4 · Swift
- **테마:** neutral(무채색, 사진이 주인공) · paper(미색 종이) × 라이트 / 다크 / 고대비
- **컴포넌트:** shadcn/ui 위에 Button · Input · Card · Badge · Dialog부터
- **AI:** DESIGN.md(원본) + AGENTS.md · 스킬(안내) + lint(강제)
- **쓰는 곳:** Storybook에서 먼저 완성 → 사진 포트폴리오 → 다른 사이드 프로젝트
