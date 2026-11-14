# shadcn/ui — 읽기 노트

> 회사: shadcn (Vercel 소속 개인 메인테이너 주도 오픈소스) · 공식 문서: https://ui.shadcn.com · 라이선스/사용 범위: MIT, 코드를 내 프로젝트에 복사해 소유 · 플랫폼: Web (React + Tailwind CSS, 레지스트리 자체는 프레임워크 무관) · 조사일: 2026-11-13

## 1. 한 줄 정리
_npm 패키지가 아니라 "컴포넌트 소스 코드를 배포하는 시스템"(CLI + Registry)으로, Base UI/Radix 같은 headless primitive 위에 Tailwind + CSS 변수 테마를 얹은 코드를 내 레포에 복사해 주고, 그 배포 방식을 누구나 자기 DS용으로 재사용할 수 있게 한 것._

## 2. 핵심 원칙 / 철학
- **Open Code**: 컴포넌트는 라이브러리 의존성이 아니라 내 코드. 수정·삭제 자유, 업데이트는 `diff`로 확인 후 직접 반영.
- **Composition**: 모든 컴포넌트가 비슷한 합성형 인터페이스(`Card` / `CardHeader` / `CardTitle` …)를 공유 → 사람과 AI 모두 예측 가능.
- **Distribution**: registry 스키마(JSON) + CLI로 컴포넌트·훅·페이지·테마·설정 파일까지 배포. "DS를 배포하는 플랫폼"이 본체.
- **Beautiful Defaults**: 기본값만으로 쓸 만하게, 커스터마이즈는 CSS 변수로.
- **AI-Ready**: 코드가 열려 있고 구조가 일관돼 LLM이 읽고 생성하기 쉽다는 점을 명시적 설계 목표로 둠 (MCP, Skills, llms.txt 제공).

## 3. 토큰 구조 · 네이밍
- 계층: 사실상 **2계층**. Tailwind 기본 팔레트/OKLCH 값(primitive) → shadcn 시맨틱 CSS 변수(`:root`/`.dark`) → `@theme inline`으로 Tailwind 유틸리티(`bg-primary`, `text-muted-foreground`)에 매핑. 별도 component 토큰 계층은 없음(컴포넌트는 Tailwind 클래스로 시맨틱 토큰을 직접 사용).
- 네이밍 규칙 예시: **`{role}` / `{role}-foreground` 쌍**. `--primary` + `--primary-foreground`, `--muted` + `--muted-foreground`, `--card` + `--card-foreground`. 배경 역할과 그 위 텍스트 색을 항상 짝으로 정의.
- 전체 변수 목록:
  - 표면/텍스트: `--background`, `--foreground`, `--card(-foreground)`, `--popover(-foreground)`
  - 액션/상태: `--primary`, `--secondary`, `--muted`, `--accent` (각 `-foreground` 포함), `--destructive`
  - 테두리/포커스: `--border`, `--input`, `--ring`
  - 차트: `--chart-1` ~ `--chart-5`
  - 사이드바 전용 세트: `--sidebar`, `--sidebar-foreground`, `--sidebar-primary(-foreground)`, `--sidebar-accent(-foreground)`, `--sidebar-border`, `--sidebar-ring`
- 색: 기본값은 **OKLCH** (예: `--background: oklch(1 0 0)`, `--foreground: oklch(0.145 0 0)`). Base color 선택지: Neutral, Stone, Zinc, Mauve, Olive, Mist, Taupe.
- 라운드: 단일 `--radius`(기본 `0.625rem`)에서 `calc(var(--radius) * …)`로 `--radius-sm` ~ `--radius-4xl` 파생. 하나만 바꾸면 전체 스케일 변경.
- 타이포 / 간격 / 그림자 / 모션: 자체 스케일 없음 → **Tailwind 기본 스케일**(spacing 4px 단위, `text-sm` 등) 그대로 사용. 2026-07 `shadcn/typeset`이 타이포 쪽으로 추가됨(세부 미확인).
- 포맷·도구: CSS 파일(`globals.css`) + `components.json` 설정. DTCG/Style Dictionary 미사용. Figma 연동은 Advanced > Figma 문서로 안내(공식 Figma 키트 여부 미확인).

## 4. 테마 · 다크모드 · 브랜드 확장
- 다크모드: `.dark` 클래스 안에서 같은 변수 재정의. Tailwind v4 기준 `@custom-variant dark (&:is(.dark *));`. 프레임워크별(Next.js/Vite/Astro/Remix) 가이드 존재.
- 커스텀 토큰 추가 절차: `:root`와 `.dark`에 변수 정의 → `@theme inline`에 `--color-xxx: var(--xxx)` 노출. 이 3단계가 공식 확장 방식.
- `components.json`의 `tailwind.cssVariables: true`(기본) / `tailwind.baseColor`로 init 시점 테마 결정. `--no-css-variables`면 유틸리티 직접 하드코딩(비권장).
- **Preset (2026-04)**: style·base color·theme color·chart color·icon library·font·heading font·radius·menu accent 등을 짧은 코드 하나로 인코딩. `shadcn preset decode|resolve|url|open`. `shadcn/create`(2025-12, `npx shadcn create`) 웹 UI에서 조합 후 공유. 이름 붙은 스타일(`mira`, `luma` 등)이 존재.
- 레지스트리 아이템 타입 `registry:theme` / `registry:style`의 `cssVars`(`theme`/`light`/`dark` 키)로 **내 브랜드 테마를 CLI 설치 가능한 형태로 배포** 가능.

## 5. 컴포넌트
- 개수·범위: llms.txt 기준 **59개**(Form & Input 17, Layout & Nav 8, Overlays 11, Feedback 8, Display 10, Misc 5). 이후 2026년 Questionnaire, Trace, Code Block, AI Elements(21개 패턴) 등이 계속 추가 → 실제 수는 60+. 별도로 Blocks(로그인, 대시보드, 사이드바 등 페이지 단위 조합)와 Charts(Recharts 기반) 제공.
- Primitive: **2026-07부터 Base UI가 기본**(`npx shadcn init` 기본값). Radix는 `-b radix`로 계속 지원, 모든 신규 컴포넌트를 양쪽에 출시. 일부 컴포넌트는 React Aria 버전도 존재(예: Questionnaire). 레지스트리 빌더는 `registry:base`로 primitive 고정.
- API 스타일: 합성형(compound) 서브컴포넌트 + `className` 확장 + `cva`(class-variance-authority) 기반 `variant`/`size` prop. 예: `<Button variant="outline" size="sm">`. Button variant: `default | destructive | outline | secondary | ghost | link`. 클래스 병합은 `cn()`(2026-09부터 독립 패키지로 분리).
- 눈에 띄는 것:
  - `Field` / `FieldGroup`: 폼 레이아웃을 라이브러리 비종속(React Hook Form, TanStack Form, Server Actions)으로 표준화.
  - `Input Group`, `Button Group`, `Item`, `Empty`, `Kbd`, `Spinner`, `Native Select` 같은 "작지만 자주 쓰는" 조각.
  - `Sidebar`: 전용 토큰 세트까지 갖춘 앱 셸 컴포넌트.
  - AI/챗 UI 컴포넌트(2026-06 Chat, 2026-10 Trace/Code Block/AI Elements).

## 6. 문서 구성
- 사이트 구조: Overview(Introduction, CLI, components.json, Theming, Typeset, Changelog, Skills, Directory) / Installation(프레임워크별) / Components(6개 카테고리) / Dark Mode / RTL / Forms / Advanced(Monorepo, React 19, Tailwind v4, Figma, v0) / MCP Server / Registry(+ Schemas).
- 컴포넌트 페이지 한 장: 라이브 Preview/Code 탭 → Installation(CLI 명령 / Manual 소스 복사) → Usage(import + 최소 예제) → Examples(변형별 데모) → API Reference(주로 primitive 문서 링크). Base UI / Radix 탭 전환. **Do/Don't·사용 시점 가이드는 거의 없음** — 코드 중심 문서.

## 7. 접근성
- 접근성은 대부분 **primitive(Base UI / Radix / React Aria)에 위임**: 포커스 관리, 키보드 내비, ARIA 속성, 포커스 트랩.
- shadcn 레이어에서는 `--ring` 기반 `focus-visible` 링, `sr-only` 라벨, `aria-invalid` 스타일링 정도. 색 대비 검증 가이드나 별도 접근성 페이지는 미확인(없는 것으로 보임).
- RTL 지원(2026-01, logical `start`/`end` 스타일).

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- **llms.txt**: https://ui.shadcn.com/llms.txt — 전체 문서/컴포넌트 인덱스.
- **MCP 서버**(2025-04 최초, 2025-08 CLI 3.0과 함께 정식): `pnpm dlx shadcn@latest mcp init --client claude` 또는 `.mcp.json`에 `{"command":"npx","args":["shadcn@latest","mcp"]}`. 설정된 모든 레지스트리에서 browse/search/install을 자연어로. Claude Code, Cursor, VS Code, Codex 지원.
- **Skills**: `pnpm dlx skills add shadcn/ui`. `components.json`이 있으면 활성화, 매번 `shadcn info --json`으로 프레임워크·Tailwind 버전·alias·base library·아이콘·설치된 컴포넌트를 읽음. CLI(`init/add/search/view/docs/diff/info/build`), 테마, 레지스트리 작성, 합성 규칙("폼은 `FieldGroup`", "옵션 세트는 `ToggleGroup`", 시맨틱 색만 사용)을 에이전트에게 주입. Radix→Base UI 마이그레이션도 skill로 컴포넌트 단위 수행.
- **Registry = 에이전트용 배포 채널**: `components.json`의 `registries`에 `"@me": "https://…/{name}.json"` 등록 → 에이전트가 `@me/button` 설치. 비공개 레지스트리(헤더 토큰), GitHub 레지스트리(2026-06, private은 2026-08) 지원. Open in v0 연동.
- DESIGN.md 류 파일은 없음(대신 skill + `components.json`이 그 역할).

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: **공유 안 함.** 웹(React/Tailwind) 전용. 토큰이 CSS 파일에만 있어 iOS(SwiftUI)로 가져가려면 별도 변환 필요. 커뮤니티 React Native 포트(react-native-reusables 등)가 있으나 공식 아님(미확인). 다만 OKLCH 시맨틱 변수 목록 자체는 SwiftUI `Color` asset 이름으로 옮기기 쉬운 형태.

## 10. 내 DS로 가져올 것 (1~3개)
1. **`{role}` / `{role}-foreground` 쌍 네이밍 + 소수의 시맨틱 변수**: `background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring` 약 20개만으로 시작. 단일 `--radius`에서 스케일 파생. 같은 이름을 iOS Asset Catalog 색 이름에도 그대로 써서 웹/iOS 어휘 통일.
2. **내 DS를 shadcn 레지스트리로 배포**: GitHub 레포에 `registry.json` + `registry:theme`(내 cssVars) + `registry:ui`(수정한 컴포넌트)를 두고 `components.json`에 `"@me"` 네임스페이스 등록. 그러면 새 사이드 프로젝트에서 `npx shadcn add @me/theme @me/button`, Claude Code도 MCP로 같은 경로를 씀. 처음부터 컴포넌트를 만들지 말고 shadcn 기본 컴포넌트를 fork해 토큰만 교체.
3. **에이전트용 "합성 규칙" 문서화**: shadcn skill처럼 "폼은 FieldGroup으로, 색은 시맨틱 클래스만(`bg-primary` O, `bg-blue-500` X)" 같은 짧은 규칙 목록을 내 DS의 CLAUDE.md/skill에 넣어 AI가 하드코딩 색·임의 컴포넌트를 만들지 않게 함.

## 11. 가져오지 않을 것 / 주의
- 사용 지침(Do/Don't, 콘텐츠 가이드)이 거의 없음 → 그 부분은 Polaris 등 다른 DS에서 보충해야 함.
- 간격·타이포 스케일을 Tailwind에 전적으로 의존 → iOS와 공유하려면 내가 명시적 스케일(예: 4px 기반)을 따로 정의해야 함.
- 복사 모델이라 업스트림 업데이트 자동 반영 안 됨. 변화 속도가 매우 빠름(2026년에만 Base UI 기본 전환, cn 패키지 분리, CLI v4 등) → 버전/primitive(Base UI vs Radix)를 내 DS 문서에 고정 기록할 것.
- 컴포넌트 수를 다 가져오지 말 것. 개인 DS는 실제로 쓰는 10~15개만.

## 출처
- https://ui.shadcn.com/docs/theming
- https://ui.shadcn.com/llms.txt
- https://ui.shadcn.com/docs/changelog
- https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default
- https://ui.shadcn.com/docs/changelog/2026-04-preset-commands
- https://ui.shadcn.com/docs/skills
- https://ui.shadcn.com/docs/mcp
- https://ui.shadcn.com/docs/registry
- https://ui.shadcn.com/docs/registry/registry-item-json
- https://github.com/shadcn-ui/ui
