# Shopify Polaris — 읽기 노트

> 회사: Shopify · 공식 문서: https://shopify.dev/docs/api/polaris (구 polaris.shopify.com → 301 리다이렉트) · 라이선스/사용 범위: 구 Polaris React 레포는 MIT로 공개됐으나 아카이브. 현행 Polaris Web Components는 Shopify CDN에서 로드하는 Shopify 앱 전용 라이브러리 · 플랫폼: Web(Shopify Admin 앱/확장), Checkout, Customer Account, POS 확장 · 조사일: 2026-11-13

## 1. 한 줄 정리
_Shopify 앱 생태계 전체(App Home, Admin, Checkout, Customer Account, POS)를 하나로 묶는 web components 기반 UI 시스템. 컴포넌트 자체보다 **콘텐츠/보이스 가이드와 페이지 패턴(templates/compositions)** 이 다른 DS에서 보기 힘든 강점이다._

## 2. 핵심 원칙 / 철학
- **Merchant 중심**: 모든 가이드가 "가맹점주가 통제권을 갖고 스스로 결정하게"를 기준으로 함("Guide, don't prescribe").
- **Admin과 일관성**: 서드파티 앱이 Shopify admin의 일부처럼 보이고 들리게. 앱이 테마를 바꾸는 게 아니라 Shopify의 룩을 상속.
- **Unified, framework-agnostic** (2025-10-01 stable): 하나의 web components 라이브러리를 모든 surface에 사용, React/Vue/vanilla 무관. CDN 로드라 앱 코드 변경 없이 DS 업데이트 반영.
- **현재 상태(검증)**:
  - Polaris React(`@shopify/polaris`)는 deprecated, GitHub `Shopify/polaris` 레포는 **2026-09-11 아카이브**(read-only, "archived and unmaintained").
  - polaris.shopify.com은 shopify.dev/docs/api/polaris로 **301 리다이렉트**. 구 React 문서는 Storybook 아카이브(storybook.polaris.shopify.dev)로 이동.
  - 2026-10-01부터 API 2025-07 이하 확장을 가진 앱은 CLI로 업데이트 불가 → 사실상 web components 강제.
  - 커뮤니티에서는 web components의 기능 공백(React 대비 누락 컴포넌트) 불만이 꾸준히 제기됨.

## 3. 토큰 구조 · 네이밍
- 계층: **primitive 팔레트 → semantic 토큰**의 2계층(+ 일부 component-alias). 예: `colors.gray[16]` → `color-bg-inverse`, `color-bg-fill-brand-hover`, `color-input-border-active`가 같은 primitive를 공유. component alias 예: `space-card-padding` = `space-400`, `space-table-cell-padding` = `space-150`, `space-button-group-gap` = `space-200`.
- 네이밍 규칙: **`property-element-role-variant-state`**.
  - property: `bg` / `text` / `border` / `icon`
  - element: `surface`(카드 같은 큰 면) / `fill`(버튼 같은 작은 채움)
  - role: `brand`, `info`, `success`, `critical`, `caution`, `magic`(AI 기능용), `secondary`, `focus`
  - variant: `on-bg-fill`, `inverse`; state: `hover`, `active`, `selected`, `disabled`
  - 실제 예: `color-bg-surface`, `color-bg-fill-brand-hover`, `color-text-brand-on-bg-fill`, `color-border-focus`, `color-icon-critical`. CSS에서는 `--p-` 접두사(`--p-color-bg-surface`, `--p-space-400`).
- 스케일 (size 키 = 4px×(키/100)):
  - space: `space-0, 025(1px), 050(2px), 100(4px), 150(6px), 200(8px), 300(12px), 400(16px), 500(20px), 600(24px), 800(32px), 1000(40px), 1200(48px), 1600(64px), 2000(80px), 2400(96px), 2800(112px), 3200(128px)`. **숫자 = 4px의 배수×100** 이라 중간값(150, 050) 삽입이 자연스러운 네이밍.
  - 색 primitive 팔레트: gray, blackAlpha, azure, blue, green, yellow, orange, red, purple, magenta, rose, lime, teal (각 1~16 단계).
  - 토큰 그룹 파일: `color, space, border, font, shadow, motion, breakpoints, height, width, zIndex, text` (polaris-tokens/src/themes/base). border-radius·font-size·shadow·motion도 같은 숫자 스케일 방식(예: `border-radius-200`, `font-size-325`, `shadow-100`, `motion-duration-200`) — 개별 값은 미확인.
- 포맷·도구: TypeScript 소스(`@shopify/polaris-tokens`)에서 CSS 변수/JSON/SCSS 등 빌드. DTCG 아님. 현행 web components에서는 토큰을 앱 개발자가 직접 쓰는 구조가 아님(컴포넌트 prop으로만 노출) — 공개 토큰 API 여부 미확인.

## 4. 테마 · 다크모드 · 브랜드 확장
- 의도적으로 **브랜드 확장 불가**: 앱은 Shopify admin의 시각 언어를 상속하는 게 목표. Polaris React 시절에도 테마 커스터마이즈는 매우 제한적이었고(`themes` 구조는 내부용), web components는 CSS를 Shadow DOM 안에 캡슐화.
- 다크모드: 구 polaris-tokens에 `themes`(base, light-high-contrast-experimental 등) 구조가 있었음. 현행 web components의 다크모드 지원 여부 미확인.
- Checkout surface는 머천트가 Checkout branding API로 브랜딩을 바꾸고, 앱 확장은 그 브랜딩을 따라감(앱이 직접 색을 지정하지 않음).

## 5. 컴포넌트
- 개수·범위 (App Home 기준 **50개, 7 카테고리**): Actions 6(Button, Button group, Clickable, Clickable chip, Link, Menu) / Feedback 5(Badge, Banner, Empty state, Progress, Spinner) / Forms 17(Checkbox, Choice list, Color/Date/Email/Money/Number/Password/Search/URL field, Color picker, Date picker, Drop zone, Select, Switch, Text area, Text field) / Layout 10(Box, Divider, Grid, Ordered/Unordered list, Page, Query container, Section, Stack, Table) / Media 4 / Overlays 2(Modal, Popover) / Typography 6(Chip, Heading, Number, Paragraph, Text, Tooltip). surface마다 사용 가능한 부분집합이 다름.
- API 스타일: `s-` 접두 커스텀 엘리먼트(`<s-button variant="primary">`), 전역 등록이라 import 불필요. App Home은 `<script>`로 `polaris.js`(+ `app-bridge.js`) CDN 로드, 확장은 `api_version = 2025-10` 이상 + Preact.
  - Button props: `variant`(auto/primary/secondary/tertiary), `tone`(auto/neutral/critical), `icon`, `loading`, `disabled`, `href`, `target`, `download`, `type`, `accessibilityLabel`, `inlineSize`(auto/fill/fit-content), `commandFor`+`command`(다른 요소를 ID로 제어, HTML Invoker Commands 스타일), `interestFor`(hover/focus로 popover/tooltip 연결).
  - **variant(위계)와 tone(의미)을 분리**한 것이 핵심. `auto` 값으로 컨텍스트에 맞게 자동 결정.
  - 레이아웃은 `inlineSize`, `blockSize` 등 **logical property 네이밍**.
- 눈에 띄는 것: 도메인 특화 필드(`Money field`, `Color field`), `Query container`(컨테이너 쿼리), `Setup guide` 패턴, AI 기능용 `magic` 색 역할.

## 6. 문서 구성
- 사이트 구조 (현행 shopify.dev 분산형):
  - **API 레퍼런스**: shopify.dev/docs/api/polaris → surface별(App Home / Admin / Checkout / Customer account / POS) 컴포넌트, 버전별(v1.0, latest, v2.0-rc) 문서.
  - **Patterns**: App Home patterns — **Templates 4**(Homepage, Index, Details, Settings) + **Compositions 10**(Account connection, App card, Callout card, Footer help, Index table, Interstitial nav, Media card, Metrics card, Resource list, Setup guide). 템플릿 = 전체 페이지, 컴포지션 = 여러 컴포넌트를 묶은 작업 단위.
  - **App Design Guidelines**(shopify.dev/docs/apps/design): Visual design, Layout, App structure, Content(Voice and tone / Product content / Grammar and mechanics), Accessibility, Built for Shopify 요구사항.
  - 구 polaris.shopify.com의 Foundations/Content/Patterns/Tokens/Icons 통합 구조는 해체됨.
- 컴포넌트 페이지 한 장: 인트로+기본 코드 → Use cases → Properties → Events(`blur/click/focus`) → Slots → Examples(~10개) → **Best practices** → **Limitations**. 접근성은 별도 섹션 없이 props/Best practices/Limitations에 녹여 둠. "Limitations" 섹션(예: 비동기 작업엔 `disabled` 대신 `loading`, disabled 버튼은 탭 순서에서 빠지니 이유를 설명할 것)이 특히 실용적.
- **콘텐츠 가이드 핵심 규칙** (이 DS를 보는 주 목적):
  - Voice는 고정, tone은 상황(일상 작업 / 학습 / 단순 오류 / 완료 확인 / 행동 유도 / 심각한 문제 / 새 기능 / 축하)에 따라 조절. 상황별 표를 둠.
  - 4개 보이스 축 "X but not Y": real but not too tough or overly familiar / proactive but not needy or pushy / dynamic but not scattered / guide but don't handhold.
  - CTA는 강한 동사로 시작, 능동태. 같은 행동엔 같은 단어("Upload images" vs "Add photos" 혼용 금지, "Delete product"/"Delete collection"처럼 패턴 일관).
  - 미국 7학년 읽기 수준, 전문용어·관용구 금지, 필러 텍스트·말줄임표 금지.
  - 오류: 무엇이 일어났고 어떻게 고치는지. "fatal", "invalid" 같은 극적 단어와 raw error code 금지.
  - 완료: 단순 확인("Product saved" 토스트). 사소한 걸 "성공"이라 부르거나 사용자가 기뻐할 거라 가정하지 말 것. 축하는 중요한 마일스톤에만.
  - 사용자의 감정을 단정하지 말 것. 결과를 약속하지 말 것.
  - 기호·약어 대신 단어, 날짜·숫자는 admin과 같은 형식.

## 7. 접근성
- 컴포넌트에 `accessibilityLabel` prop을 일관되게 제공, 아이콘 전용 버튼은 라벨 필수(Best practices).
- 앱 레벨 가이드: shopify.dev/docs/apps/build/accessibility (WCAG 기반 — 구체 레벨 표기는 미확인). Built for Shopify 인증 요구사항에 디자인/접근성 항목 포함.
- 구 polaris.shopify.com에는 Foundations > Accessibility 페이지가 있었으나 현재 위치 미확인.

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- **Shopify Dev MCP**: `claude mcp add --transport stdio shopify-dev-mcp -- npx -y @shopify/dev-mcp@latest`. 로컬 실행, 인증 불필요. 문서·API 스키마 검색, GraphQL/Liquid/확장 검증.
- **Shopify AI Toolkit (skills/plugin)**: `npx skills add Shopify/shopify-ai-toolkit`. 통합 `shopify` 스킬이 Polaris 포함 전 surface 커버(구 per-surface 스킬 deprecated). 2026-06-11부터 React 확장 → Preact + Polaris web components 마이그레이션(레거시 컴포넌트 매핑)을 에이전트로 수행.
- 문서 페이지마다 **`.md` 버전** 제공(예: `.../voice-and-tone.md`, `.../button.md`) → LLM이 마크다운으로 직접 읽기 쉬움. shopify.dev/llms.txt는 404(미제공 확인).
- Polaris stable 발표에서 "Cursor, Copilot, Claude Code용 패턴"을 문서·MCP에 포함했다고 명시.

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: 토큰 공유가 아니라 **컴포넌트 API를 공유**. 같은 `s-*` 컴포넌트 어휘를 Admin(웹·모바일 앱), Checkout, POS 확장에서 사용하고, 각 호스트가 렌더링. POS 확장은 iOS/Android POS 앱 안에서 실행되지만 네이티브 렌더링 방식의 세부는 미확인. Swift/SwiftUI용 공개 Polaris 패키지는 없음(미확인).
- 시사점: "의미 단위 API(variant/tone)를 플랫폼 공통으로 정하고 렌더링은 플랫폼별로"라는 접근은 웹+iOS 개인 DS에 그대로 적용 가능.

## 10. 내 DS로 가져올 것 (1~3개)
1. **짧은 콘텐츠/보이스 가이드 1페이지**: Polaris의 상황별 tone 표를 축소해 내 DS의 `content.md`에 넣기 — (a) 버튼은 동사+명사("프로젝트 삭제"), 같은 행동엔 같은 단어, (b) 오류 = 무슨 일 + 해결법, "실패/잘못된" 같은 극적 단어·에러 코드 노출 금지, (c) 완료 토스트는 "저장됨" 수준, 과한 축하 금지, (d) 필러·말줄임표 금지. Claude Code가 UI 문구를 쓸 때 이 파일을 참조하게 하면 효과가 가장 큼.
2. **`variant`(위계) × `tone`(의미) 분리 + `property-element-role-state` 색 네이밍**: 버튼 등에 `variant: primary|secondary|tertiary`, `tone: neutral|critical`을 따로 두고, 색 토큰은 `bg-surface`, `bg-fill-critical`, `text-on-fill`, `border-focus`처럼 짓기. 웹 CSS 변수와 SwiftUI enum에 같은 이름을 쓸 수 있음. 간격은 `space-100=4px, 400=16px` 숫자 규칙(×100)을 채택하면 중간값 추가가 쉬움.
3. **컴포넌트 문서에 "Limitations" 섹션 + 페이지 패턴을 Templates/Compositions로 분리**: 내 DS 문서에 Index/Details/Settings 같은 3~4개 페이지 템플릿과 "Setup guide", "Empty state" 같은 컴포지션을 정의해 두면, AI 에이전트에게 "Settings 템플릿으로 만들어"처럼 큰 단위로 지시 가능.

## 11. 가져오지 않을 것 / 주의
- 브랜드 확장 불가 철학(호스트 앱 룩 상속)은 개인 DS 목표와 반대 → 토큰/테마 구조 자체는 shadcn 쪽이 더 적합.
- Shopify 도메인 컴포넌트(Money field, Resource list 등)와 surface별 부분집합 개념은 불필요.
- 문서가 shopify.dev 여러 곳에 흩어져 있고 버전(v1.0/latest/v2.0-rc)이 공존 → 인용 시 버전 확인 필요. 구 polaris.shopify.com 링크는 대부분 리다이렉트/소실.
- 토큰 네이밍(`color-text-emphasis-on-bg-fill-hover` 등)은 대규모 팀용이라 길다. 개인 DS는 세그먼트를 줄일 것.

## 출처
- https://shopify.dev/docs/api/polaris
- https://shopify.dev/docs/api/app-home/polaris-web-components
- https://shopify.dev/docs/api/app-home/polaris-web-components/actions/button
- https://shopify.dev/docs/api/app-home/patterns
- https://shopify.dev/docs/apps/design
- https://shopify.dev/docs/apps/design/content.md
- https://shopify.dev/docs/apps/design/content/voice-and-tone.md
- https://shopify.dev/docs/apps/build/devmcp
- https://shopify.dev/changelog/blog/polaris-goes-stable-the-future-of-shopify-app-development-is-here
- https://shopify.dev/changelog/shopify-ai-toolkit-for-upgrading-extensions-to-polaris-web-components
- https://github.com/Shopify/polaris (아카이브, polaris-tokens/src/themes/base/*.ts, polaris-tokens/src/size.ts)
- https://community.shopify.dev/t/is-polaris-shopify-com-going-to-be-shut-down/26216
