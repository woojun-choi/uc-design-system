# Atlassian Design System (ADS) — 읽기 노트

> 회사: Atlassian · 공식 문서: https://atlassian.design · 라이선스/사용 범위: `@atlaskit/*` 패키지는 npm 공개(대부분 Apache-2.0로 알려짐, 패키지별 확인 필요 — 미확인), Atlassian Sans 폰트·브랜드는 Atlassian 제품용 · 플랫폼: Web(React) 중심, iOS/Android 공개 토큰 출력은 미확인 · 조사일: 2026-11-13

## 1. 한 줄 정리
_토큰 → primitives(Box/Stack/Inline) → 컴포넌트 → ESLint로 강제하는 "웹 React 중심" DS이고, 2026년엔 같은 구조화 콘텐츠에서 MCP·Skill·CLI·DESIGN.md·llms.txt를 모두 생성하는 "AI용 컨텍스트 엔진"으로 가장 멀리 간 사례._

## 2. 핵심 원칙 / 철학
- 디자인 시스템을 제품처럼 운영(로드맵·우선순위·피드백 루프). 2026년 공식 블로그 표현은 "full stack context engine".
- **하드코딩 금지, 토큰 우선**: 토큰은 "한 번 바꾸면 전체가 바뀌는" 단일 진실 소스(`@atlaskit/tokens`). 마이그레이션도 codemod + lint로 자동화.
- **콘텐츠도 코드처럼**: 컴포넌트/아이콘/토큰/린트 규칙/파운데이션 가이드를 TypeScript 스키마로 코드 옆에 두고, 거기서 문서·MCP·스킬·DESIGN.md를 생성(사람용 문서와 AI용 문서를 따로 쓰지 않음).
- 결론적으로 "AI가 읽는 문서"보다 "AI가 필요한 것만 질의하는 도구 + 비용 0인 lint 강제" 조합을 선호.

## 3. 토큰 구조 · 네이밍
- 계층 (primitive → semantic → component 등): 공개 API는 **semantic 토큰만** 노출(`color.text`, `elevation.surface.raised` 등). raw 팔레트 값은 테마 파일 내부 구현. 컴포넌트 토큰 레이어는 공개적으로 두지 않고, 대신 "component recipe"는 DESIGN.md에만 등장.
- 네이밍 규칙: `foundation.property.modifier` (점 구분). 예: `color.icon.success`, `color.background.danger.bold` + 상태 접미사 `.hovered` / `.pressed`, `color.background.selected.bold`, `space.200`, `opacity.disabled`.
  - 코드에서는 `token('color.background.neutral')` → CSS 변수 `var(--ds-background-neutral)` (접두사 `--ds-`, foundation 이름 `color`는 생략). `token('space.200')` → `var(--ds-space-200)`.
- 스케일:
  - 색: text / link / icon / background / border / blanket / chart / skeleton 역할군. 강도 modifier `subtle`/`bold`, 시맨틱 `brand`/`danger`/`warning`/`success`/`information`/`discovery`, `chart.categorical.1…`.
  - 간격: 8px 기반 숫자 스케일 `space.025`(2px) … `space.100`(8px) … `space.200`(16px) … `space.300`(24px) …, 음수 `space.negative.100`. (DESIGN.md frontmatter에서 `spacing.100 = 0.5rem`, `spacing.200 = 1rem`, `negative-100` 확인)
  - 라운드: DESIGN.md 기준 `rounded.medium = 0.375rem`(6px), `large`, `xlarge`, `full`. (코드 토큰명 `radius.*`는 공식 페이지에서 직접 확인 못함 — 미확인)
  - 보더: `width-default 1px`, `width-selected 2px`, `width-focused 2px`.
  - 엘리베이션: surface(sunken/default/raised/overlay) + 짝이 되는 shadow. DESIGN.md는 "The four planes"로 설명.
  - 타이포: Atlassian Sans / Atlassian Mono, body 0.875rem/1.25rem 400, heading 스케일, weight medium/bold.
  - 모션: duration(예: `medium 200ms`) + easing(예: `inout-bold`) — 2026 DESIGN.md에 등장.
- 포맷·도구: `@atlaskit/tokens`(JS `token()` 함수 + 테마 CSS 파일), `@atlaskit/eslint-plugin-design-system`(`ensure-design-token-usage`, `no-unsafe-design-token-usage`), Stylelint 플러그인, codemod(`@hypermod/cli`의 `@atlaskit/tokens#theme-to-design-tokens`, `#css-to-design-tokens`), Figma 라이브러리·플러그인. 소스 포맷이 DTCG JSON인지는 미확인.

## 4. 테마 · 다크모드 · 브랜드 확장
- 색 테마: light / dark / **high-contrast**. 비색 테마: spacing, typography(기본 활성), density(cozy/comfortable/compact), reduced motion.
- `setGlobalTheme({ light, dark, colorMode: 'auto' })` → `<html data-theme="light:light dark:dark spacing:spacing typography:typography" data-color-mode="light">` 속성으로 CSS 변수 세트 활성화. `colorMode: 'auto'`는 OS 설정 추종.
- **토큰 마이그레이션 경험**(다크모드 도입이 동기): ① 앱에 테마 셋업 ② ADS 컴포넌트 최신화(이미 토큰화됨) ③ codemod로 하드코딩 값을 토큰으로 "제안" 치환 → 반드시 수동 리뷰 ④ ESLint로 신규 하드코딩/폴백 차단(`fallbackUsage: 'none'`) ⑤ 내부 Chrome 확장으로 테마 토글하며 진척 추적 ⑥ 다 검증된 뒤에 다크모드 공개. 즉 "다크모드는 결과물, 토큰화가 본작업".
- DESIGN.md 표준은 테마를 지원하지 않아 다크용 별도 파일을 따로 배포.

## 5. 컴포넌트
- 개수·범위: 약 90개, 14개 카테고리(Forms and inputs 14, Messaging 7, Navigation 6, Overlays 5, Text & data display 7 …) + Libraries(Pragmatic drag and drop, Motion 등) + Tooling(ESLint, Stylelint, UI Styling Standard). 별도로 primitives 13종.
- API 스타일: React props, `appearance`(예: Button `appearance="primary"`)식 variant. 레이아웃은 primitives 합성: `Box`(토큰 접근 컨테이너), `Inline`(가로), `Stack`(세로), `Text`(Beta), `Pressable`(커스텀 버튼 베이스), 스타일링은 `xcss`(토큰만 허용하는 CSS-in-JS). 현재 권장은 `@atlaskit/primitives/compiled`, 구 패키지 deprecated.
- 눈에 띄는 것: Lozenge(상태 라벨), Flag(토스트), Spotlight(온보딩), Section message / Inline message, Navigation system(구 Side navigation deprecated). "UI Styling Standard" 자체를 컴포넌트 목록에 올려 둔 점.

## 6. 문서 구성
- 사이트 구조: Get started(Design/Develop, With AI) / Foundations(Tokens, Color, Typography, Spacing, Elevation, …) / Components / Primitives / Patterns / Content(Voice & tone 등) / Tooling. 토큰 섹션은 "Design tokens", "All design tokens", "Use tokens in code", "Migrate to tokens"로 분리.
- 컴포넌트 페이지: Examples(코드) / Code(props) / Usage(사용 시점, Do/Don't) 탭 구조로 알려져 있음(이번 조사에서 개별 페이지 직접 확인은 미확인).
- 기계용 문서: `atlassian.design/llms.txt` 인덱스 → `llms-tokens.txt`, `llms-primitives.txt`, `llms-components.txt` 등 주제별 분할 파일. `atlassian.design/DESIGN.md`(+ 다크/축약 변형 `DESIGN.short.md`).

## 7. 접근성
- high-contrast 색 테마, reduced-motion 테마를 "테마"로 일급 지원.
- DESIGN.md에 Accessibility 섹션, 스키마에 컴포넌트별 접근성 요구사항 필드 포함.
- ADS MCP에 접근성 도구 4종: `ads_analyze_a11y`(React 코드를 axe-core로 검사 + ADS 맞춤 제안), `ads_analyze_localhost_a11y`(localhost/배포 URL 검사), `ads_get_a11y_guidelines`, `ads_suggest_a11y_fixes`.
- 보더 토큰에 `width-focused`(2px) 별도, Focus ring 컴포넌트 존재. 목표 WCAG 레벨 명시는 미확인.

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- **구조화 콘텐츠 파이프라인**(블로그 2026-06-02): 컴포넌트·아이콘·토큰·린트 규칙·파운데이션을 TS 스키마로 코드 옆에 둠 → MCP, design system skill, DESIGN.md 등 다포맷 생성. MCP 미사용 대비 보고 수치: 코드 정확도 +4.9%, 오류 −11%, 평균 34% 빠름, 툴콜 −26%, 토큰 −16%.
- **ADS MCP** (`@atlaskit/ads-mcp`, Early Access; 원격 `https://mcp.atlassian.com/v1/ads/public/mcp` 또는 `npx -y @atlaskit/ads-mcp`). 도구: `ads_plan`(토큰·아이콘·컴포넌트 한 번에 검색), `ads_get_all_tokens`, `ads_search_tokens`, `ads_get_all_components`, `ads_search_components`, `ads_get_all_icons`, `ads_search_icons`, `atlaskit_*` 폴백 검색, 접근성 4종. "ADS 먼저, 없으면 atlaskit 폴백"이라는 우선순위가 도구 이름에 박혀 있음.
- **DESIGN.md 실험** (블로그 2026-06-15): Google Stitch의 오픈 포맷(github.com/google-labs-code/design.md) 채택. YAML frontmatter(`version`, `theme`, `colors`, `typography`, `rounded`, `spacing`, `borders`, `surfaces`, `motion`, `components` 레시피) + 산문(Overview/Brand & Style, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts, Icons, Motion, Voice and tone, Accessibility, Responsive). 크기 80KB(≈19.8k LLM 토큰).
  - 로그인 화면 프로덕션 테스트: 컨텍스트 없음 4.20M 토큰/43턴, **ADS MCP 3.75M/35.1턴**, ADS skill 4.43M/36턴, **DESIGN.md 7.21M/45.3턴**. DESIGN.md가 MCP 대비 토큰 ~92% 더 쓰고, 실행 간 편차 ~2.7배.
  - 실패 원인 3가지: ① 매번 전부 로드(MCP는 필요한 것만) ② 크기 한계(전체 가이드 2.5MB를 80KB로 줄이며 50+ 컴포넌트 가이드 삭제 → 에이전트가 소스 코드를 뒤짐) ③ 내부 구현을 노출해 에이전트가 `@atlaskit/button`을 import하지 않고 **컴포넌트를 재구현**.
  - 잘 맞는 곳: 원샷 프로토타입, Tailwind/shadcn 커스터마이징, 디자인 툴 간 이식, 고수준 아트 디렉션.
- **CLI**: 같은 콘텐츠를 터미널 명령으로 노출(docs/search, `--json` 권장). 8% 속도 향상, 에이전트들이 MCP보다 CLI를 60% 더 많이 사용 → 스킬이 기본으로 CLI를 안내하고 MCP는 폴백. 패키지명은 미확인.
- **Skill**: "design system skill"이 같은 콘텐츠 노출 + 별도 스킬이 콘텐츠 갱신 후 eval/코드 헬스체크 실행. 공개 스킬 이름·설치 경로는 미확인.
- **llms.txt**: 존재. 패키지 단위로 분할된 하위 llms 파일을 가리키는 인덱스형.
- 프로덕션 결론: MCP/스킬로 컨텍스트 공급 + **ESLint로 토큰 소모 없이 강제**.

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: 공개 문서상 출력은 웹(CSS 변수, JS `token()`, CSS/Sass/Less) 뿐. "Use tokens in code"에 iOS/네이티브 언급 없음. Atlassian 모바일 앱의 토큰 공유 방식은 미확인. → iOS 쪽 참고 대상은 아님. 다만 `foundation.property.modifier` 점 표기는 Swift의 `Color.text.subtle` 같은 네임스페이스로 그대로 옮기기 쉬움.

## 10. 내 DS로 가져올 것 (1~3개)
1. **단일 소스 → 다포맷 생성**: 토큰 JSON + 컴포넌트별 짧은 메타(언제 쓰나 / 금지 / 접근성 / import 경로)를 한 곳에 두고, 스크립트 하나로 `DESIGN.md`(요약본)·`llms.txt`·CLAUDE.md 스니펫을 생성. 손으로 두 벌 쓰지 않기.
2. **DESIGN.md는 "짧고, import를 강제하는" 버전으로**: Atlassian의 실패 ③을 피해 컴포넌트 섹션에 "재구현 금지, `import { Button } from '@my/ui'` 사용"을 명시하고 내부 스타일 레시피는 넣지 않기. 크기는 수 KB 수준 유지, 상세는 필요할 때 읽는 하위 파일(`docs/components/button.md`)로 분리(= 로컬판 `ads_plan`).
3. **lint로 강제 + codemod식 마이그레이션**: `no-hardcoded-colors/spacing` 류 ESLint/Stylelint 규칙 1~2개(또는 grep 스크립트)를 CI/훅에 걸어 AI가 만든 코드도 토큰 위반 시 바로 실패하게. 프롬프트 토큰 0원으로 일관성 확보.

## 11. 가져오지 않을 것 / 주의
- MCP 서버 직접 구축: 90개 컴포넌트·여러 팀 규모에서나 이득. 개인 DS는 파일 + 스킬/CLAUDE.md로 충분(CLI가 MCP보다 효율적이었다는 Atlassian 자체 결과도 근거).
- 테마 축이 너무 많음(spacing/typography/density 테마) — 개인용은 light/dark(+선택적 high-contrast)만.
- `xcss`, compiled 마이그레이션 같은 런타임 스타일링 인프라는 과함.
- 블로그 수치는 Atlassian 스스로 "결론적이지 않다"고 명시. 숫자 자체보다 경향(필요한 것만 로드 > 전부 로드)만 취할 것.
- 브랜드 자산(Atlassian Sans, 로고)은 사용 불가.

## 출처
- https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice
- https://www.atlassian.com/blog/ai-at-work/teaching-ai-to-speak-our-design-language
- https://www.atlassian.com/blog/ai-at-work/atlassian-design-system-building-the-context-engine-for-the-ai-era
- https://www.atlassian.com/blog/ai-at-work/giving-ai-agents-design-system-context-from-the-terminal-what-we-learned-building-a-cli
- https://atlassian.design/DESIGN.md
- https://atlassian.design/llms.txt
- https://unpkg.com/@atlaskit/ads-mcp/README.md (npm `@atlaskit/ads-mcp`)
- https://atlassian.design/foundations/tokens/design-tokens
- https://atlassian.design/foundations/tokens/use-tokens-in-code
- https://atlassian.design/foundations/tokens/migrate-to-tokens
- https://atlassian.design/components/eslint-plugin-design-system/ensure-design-token-usage
- https://atlassian.design/components
- https://github.com/google-labs-code/design.md
