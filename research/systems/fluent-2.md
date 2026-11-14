# Microsoft Fluent 2 — 읽기 노트

> 회사: Microsoft · 공식 문서: https://fluent2.microsoft.design · 라이선스/사용 범위: 가이드라인 공개, 구현 라이브러리(Fluent UI React v9, Web Components v3, fluentui-apple, fluentui-android, Fluent UI Blazor)는 MIT · 플랫폼: Web(React / Web Components / Blazor), iOS·macOS, Android, Windows · 조사일: 2026-11-13

## 1. 한 줄 정리
_global → alias 2계층 토큰을 Web·iOS·Android에 같은 이름 체계로 배포하고, 플랫폼마다 "그 플랫폼에서 자연스러운" 컴포넌트를 따로 만드는 멀티플랫폼 DS — 세 DS 중 웹+iOS 토큰 공유 사례로 가장 직접적인 레퍼런스._

## 2. 핵심 원칙 / 철학
- **Natural on every platform**: 기기에 맞게 적응하고 사람들이 이미 아는 방식 위에 짓는다 (iOS 컴포넌트는 iOS답게).
- **Built for focus**: 방해 요소를 줄이고 행동을 쉽게.
- **One for all, all for one**: 다양한 관점·능력을 초기부터 포함 (inclusive design).
- **Unmistakably Microsoft**: 공유 시각 요소로 하나의 브랜드.
- Fluent 1 대비 변화: 통합 색 체계, 토큰 체계, 표준화된 corner, 커스터마이즈, 사용 가이드, 접근성 주석(annotation).

## 3. 토큰 구조 · 네이밍
- 계층 (primitive → semantic → component 등): **Global(맥락 무관 raw 값) → Alias(의미 부여)** 2계층이 공식. iOS 구현(fluentui-apple)에는 추가로 **Control token set**(컴포넌트별 토큰) 레이어가 존재. 그림자·타이포 alias는 여러 global 값을 묶은 복합 토큰.
- 네이밍 규칙 예시 (실제 토큰 이름 2~3개): **camelCase**, `color + 카테고리(Neutral/Brand/Status/Palette) + 역할(Background/Foreground/Stroke/Shadow) + 번호/변형 + 상태(Hover/Pressed/Selected/Disabled)`.
  - `colorNeutralForeground1`, `colorNeutralForeground1Hover`, `colorNeutralBackground2`, `colorBrandBackground`(+`Hover`/`Pressed`/`Selected`), `colorBrandForegroundLink`, `colorNeutralStroke1`, `colorStatusDangerBackground3`, `colorPaletteRedBackground2`
  - 간격: `spacingHorizontalM`, `spacingVerticalXXL` / 라운드: `borderRadiusMedium` / 타입: `fontSizeBase300`, `lineHeightHero800` / 모션: `durationNormal`
  - light/dark 매핑 예: `colorNeutralForeground1` = light `grey[14]` / dark `white`, `colorBrandBackground` = light `brand[80]` / dark `brand[70]`.
  - React v9 기준 light 테마 alias 색 토큰 약 180여 개(lightColor.ts 기준 대략치).
- 색 / 타이포 / 간격 / 라운드 / 그림자 / 모션 스케일:
  - **간격 (디자인 사이트 global ramp, 4px 기반, 2/6/10 보정값 포함)**: `size20`=2, `size40`=4, `size60`=6, `size80`=8, `size100`=10, `size120`=12, `size160`=16, `size200`=20, `size240`=24, `size280`=28, `size320`=32, `size360`=36, `size400`=40, `size480`=48, `size520`=52, `size560`=56. (iOS pt / Android dp / Web px로 같은 숫자)
  - **간격 (React v9 alias)**: None 0 · XXS 2 · XS 4 · SNudge 6 · S 8 · MNudge 10 · M 12 · L 16 · XL 20 · XXL 24 · XXXL 32 — Horizontal/Vertical 두 벌.
  - **타이포 (web, size/line-height px)**: Base100 10/14 · 200 12/16 · 300 14/20 · 400 16/22 · 500 20/28 · 600 24/32 · Hero700 28/36 · 800 32/40 · 900 40/52 · 1000 68/92. 스타일: `caption2`(100), `caption1`(200), `body1`(300), `body2`/`subtitle2`(400), `subtitle1`(500), `title3`(600), `title2`(700), `title1`(800), `largeTitle`(900), `display`(1000) + `Strong`(semibold)/`Stronger`(bold) 변형. 폰트: Segoe UI → `-apple-system` 폴백. iOS 쪽 타이포 토큰도 `display, largeTitle, title1~3, body1/body1Strong, body2/body2Strong, caption1/caption1Strong, caption2/caption2Strong`로 같은 이름 계열.
  - **라운드**: 디자인 사이트 기준 None 0 · Small 2 · Medium 4 · Large 8 · X-Large 12 · Circle 50%. 코드(React v9 tokens)는 None 0 · Small 2 · Medium 4 · **Large 6 · XLarge 8** · 2XLarge 12 · 3XLarge 16 · 4XLarge 24 · 5XLarge 32 · 6XLarge 40 · Circular 10000px → **문서와 코드 값이 불일치** (주의).
  - **그림자**: `shadow2 / 4 / 8 / 16 / 28 / 64` (숫자 = blur px). key + ambient 두 그림자를 합성, dark 테마는 불투명도가 더 높음. brand 그림자 변형(`shadow4Brand` 등)도 있음(코드 기준, 세부 미확인). 2=카드, 8=커맨드바/툴팁, 16=콜아웃·호버카드, 28=시트·사이드 내비, 64=다이얼로그 정도의 용도 구분.
  - **모션 duration**: UltraFast 50ms · Faster 100 · Fast 150 · Normal 200 · Gentle 250 · Slow 300 · Slower 400 · UltraSlow 500 + `curve*` easing 토큰.
- 포맷·도구 (DTCG JSON, Style Dictionary, Figma Variables 등): 토큰 원본 JSON은 **W3C DTCG 초안 포맷**으로 전환. 이를 각 플랫폼 코드로 변환하던 `fluentui-token-pipeline`은 **2026-06-15 아카이브**(“새 의존성 추가 금지”). 디자인 쪽은 Figma Fluent 2 Web / iOS UI Kit. React v9에서는 토큰을 CSS 변수(`var(--colorNeutralForeground1)`)로 주입하고 `tokens.colorNeutralForeground1` 객체로 참조.

## 4. 테마 · 다크모드 · 브랜드 확장
- **브랜드 램프 16단계**: `BrandVariants = {10, 20, …, 160}` 16개 hex만 넣으면 `createLightTheme(brand)` / `createDarkTheme(brand)` / `createHighContrastTheme()` / `createTeamsDarkTheme()`가 전체 alias를 생성. 기본 제공 `webLightTheme`, `webDarkTheme`, `teamsHighContrastTheme`.
- 다크모드 = **같은 alias, 다른 global 단계**를 가리키는 매핑 테이블 (문서에 alias | light global | dark global 3열 표).
- 고대비: Windows high contrast용 테마 별도 (웹 `createHighContrastTheme`), 디자인 사이트 color-tokens 페이지에는 HC 매핑 설명이 없음(미확인).
- 팔레트 3종: **Neutral**(표면·텍스트) / **Shared**(M365 공용, 상태·아바타 색 — `colorPalette*`, `colorStatus*`) / **Brand**(제품색, CTA·선택 상태; 큰 면적 금지).
- 상호작용 상태: rest → hover → pressed/selected로 **어두워짐**(Windows는 반대로 밝아짐). focus는 색이 아니라 **두꺼운 stroke**로 표시.
- iOS: `FluentTheme`의 color token이 `DynamicColor(light:, dark:, darkElevated:)` 구조 → iOS 다크모드의 elevated 배경 개념까지 토큰에 반영.

## 5. 컴포넌트
- 개수·범위: 디자인 사이트 기준 **Web React 47개**(Accordion, Avatar, Badge, Button, Card, Carousel, Combobox, Dialog, Drawer, Dropdown, Field, Menu, MessageBar, Nav, Popover, Tablist, TagPicker, Toast, Toolbar, Tooltip, Tree 등), **iOS 12개**(Activity indicator, Avatar, Avatar group, Button, Card nudge, Heads-up display, Navigation bar, Progress bar, Segmented control, Shimmer, Text field, Tooltip), Android 페이지 일부. → iOS는 "플랫폼 기본 컴포넌트로 부족한 것만" 제공.
- API 스타일 (props, 합성 패턴, variant 네이밍): React v9는 `appearance="primary" | "outline" | "subtle" | "transparent"`, `size="small" | "medium" | "large"`, `shape` 등 prop 기반 variant + **slot** 합성 패턴, 스타일은 Griffel `makeStyles` + `tokens.*`. iOS는 UIKit/SwiftUI 컨트롤 + control token set 오버라이드.
- 눈에 띄는 컴포넌트/패턴: `FluentProvider`(테마 주입 루트), `Field`(label·validation·hint를 입력 컴포넌트와 분리한 래퍼), Button 계열(Split / Menu / Compound / Toggle). AI 경험 가이드 페이지들(아래 6·8번) — Copilot 오류, 대기 UX(wait-ux), 진입점, 온보딩, Responsible AI.

## 6. 문서 구성
- 사이트 구조 (Foundations / Components / Patterns / Content …): **Get started**(design / develop / contribute / what's new) · **Design language**(design-principles, personality-principles, color, color-tokens, design-tokens, elevation, iconography, layout, material, motion, shapes, typography) · **Accessibility / Content design / Handoffs** · **AI 관련**(responsible-AI, ai-harm, copilot-errors, data-usage-sharing, entry-points, onboarding, wait-ux, content-engineering — 프롬프트·eval 작성법 14개 페이지) · **Components**(Web 62 / iOS 13 / Android 6 페이지, sitemap 기준) · component-roadmap.
- 컴포넌트 페이지 한 장의 구성 (사용 시점, Do/Don't, 접근성, 코드 …): 플랫폼별 별도 페이지(`/components/web/react/core/button/usage`). 한 페이지 스크롤 + "On this page" — **Resources**(Figma·Storybook 링크) → **Types**(Button/Split/Menu/Compound) → **Behavior** → **Layout**(Do/Don't 이미지) → **Accessibility**(상태 전달, 대비, tooltip·ARIA label) → **Content**(버튼 문구 규칙: "Apply vs Save" 등). 코드·props는 Storybook(React)으로 분리.

## 7. 접근성
- 대비: 일반 텍스트 4.5:1, 큰 텍스트(18.5px Bold 이상 또는 24px Regular 이상) 3:1, 아이콘 등 비텍스트 3:1.
- 키보드: 포커스는 "z" 패턴(좌→우, 위→아래), 다이얼로그 같은 임시 UI가 닫혀도 포커스를 잃지 않게.
- 확대: 400% 줌에서 가로 스크롤 없이 reflow(320px 브레이크포인트까지 설계), 텍스트 200% 확대.
- 스크린리더: 대체 텍스트, 논리적 heading 순서, WAI-ARIA Authoring Practices 준수, **디자인 스펙에 포커스 순서·스크린리더 annotation 기록**(handoff 단계에서).
- 최소 터치 타깃 수치는 accessibility 페이지에서 미확인.

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- **llms.txt 없음**: `fluent2.microsoft.design/llms.txt`는 404 페이지(HTML) 반환 (2026-11-13 확인).
- **공식 MCP (Blazor 한정)**: NuGet `Microsoft.FluentUI.AspNetCore.McpServer`(5.0.0-rc, 2026-02 발표) — Fluent UI Blazor 컴포넌트 문서를 AI에 제공, `.mcp.json`으로 VS Code / Visual Studio 2026 연동. **React v9 / iOS용 공식 MCP는 확인 못함** (커뮤니티 `blendsdk/fluentui-mcp`, `mcp-fluent-ui` 등만 존재).
- 디자인 사이트가 서버 렌더링(Astro)이라 일반 fetch로 본문을 읽을 수 있음 → 세 DS 중 에이전트가 직접 읽기 가장 쉬움. 토큰 원본도 GitHub의 TS/JSON이라 에이전트가 값 확인 가능.
- 반대 방향 콘텐츠: "AI 기능을 어떻게 디자인하나"(Copilot 오류, 대기 UX, Responsible AI, 프롬프트·eval을 다루는 content-engineering)가 공식 가이드에 포함된 점이 독특.

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: **같은 global ramp 숫자(4px 기반 size ramp, font size 100~1000, shadow 2~64)와 같은 alias 의미 이름**을 Web(`colorNeutralForeground1`)과 iOS(`FluentTheme` ColorToken `foreground1`, `background1Hover`, TypographyToken `body1Strong`, ShadowToken `shadow08`)에 각각 플랫폼 관용 표기로 생성. 단위만 px/pt/dp로 바뀜.
- 원본은 DTCG JSON → 코드 생성 파이프라인 구조였으나 그 파이프라인 repo는 아카이브됨 → 개인 DS라면 Style Dictionary 같은 범용 도구로 같은 구조를 재현하는 게 현실적.
- iOS 이름은 웹과 완전히 같진 않음 (`colorNeutralBackground1` ↔ `background1`, `shadow2` ↔ `shadow02`) → 플랫폼 간 이름 매핑 표가 필요.
- fluentui-apple 요구사항: iOS 17+ / macOS 14+, Xcode 26+, Swift Package Manager.

## 10. 내 DS로 가져올 것 (1~3개)
1. **상태를 토큰 이름의 접미사로**: `colorBrandBackground` / `…Hover` / `…Pressed` / `…Selected` / `…Disabled`처럼 상태별 색을 미리 토큰으로 정의. AI 에이전트가 hover 색을 임의로 `opacity`나 `darken()`으로 만들지 않고 이름만 붙이면 되므로 일관성이 크게 오른다.
2. **4px 기반 숫자형 global ramp + T-shirt alias 2계층**: global은 `size40`=4, `size80`=8 … 같은 숫자 이름(웹 px = iOS pt 그대로), alias는 `spacingS/M/L`처럼 의미 이름. 2/6/10 같은 "nudge" 보정값을 허용한 점도 아이콘 정렬에 실용적.
3. **브랜드 램프 16단계(10~160) → 테마 생성 함수**: `createLightTheme(brand)` / `createDarkTheme(brand)` 패턴을 축소해 "brand 램프 1개 + neutral 램프 1개 → light/dark alias 매핑 테이블" 하나로 웹 CSS 변수와 iOS asset catalog를 동시에 생성. alias | light | dark 3열 표 자체를 문서로 공개하는 방식도 그대로 차용.

## 11. 가져오지 않을 것 / 주의
- alias 색 토큰 180여 개는 개인 DS엔 과함 → Neutral Foreground 1~3, Background 1~3, Stroke 1~2, Brand, Status 정도로 축소.
- **문서와 코드 값 불일치**(radius Large 8 vs 6) 사례 → 내 DS는 토큰 원본 1곳에서 문서까지 생성할 것.
- 토큰 파이프라인이 아카이브됨 → Microsoft 도구 의존 금지, 구조만 차용.
- Segoe UI 폰트는 Microsoft 플랫폼 중심 → 웹은 system-ui 스택, iOS는 SF.
- Griffel(CSS-in-JS) 스타일 방식은 개인 프로젝트엔 과함 → CSS 변수 + Tailwind/plain CSS로 충분.
- 웹/iOS 이름 체계가 미묘하게 달라 혼란 → 내 DS는 플랫폼 간 같은 키 이름을 유지(대소문자 표기만 변환).

## 출처
- https://fluent2.microsoft.design (홈, 사이트 구조)
- https://fluent2.microsoft.design/design-principles
- https://fluent2.microsoft.design/design-tokens (global/alias 계층)
- https://fluent2.microsoft.design/color , https://fluent2.microsoft.design/color-tokens (팔레트, alias 네이밍, light/dark 매핑)
- https://fluent2.microsoft.design/layout (4px size ramp, 브레이크포인트)
- https://fluent2.microsoft.design/shapes (corner radius)
- https://fluent2.microsoft.design/elevation (shadow 2~64)
- https://fluent2.microsoft.design/accessibility
- https://fluent2.microsoft.design/components/web/react , https://fluent2.microsoft.design/components/ios , https://fluent2.microsoft.design/components/web/react/core/button/usage
- https://fluent2.microsoft.design/sitemap-0.xml (페이지 목록)
- https://github.com/microsoft/fluentui/tree/master/packages/tokens/src (borderRadius.ts, spacings.ts, fonts.ts, typographyStyles.ts, durations.ts, createLightTheme.ts, types.ts의 `BrandVariants`)
- https://github.com/microsoft/fluentui-apple (Sources/FluentUI_common/Core/Theme: `FluentTheme+Tokens.swift`, `DynamicColor.swift`)
- https://github.com/microsoft/fluentui-token-pipeline (DTCG 지원, 2026-06-15 아카이브)
- https://www.nuget.org/packages/Microsoft.FluentUI.AspNetCore.McpServer , https://blog-dvoituron.azurewebsites.net/2026/02/20/fluentui-blazor-mcp-server (Blazor MCP)
- llms.txt 확인: https://fluent2.microsoft.design/llms.txt (404)
