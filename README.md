# uc-design-system

uzun choi의 개인 디자인 시스템. **여러 프로젝트에 나만의 디자인 시스템을 적용하기 위해** 만든다. shadcn/ui 기반 토큰 중심 시스템으로, 웹과 iOS 사이드 프로젝트가 같이 쓰고 AI도 따른다.

> **상태:** M4 완료 — 컴포넌트 7개, 문서, 다른 프로젝트에 붙이기, 배포 설정. 다음은 **M5 실전 적용** (대상 프로젝트 미정) — [로드맵](docs/roadmap.md)

## 실행
```bash
npm install
npm run tokens      # tokens/ → CSS · Tailwind · Swift 생성 + 대비 검사
npm run storybook   # http://localhost:6006 — 툴바에서 테마 · 모드 · 대비 전환
# 배포본: https://woojun-choi.github.io/uc-design-system/ (main에 push하면 자동 배포)
npm run lint        # 하드코딩(hex, 임의 값, 토큰에 없는 클래스) 검사
```
토큰은 `tokens/`만 고친다. 생성 파일은 직접 고치지 않는다.

## 다른 프로젝트에 붙이기
코드를 복사해서 그 프로젝트가 소유한다 (shadcn 방식). 레지스트리는 나중에.

### 웹 (React 19 + Tailwind v4 + Vite)
**1. 파일 복사**
```bash
npm run copy-to -- ../my-app
```
`src/styles/`(토큰 CSS 4개), `src/components/ui/`, `src/lib/utils.ts`, `DESIGN.md`, `AGENTS.md`, `.claude/skills/uc-ui/`, `eslint.config.js`가 들어간다.

**2. 받는 프로젝트에 패키지 설치**
```bash
npm i tailwindcss @tailwindcss/vite radix-ui class-variance-authority clsx tailwind-merge lucide-react
```
```bash
npm i -D typescript@~5.9 eslint typescript-eslint eslint-plugin-better-tailwindcss
```
> TypeScript 7(새 Vite 템플릿 기본)은 아직 typescript-eslint가 지원하지 않아서 5.9로 맞춘다. 템플릿에 `erasableSyntaxOnly`가 있으면 5.9가 모르는 옵션이라 지운다. 템플릿의 `eslint.config.js`는 복사할 때 덮어써진다.

**3. 연결**
- `@/` 경로 별칭이 `src/`를 가리키게 한다 (vite.config `resolve.alias`, tsconfig `paths`).
- 앱 입구에서 `import './styles/globals.css'` (Tailwind 입구를 이 파일로).
- `index.html`에 글꼴과 테마:
```html
<html lang="ko" data-uc-theme="neutral">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<!-- paper 테마일 때만 --><link rel="stylesheet" href="https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css" />
```
- 모드·대비는 속성을 안 주면 시스템 설정을 따른다. 강제하려면 `data-uc-mode="dark"`, `data-uc-contrast="more"`.
- `package.json`에 `"lint": "eslint ."`. `eslint.config.js`의 `entryPoint`와 `files`가 그 프로젝트 구조와 맞는지 확인.

**4. 확인:** `<Button>저장하기</Button>`이 테마 색으로 나오고, `bg-blue-500`을 쓰면 `npm run lint`가 에러를 내면 끝. (2026-11-15 새 Vite 프로젝트로 이 순서 그대로 확인함)

**업데이트:** 이 저장소에서 바꾼 뒤 같은 명령으로 다시 복사 → 받는 쪽에서 `git diff`로 확인.

### iOS (SwiftUI)
```bash
npm run copy-to -- ../MyApp/MyApp --swift
```
```swift
let c = UCColors.neutral        // 또는 .paper
Text("저장하기").foregroundStyle(c.fgOnBrand).background(c.bgBrandSolid)
```
다크 모드 · 대비 높이기는 자동. 글자는 SwiftUI 기본(`.body`, `.headline` …)을 그대로 쓴다 — 웹의 `text-body` 등과 이름이 같다.

## 문서 지도
| 문서 | 내용 |
|---|---|
| [DESIGN.md](DESIGN.md) | **디자인 규칙 원본** — 토큰 이름·쓰는 법 (AI도 읽음) |
| [AGENTS.md](AGENTS.md) | AI 핵심 규칙 10줄 + 어디를 읽을지 · [llms.txt](llms.txt) |
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
- **테마:** neutral(무채색, 사진이 주인공) · paper(미색 종이) × 라이트 / 다크 × 기본 / 고대비 — 속성이 없으면 시스템 설정
- **컴포넌트:** shadcn/ui 위에 Button · Input · Textarea · Card · Badge · Alert · Dialog
- **AI:** DESIGN.md(원본) + AGENTS.md · 스킬(안내) + lint(강제)
- **쓰는 곳:** Storybook에서 먼저 완성 → 다른 프로젝트 하나에 실전 적용(M5, 대상 미정) → 나머지 사이드 프로젝트
