# 03. 구조 · 기술 스택

## 기술 스택
| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | React 19 + TypeScript | shadcn/ui 생태계 표준 |
| 스타일 | Tailwind CSS v4 | CSS 변수 기반 `@theme`가 토큰과 1:1로 맞음 |
| 컴포넌트 베이스 | shadcn/ui (Radix) | 접근성 확보 + 코드 소유 |
| 토큰 원본 | **W3C DTCG JSON** | 한 소스에서 웹·iOS 모두 생성 (원칙 1) |
| 토큰 빌드 | Style Dictionary | JSON → CSS 변수 · Tailwind `@theme` · Swift |
| 팔레트 생성 | Leonardo (Adobe) | 목표 대비값으로 단계 색을 만듦 (원칙 4) |
| 색 표기 | OKLCH (CSS 출력) | 다크·테마 전환이 쉽고 shadcn 기본과 같음 |
| 개발·문서 | **Storybook** 먼저 → Next.js 문서 사이트는 나중에 | 작게 시작 |
| 저장소 | **단일 패키지로 시작** → 필요할 때 pnpm workspace | 작게 시작 |
| 배포 | 처음엔 코드 복사 → 안정되면 shadcn 레지스트리 | 원칙 9 |

## 저장소 구조 (단일 패키지)
```
uc-design-system/
├── README.md              # 소개 + 문서 지도
├── DESIGN.md              # AI·사람이 읽는 디자인 규칙 원본 (M1부터)
├── AGENTS.md              # AI 작업 규칙 요약, DESIGN.md를 가리킴 (M3)
├── llms.txt               # AI용 문서 목차 (M3)
├── tokens/                # ★ 토큰 원본 — 여기만 직접 고친다
│   ├── primitive/         #   색 단계·숫자
│   ├── semantic/          #   fg/bg/stroke, 글자, 간격
│   └── themes/            #   neutral.json, paper.json (seed 색 + 덮어쓰기)
├── scripts/
│   └── build-tokens.ts    # Leonardo 팔레트 + Style Dictionary 빌드
├── src/
│   ├── styles/
│   │   ├── tokens.css     #   자동 생성 — 직접 고치지 않음
│   │   └── globals.css    #   Tailwind @theme + shadcn 변수 ↔ uc 토큰 연결
│   ├── components/ui/     #   shadcn 기반 컴포넌트
│   └── lib/utils.ts       #   cn() 등
├── stories/               # Storybook 스토리 (컴포넌트 문서 겸용)
├── dist/swift/            # 자동 생성 — iOS 앱에 복사해 감
├── docs/                  # 설계 문서 (이 폴더)
└── research/              # 읽기 노트·조사
```

## 토큰 흐름
```
tokens/themes/*.json (seed 색)
   └─ Leonardo ─→ 단계별 팔레트 (primitive)
                    └─ semantic 매핑
                         └─ Style Dictionary
                              ├─ src/styles/tokens.css   (--uc-* CSS 변수, OKLCH)
                              ├─ Tailwind v4 @theme
                              └─ dist/swift/UCColor.swift, UCFont.swift
```
- CSS 변수 접두사는 `--uc-` (예: `--uc-bg-layer-1`, `--uc-fg-on-brand`).
- shadcn 컴포넌트가 쓰는 `--background`, `--primary` 등은 globals.css에서 uc 토큰으로 연결한다. 그래서 shadcn 컴포넌트를 그대로 가져와도 내 테마를 따른다.

## 나중에 나눌 때 (workspace 전환 조건)
아래 중 하나가 생기면 pnpm workspace로 나눈다.
- Next.js 문서 사이트 + 레지스트리 배포를 시작할 때 → `apps/docs`
- Swift 출력을 Swift Package로 배포할 때 → `packages/tokens`
- 포트폴리오 등 다른 앱이 이 저장소 코드를 직접 import할 때

나눈 뒤 모습:
```
packages/tokens/   apps/docs/   apps/storybook/   registry/
```
