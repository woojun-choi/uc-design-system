# 조사 — 디자인 시스템 11개 읽기 노트

> 2026-11-13 조사. 각 노트의 세부·출처는 `systems/` 개별 파일 참고. 미확인 항목은 노트에 표시.
> - 업계 흐름·도구·유명 DS 13개 지도: [landscape.md](landscape.md)
> - 노트 양식: [_TEMPLATE.md](_TEMPLATE.md)
> - 아래 원칙 초안은 2026-11-14 **전부 채택** → [docs/02-principles.md](../docs/02-principles.md)

## 한눈에 비교
| DS | 토큰 계층 · 네이밍 예 | 테마 | 웹 + iOS | AI 연동 | 라이선스 |
|---|---|---|---|---|---|
| [Material 3](systems/material-3.md) | ref → sys → comp · `--md-sys-color-on-primary-container` | seed 색 1개 → HCT 톤 팔레트 → light/dark/contrast 자동 생성 | 색 유틸은 Swift 있음, iOS 컴포넌트 없음 | llms.txt·MCP 없음, 사이트 JS 렌더라 읽기 어려움 | 오픈 |
| [Apple HIG](systems/apple-hig.md) | 토큰 파일 없음 · `label`, `secondarySystemBackground` | 색마다 light/dark × 일반/고대비, dark에 base/elevated | iOS 원본 | llms.txt 없음, 비공식 DocC JSON | 가이드 |
| [Fluent 2](systems/fluent-2.md) | global → alias · `colorBrandBackgroundHover` | 16단계 브랜드 램프 → light/dark 테마 함수 | **가장 잘 공유** (같은 이름으로 iOS `FluentTheme`) | Blazor MCP만 | MIT |
| [Atlassian](systems/atlassian.md) | `color.background.danger.bold` → `--ds-*` | 토큰 마이그레이션으로 다크모드 | iOS 공개 출력 없음 | ADS MCP, llms.txt. **DESIGN.md 실험: MCP 대비 토큰 ~92%↑** | 일부 오픈 |
| [Primer](systems/primer.md) | base → functional → component · `bgColor-accent-emphasis` | 9개 테마, DTCG JSON5 + Style Dictionary | iOS는 수작업 | `@primer/mcp`, 토큰 패키지에 LLM용 가이드·Hallucination Guard | MIT |
| [Carbon](systems/carbon.md) | 역할명 · `$layer-01`, `$text-on-color` | White/g10/g90/g100, layer 깊이 모델 | iOS 디자인 키트만 | 호스팅 MCP, Claude 스킬, llms.txt | Apache-2.0 |
| [shadcn/ui](systems/shadcn-ui.md) | `--primary` / `--primary-foreground` 쌍, OKLCH 약 20개 | `.dark` 덮어쓰기, `--radius` 하나로 파생 | 웹 전용 | **llms.txt + MCP + 스킬, 개인 registry** | MIT |
| [Polaris](systems/polaris.md) | `color-bg-fill-brand-hover`, `space-400` | 앱 브랜딩 의도적 불허 | — | Shopify Dev MCP | React판 아카이브(2026-09), 웹 컴포넌트로 이전 |
| [당근 SEED](systems/seed.md) | `$color.bg.brand-solid` (YAML, 모드 내장) | light/dark + 모션 감소 + 뷰포트 모드 | 네이티브 코드 비공개 | **llms.txt, docs MCP, Figma MCP, CLI, 스킬, AGENTS.md** | Apache-2.0 |
| [토스 TDS](systems/toss-tds.md) | `adaptive.grey900`, OKLCH, Tokens Studio + Style Dictionary | adaptive 토큰으로 light/dark | web·RN·iOS·Android·SDUI 빌드 | 앱인토스 Claude Code 플러그인 | **앱인토스 외 사용 금지 → 아이디어만** |
| [KRDS](systems/krds.md) | primitive → semantic → component · `--krds-light-color-text-secondary` | light / **고대비 모드**(테두리도 굵게), PC/모바일 모드 | 웹 전용 | 없음 | 불명확, 정부 상징 사용 불가 |

## 공통 패턴 (11개 중 다수가 하는 것)
1. **3계층 토큰**: 원시값 → 의미(semantic) → 컴포넌트. 컴포넌트는 의미 토큰만 참조.
2. **배경-전경 쌍**: `on-primary`(M3), `primary-foreground`(shadcn), `on-*-solid`(SEED), `text-on-color`(Carbon) — 배경 색마다 그 위 글자 색이 짝으로 있음.
3. **한 소스 → 여러 플랫폼**: DTCG/YAML JSON 한 벌 → Style Dictionary 등으로 CSS·Swift·Figma 생성 (Fluent·TDS·Primer·SEED).
4. **모드 = 같은 키, 다른 값**: light/dark/고대비/모션 감소/뷰포트를 토큰 모드로.
5. **AI 레이어는 MCP·스킬·llms.txt 쪽으로 수렴**, DESIGN.md 단독은 비효율(Atlassian). Primer·SEED는 토큰 패키지 안에 에이전트용 규칙 파일을 둠.

## 원칙 초안과 출처 (노트의 "가져올 것"에서 추림, 전부 채택)
| # | 원칙 | 출처 |
|---|---|---|
| 1 | 토큰 한 소스(DTCG JSON) → CSS 변수 + Tailwind + Swift 자동 생성 | Fluent, TDS, SEED |
| 2 | 색 네이밍: `fg/bg/stroke` × 역할 × `solid/weak` + 상태 접미사(`-hover`, `-pressed`), 모든 배경에 `on-` 짝 | SEED, M3, Fluent, shadcn |
| 3 | 브랜드 색 1개(seed) → 팔레트·light/dark 자동 생성 → 프로젝트별 테마 교체가 쉬움 | M3, Fluent |
| 4 | 단계 번호 = 대비 보장 (예: 50 이상은 흰 배경에서 4.5:1) | KRDS |
| 5 | 배경 깊이는 3단계 layer, iOS `systemBackground` 레벨과 1:1 매핑 | Carbon, HIG |
| 6 | 타이포는 Dynamic Type 스타일 이름 + 큰 글씨 배율표 | HIG, TDS |
| 7 | 모드: light / dark / 고대비 (고대비에선 테두리도 굵게) | KRDS, HIG |
| 8 | 컴포넌트 props는 `variant`(강조) / `tone`(의미) 분리 | Polaris, TDS |
| 9 | 컴포넌트는 shadcn처럼 코드 복사형, 내 registry(`@me`)로 배포 | shadcn |
| 10 | AI 레이어: llms.txt + AGENTS.md("하드코딩 전 토큰 확인", 목록 밖 토큰 금지) + 스킬/MCP. lint로 하드코딩 차단 | Primer, SEED, Atlassian |
| 11 | 컴포넌트 문서 1장 = 사용 시점 / Do·Don't / 접근성(검증 체크리스트) / 코드 / 변경 이력 | Carbon, KRDS |
| 12 | UX 문구 규칙 1장 (해요체, 동사로 시작하는 버튼, 같은 동작엔 같은 단어, 에러는 원인+해결) | Polaris, TDS |
