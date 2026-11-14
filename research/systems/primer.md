# GitHub Primer — 읽기 노트

> 회사: GitHub (Microsoft) · 공식 문서: https://primer.style · 토큰 리포: https://github.com/primer/primitives · 라이선스/사용 범위: MIT(`@primer/primitives`, `@primer/react`) · 플랫폼: Web(React, Rails ViewComponent), Figma. 모바일은 별도 툴킷(코드 공개 없음) · 조사일: 2026-11-13

## 1. 한 줄 정리
_토큰 네이밍 문법을 가장 엄밀하게 정의하고(블록 순서·modifier 어휘), 토큰 리포 안에 LLM용 규칙서(DESIGN_TOKENS_GUIDE/SPEC)와 AGENTS.md를 같이 두는 "토큰이 곧 스펙"형 DS._

## 2. 핵심 원칙 / 철학
- 3단 토큰(base → functional → component/pattern)과 **base 토큰은 직접 쓰지 말 것**(다크모드 미대응이므로 다른 토큰 정의용으로만).
- 모든 패턴은 모든 color mode에서 동작해야 함(9개 테마 전제).
- 접근성을 사후가 아닌 설계 단계부터(“retrofit은 어렵다”). 대비 문제의 대부분은 토큰이 해결하도록 설계.
- 이름은 CSS 속성과 맞춘다(`bgColor`, `borderColor`, `fgColor`) → 개발자/AI가 추측하기 쉬움.

## 3. 토큰 구조 · 네이밍
- 계층:
  - **Base**: raw 값 매핑. `base-size-4`, `base-color-green-5`, `base-fontWeight-semibold`, `base-easing-easeOut`.
  - **Functional**: 전역 UI 패턴. `fgColor-default`, `bgColor-inset`, `borderColor-default`, `boxShadow-inset-thick`, `shadow-resting-small`.
  - **Component/pattern**: 컴포넌트 CSS에서만. `button-primary-bgColor-hover`, `control-danger-borderColor-rest`, `control-medium-paddingInline-normal`, `text-codeInline-fontSize`, `focus-outlineColor`.
- 네이밍 문법: **`[prefix]-[namespace]-[pattern]-[variant]-[property]-[variant]-[scale]`**, 필수는 property 하나. 블록은 `-`, 블록 내 다단어는 camelCase. lint(`npm run lint:tokens`)로 camelCase/kebab-case·영숫자만 강제.
  - 색 modifier 어휘: `default` / `muted`(약) / `emphasis`(강) + 짝 규칙 `bgColor-*-emphasis` 위에는 반드시 `fgColor-onEmphasis`.
  - 색 role: `accent`, `success`, `attention`, `danger`, `open`, `closed`, `done`, `sponsors` (+ `severe` 존재로 알려졌으나 이번 페이지에선 미확인).
  - 크기 어휘: `xsmall…xxlarge`, 밀도 `condensed/normal/spacious`, 두께 `thin/thick/thicker`, 뷰포트 `narrow/regular/wide`, 상태 scale `rest/hover/active/disabled`.
- 스케일:
  - 색: 중립 스케일 0–13 (배경 0–5, 보더 7–8, 텍스트 9–10; light/dark에서 방향이 반대라 functional 토큰 공유 가능). 고대비 테마는 대부분 7:1 목표.
  - 라운드: `borderRadius-small 3px`, `-medium 6px`(기본), `-large 12px`, `-full`.
  - 그림자: `shadow-resting-[xsmall|small|medium]`, `shadow-floating-[small|medium|large|xlarge]`, `shadow-inset`.
  - 모션: `motion-duration-[micro|short|medium|long]`, `motion-easing-[enter|exit|hover|move|linear]`, `motion-transition-[enter|exit|hover|stateChange]`. UI 애니메이션 ≤300ms, 최대 500ms.
  - 타이포: `fontStack-sansSerif|sansSerifDisplay|monospace`, `text-body-shorthand-medium` 같은 shorthand 토큰(반드시 shorthand 사용).
  - 기타: `focus-outline-width 2px`, `zIndex.*`, `controlStack-*`, `stack-gap-*`.
- 포맷·도구: `src/tokens/**.json5`, W3C DTCG 관례(`$value`, `$type`, `$extensions`) → Style Dictionary(`scripts/buildTokens.ts`) + 커스텀 transform(alpha/mix, mode override, `@` 네이밍) → `dist/css`(CSS 변수) + Figma export(`$extensions['org.primer.figma']`의 collection/mode/scopes로 Figma Variables 생성). 그 외 출력(JS/JSON/SCSS)은 이번 조사에서 미확인. 테마 오버라이드는 `src/tokens/functional/color/[light|dark]/overrides/` + `scripts/themes.config.ts` 등록.

## 4. 테마 · 다크모드 · 브랜드 확장
- 9개 테마: light, light-high-contrast, light-colorblind, light-tritanopia, dark, dark-dimmed, dark-high-contrast, dark-colorblind, dark-tritanopia.
- 구현: "기본 light/dark + 차이만 override" 방식. 각 테마는 별도 CSS 파일 import, 컬러 모드 속성으로 전환.
- Figma 라이브러리는 light/dark 두 모드만 제공 → 나머지 테마는 코드에서만 검증.
- 브랜드: 마케팅용 별도 시스템 Primer Brand(`@primer/react-brand`, `brand-` prefix 토큰, 예 `brand-borderWidth-thin`).

## 5. 컴포넌트
- 개수·범위: Product UI 기준 62개(ActionList, ActionMenu, SelectPanel, DataTable, TreeView, PageLayout, SplitPageLayout, UnderlineNav, Timeline, BranchName, StateLabel, KeybindingHint, Skeleton* …). React와 Rails 양쪽 구현, 플랫폼별 상태 "ready" 등 표시.
- API 스타일: React props + 합성(sub-component) 패턴(예: `ActionList.Item`, `PageLayout.Pane`). Button은 `variant`, `size`, `leadingVisual`/`trailingVisual`, `trailingAction`, `loading`, `inactive`, `block`.
- 눈에 띄는 것: **disabled 지양** 가이드(키보드 사용자 접근 불가) → `inactive`(포커스·툴팁 유지) 별도 prop; `loading` 시 `aria-disabled`로 포커스 보존 + `loadingAnnouncement`. GitHub 도메인 특화(BranchName, StateLabel open/closed/merged).

## 6. 문서 구성
- 사이트 구조: 상단 Product UI / Brand UI / Octicons / Accessibility / Brand Toolkit. Product UI 사이드바: Getting Started(Foundations — color usage, typography, MCP 등) / Primitives / UI Patterns / Scenario Patterns / Components / Internal Components / React Hooks / CSS Utilities / Contribute.
- 컴포넌트 페이지: 서브페이지 **Overview / Guidelines / Accessibility**. Overview 상단에 플랫폼 블록(React: 상태·Storybook·Source / Rails: 상태·Lookbook·Source / Figma 링크) → 한 줄 설명 → 예제(라이브 코드) → Props 표. Guidelines에 사용 시점·Do/Don't, Accessibility 탭에 키보드·터치 타깃·AT 사용.

## 7. 접근성
- 별도 Accessibility 사이트 섹션(foundations, checklists, patterns, Primer components). Primer Docs는 WCAG 2.2 A/AA 기준 적합성 보고서(ACR, 2025-06-27) 공개.
- 토큰 레벨: 텍스트/배경 페어링 규칙과 최소 대비(4.5:1, 대형 3:1; 고대비 7:1), 중립 스케일 단계별 최소 대비 규정, colorblind/tritanopia 테마.
- 규칙(가이드 문서): `:focus-visible`만 사용(`:focus` 단독 금지), disabled를 opacity로 표현 금지, `prefers-reduced-motion` 준수, `focus-outline-width`를 모든 키보드 포커스에 사용.
- MCP 도구에 `get_component_accessibility_guidelines`, `review_alt_text` 포함.

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- **`@primer/mcp`** (primer/react 리포 `packages/mcp`, stdio, `npx @primer/mcp@latest`). primer.style 기준 19개 도구: `init`, `list_components`, `get_component`, `get_component_examples`, `get_component_usage_guidelines`, `get_component_accessibility_guidelines`, `list_patterns`, `get_pattern`, `find_tokens`, `get_token_group_bundle`, `get_design_token_specs`, `get_token_usage_patterns`, `lint_css`, `get_color_usage`, `get_typography_usage`, `list_icons`, `get_icon`, `primer_coding_guidelines`, `review_alt_text`. 마케팅용 `@primer/brand-mcp` 별도.
- **토큰 리포 안의 LLM 문서** (`@primer/primitives` 패키지에 동봉):
  - `DESIGN_TOKENS_GUIDE.md`: "You are a CSS expert"로 시작하는 규칙서. Core Rule(raw hex/px 금지), Color Logic Matrix(배경-전경 페어+대비), Pattern Compression, RFC 2119 키워드(MUST/SHOULD/NEVER), Easing Decision Tree(등장/퇴장/이동/hover/루프별 easing 선택), Golden Example(모든 상태 포함 버튼 CSS), Interactive States Checklist(rest/hover/focus-visible/active/disabled), **Hallucination Guard**(확인 안 된 토큰명엔 `/* check-token */` 주석).
  - `DESIGN_TOKENS_SPEC.md`(생성물): 토큰마다 `### name` + 설명(값 포함) + **U:**(use cases) + **R:**(rules) 압축 포맷. 예: `borderRadius-medium` — U: button, input, textarea / R: 대부분 컴포넌트 기본값.
  - `AGENTS.md`: 변경 후 `lint → format → test → build` 필수, SPEC은 생성물이라 직접 수정 금지, 토큰 추가 전 W3C 포맷 가이드 확인.
- llms.txt: `primer.style/llms.txt` 404 — 미제공(미확인 아님, 2026-11-13 기준 확인).
- DESIGN.md(Stitch 포맷): 공식 제공 확인 안 됨 — 미확인.

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: `@primer/primitives` 공식 출력은 웹 CSS + Figma Variables. 모바일(GitHub iOS/Android)은 Primer Primitives 색 값에서 출발하되 **Figma "Mobile Design Toolkit"이 소스 오브 트루스** → 팀 라이브러리/플러그인 → 앱에 Xcassets(iOS)·XML(Android)로 반영되는 디자이너 주도 파이프라인(옛 primer.style/mobile 문서 기준; 현재 해당 URL은 github.com/primer/mobile로 리다이렉트되며 404). 공개 Swift 토큰 패키지 없음. Octicons는 모바일용 16/24px.
- 시사점: 웹과 iOS가 "같은 JSON에서 빌드"가 아니라 "같은 값에서 출발해 각자" — 개인 DS라면 Style Dictionary로 JSON → CSS + Swift 직접 생성이 더 단순하고 drift도 없음.

## 10. 내 DS로 가져올 것 (1~3개)
1. **네이밍 문법 + modifier 어휘 고정**: `[pattern]-[variant]-[property]-[scale]`, property는 CSS 이름(`bgColor`/`fgColor`/`borderColor`), 강도는 `default/muted/emphasis` 3개, 상태는 `rest/hover/active/disabled`. 그리고 "`*-emphasis` 배경 위엔 `fgColor-onEmphasis`" 같은 페어링 규칙을 같이 명시. AI가 토큰명을 "추측해도 맞는" 구조가 됨.
2. **토큰 SPEC의 U/R 압축 포맷 + Hallucination Guard**: 토큰 JSON에서 `name / 값 / U: 용도 / R: 규칙` 한 줄짜리 SPEC.md를 자동 생성하고, 규칙서에 "목록에 없는 토큰은 쓰지 말고 `/* check-token */` 표시" 한 줄 추가. 작은 DS에선 이 파일 하나가 MCP를 대신함.
3. **토큰 리포에 AGENTS.md(=CLAUDE.md)**: "변경 후 lint→test→build 필수, 생성물 직접 수정 금지, 토큰 추가 시 DTCG 형식" 3~4줄. Claude Code가 토큰 파일을 건드릴 때 안전장치.

## 11. 가져오지 않을 것 / 주의
- 9개 테마(colorblind/tritanopia/dimmed) — 개인용엔 light/dark면 충분. 필요하면 "override만 쓰는 구조"만 차용.
- React + Rails 이중 구현, Primer Brand 분리 같은 조직 규모 구조.
- 19개 도구 MCP 서버 구축은 과함.
- `$extensions['org.primer.figma']` 같은 Figma 메타는 Figma Variables를 실제로 쓸 때만.
- 모바일 파이프라인은 디자이너 수작업 의존 — 따라 하지 말 것.

## 출처
- https://github.com/primer/primitives
- https://raw.githubusercontent.com/primer/primitives/main/AGENTS.md
- https://raw.githubusercontent.com/primer/primitives/main/DESIGN_TOKENS_GUIDE.md
- https://unpkg.com/@primer/primitives@11.10.0/DESIGN_TOKENS_SPEC.md
- https://primer.style/product/primitives/token-names
- https://primer.style/product/getting-started/foundations/color-usage
- https://primer.style/product/getting-started/foundations/mcp
- https://raw.githubusercontent.com/primer/react/HEAD/packages/mcp/README.md
- https://primer.style/product/components
- https://primer.style/product/components/button
- https://primer.style/accessibility/introduction
- https://accessibility.github.com/conformance/primer-docs/
- https://primer.style/mobile/foundations (현재 리다이렉트/404, 검색 스니펫 기반)
