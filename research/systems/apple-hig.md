# Apple Human Interface Guidelines — 읽기 노트

> 회사: Apple · 공식 문서: https://developer.apple.com/design/human-interface-guidelines · 라이선스/사용 범위: 가이드라인은 공개 열람, 시스템 폰트(SF/NY)·SF Symbols·Apple Design Resources는 Apple 플랫폼용 앱 제작 목적에 한정된 라이선스 · 플랫폼: iOS, iPadOS, macOS, tvOS, visionOS, watchOS (웹은 대상 아님) · 조사일: 2026-11-13

## 1. 한 줄 정리
_토큰 파일을 배포하는 DS가 아니라 "시스템이 제공하는 semantic color·text style·컴포넌트를 그대로 쓰라"는 플랫폼 가이드이며, 2025년부터 Liquid Glass 머티리얼로 전 플랫폼 디자인 언어가 통일됐다._

## 2. 핵심 원칙 / 철학
- **시스템 우선**: 색 값을 하드코딩하지 말고 API(`UIColor`/`Color`의 system·semantic color, text style)를 쓰라. 문서에 적힌 색 값도 "릴리스마다 바뀔 수 있다"고 명시.
- **Hierarchy / Harmony / Consistency**: 콘텐츠가 주인공, 컨트롤은 그 위에 떠 있는 기능 레이어.
- **Liquid Glass** (iOS 26 세대, 2025): 탭 바·사이드바·툴바 같은 컨트롤/내비게이션을 콘텐츠 위에 뜬 반투명 유리 레이어로 분리. "콘텐츠 레이어에는 Liquid Glass를 쓰지 말 것", "아껴 쓸 것"이 핵심 규칙.
- 접근성 원칙: Intuitive / Perceivable / Adaptable.
- 버튼은 크기가 아니라 **스타일과 role**로 우선순위를 표현 (normal / primary / cancel / destructive).

## 3. 토큰 구조 · 네이밍
- 계층 (primitive → semantic → component 등): 공개 토큰 계층 없음. 사실상 **system color(primitive 성격) → dynamic semantic color(semantic) → 시스템 컴포넌트 내부 스타일(비공개)** 구조. 개발자는 semantic 레벨만 다루는 것이 원칙.
- 네이밍 규칙 예시 (실제 토큰 이름 2~3개): "외형이 아니라 목적"으로 명명.
  - 전경: `label`, `secondaryLabel`, `tertiaryLabel`, `quaternaryLabel`, `placeholderText`, `separator`, `opaqueSeparator`, `link`
  - 배경: `systemBackground` / `secondarySystemBackground` / `tertiarySystemBackground`, 그룹 테이블용 `systemGroupedBackground` / `secondarySystemGroupedBackground` / `tertiarySystemGroupedBackground` (primary=전체 뷰, secondary=그룹, tertiary=그룹 안의 그룹)
  - 시스템 색: `systemRed`, `systemBlue` … , `systemGray`~`systemGray6`, fill 계열 `systemFill` 등
- 색 / 타이포 / 간격 / 라운드 / 그림자 / 모션 스케일:
  - **타이포 (iOS Dynamic Type, 기본 Large 사이즈, pt size/leading, 기본 weight → emphasized weight)**: Large Title 34/41 Regular→Bold · Title 1 28/34 · Title 2 22/28 · Title 3 20/25 (→Semibold) · Headline 17/22 Semibold · Body 17/22 · Callout 16/21 · Subhead 15/20 · Footnote 13/18 · Caption 1 12/16 · Caption 2 11/13. 총 11 스타일, xSmall~xxxLarge 7단계 + 접근성 AX1~AX5 크기별 표 제공. iOS 기본 17pt, 최소 11pt.
  - 폰트: SF Pro(+Rounded, Compact, Mono 등), 세리프 NY. 가변 폰트 + dynamic optical size. Ultralight/Thin/Light는 작은 글씨에서 피할 것.
  - **간격**: 공식 spacing 스케일 없음. 대신 layout guide·safe area·system margin을 쓰라고 안내. 수치 가이드는 접근성 페이지의 "베젤 있는 요소 주변 약 12pt, 베젤 없는 요소 약 24pt 패딩" 정도. (표준 레이아웃 마진 16/20pt 값은 HIG 본문에서 미확인)
  - **라운드**: 공개 radius 스케일 없음 (Liquid Glass 세대의 concentric corner 개념이 있으나 HIG 내 수치는 미확인).
  - **그림자/깊이**: 그림자 토큰 대신 **materials** — Liquid Glass(regular / clear 2변형) + 표준 머티리얼 4종 `ultraThin` / `thin` / `regular`(기본) / `thick`, 그 위에 쓰는 vibrant label/fill/separator 색. clear 유리 위 밝은 배경엔 35% 불투명도 dimming layer 권장.
  - **모션**: 토큰 없음. Reduce Motion 존중, 시스템 애니메이션 사용 권장.
- 포맷·도구 (DTCG JSON, Style Dictionary, Figma Variables 등): 토큰 파일 미배포. **Apple Design Resources**(Figma/Sketch 등 UI 킷, SF Symbols 앱), Xcode **asset catalog**의 Color Set(Any/Dark/High Contrast appearance 변형)이 실질적인 "토큰 저장소".

## 4. 테마 · 다크모드 · 브랜드 확장
- 모든 dynamic system color는 **light / dark / increased contrast(light·dark)** 4가지 변형을 자동 보유. 커스텀 색도 이 4개를 모두 정의하라고 요구 ("단일 모드 앱이라도 Liquid Glass 적응을 위해 light·dark 둘 다 제공").
- 다크모드 배경은 **base / elevated** 두 세트: 앞으로 나온 인터페이스(popover, modal sheet)는 자동으로 더 밝은 elevated 배경 → 그림자 없이 깊이 표현.
- 브랜드 확장은 **accent color(tint) 하나**가 중심. prominent 버튼 배경에 accent 적용, destructive는 system red. Liquid Glass에는 색을 "아껴서", 라벨이 아니라 배경에 적용.
- 시맨틱 의미 재정의 금지 (예: separator 색을 텍스트에 쓰지 말 것).

## 5. 컴포넌트
- 개수·범위: Components 섹션 8개 카테고리, 총 **64개 페이지** — Content 4, Layout and organization 10, Menus and actions 12, Navigation and search 5, Presentation 8, Selection and input 11, Status 4, System experiences 10(위젯, Live Activities, 알림, 컨트롤 등). 여러 플랫폼 공용이라 iOS에 해당 없는 항목(Dock menus, menu bar 등) 포함.
- API 스타일 (props, 합성 패턴, variant 네이밍): SwiftUI 기준 **modifier 합성** — `.buttonStyle(.borderedProminent)`, `.font(.body)`, `.foregroundStyle(.secondary)`, `.tint(...)`, `role: .destructive`. variant는 style 프로토콜, 의미는 role로 분리.
- 눈에 띄는 컴포넌트/패턴: 버튼 role 4종(normal/primary/cancel/destructive), Patterns 섹션 25개(Loading, Onboarding, Settings, Undo and redo, Feedback, Modality 등) — 컴포넌트보다 "흐름" 가이드가 풍부. SF Symbols(텍스트와 weight·크기 자동 정렬).

## 6. 문서 구성
- 사이트 구조 (Foundations / Components / Patterns / Content …): 최상위 6개 — **Getting started / Foundations(18: Accessibility, App icons, Branding, Color, Dark Mode, Icons, Images, Immersive experiences, Inclusion, Layout, Materials, Motion, Privacy, Right to left, SF Symbols, Spatial layout, Typography, Writing) / Patterns(25) / Components(64) / Inputs / Technologies**.
- 컴포넌트 페이지 한 장의 구성 (사용 시점, Do/Don't, 접근성, 코드 …): 한 줄 abstract("A button initiates an instantaneous action.") → **Best practices**(굵은 문장 규칙 + 설명) → 주제별 섹션(Style, Content, Role …) → **Platform considerations**(iOS/iPadOS, macOS, visionOS, watchOS별 차이) → Resources → Related → **Developer documentation**(SwiftUI/UIKit/AppKit API 링크) → **Change log**(날짜별 변경, 예: Buttons 2025-12-16 "Updated guidance for Liquid Glass"). 측정값·토큰 테이블·코드 예제는 거의 없음.

## 7. 접근성
- **최소 컨트롤 크기**: iOS/iPadOS 기본 44×44pt, 최소 28×28pt · macOS 28/20 · tvOS 66/56 · visionOS 60/28 · watchOS 44/28. 버튼 hit region 44×44pt(visionOS 60×60pt).
- **대비 (WCAG AA 기반)**: 17pt 이하 텍스트 4.5:1, 18pt 이상 또는 Bold 3:1. WCAG와 APCA 둘 다 언급. 기본 대비가 부족하면 최소한 Increase Contrast 설정 시 고대비 스킴 제공.
- **텍스트 확대**: 최소 200%(watchOS 140%) 확대 지원, Dynamic Type 채택, 큰 글씨에서 truncation 최소화·스택 레이아웃 전환·다열→단열.
- 색 외 수단 병행(아이콘·모양), VoiceOver 설명, Reduce Motion / Reduce Transparency / Bold Text 대응, Accessibility Inspector로 감사, App Store의 Accessibility Nutrition Labels.

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- **llms.txt 없음**: `developer.apple.com/llms.txt` 404 (2026-11-13 확인).
- HIG 웹페이지는 JS 렌더링이라 일반 fetch로 본문이 안 보임. 그러나 **DocC JSON 엔드포인트** `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/{slug}.json`(예: `color.json`, `typography.json`, `buttons.json`)이 본문 전체를 구조화 JSON으로 반환 → 에이전트가 직접 읽을 수 있는 사실상의 기계 판독 소스 (비공식 경로, 안정성 보장 없음).
- **Xcode 26.3 (2026-02)**: Claude Agent·Codex 기반 agentic coding 지원, Xcode 기능을 **MCP**로 노출(`xcrun mcpbridge`). 에이전트가 프리뷰 실행·Apple 문서 참조 가능하다는 보도가 있으나, HIG 전용 MCP 도구가 있는지는 미확인.
- 공식 DESIGN.md / 스킬 형태 배포 없음 (미확인 범위 내).

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: Apple 내부적으로는 같은 semantic 이름을 UIKit(`UIColor.label`)·SwiftUI(`Color.primary`, `.secondary`)·AppKit(`NSColor.labelColor`)에 매핑하지만 **웹으로의 export는 없음**. 웹에서 iOS 느낌을 내려면 CSS의 `-apple-system`/`system-ui` 폰트, `prefers-color-scheme`, `prefers-contrast`, `prefers-reduced-motion`으로 개념만 대응시켜야 함.
- 개인 DS 관점: 웹이 토큰의 원본이 되고, iOS는 내 토큰을 **asset catalog Color Set(Any/Dark/High Contrast)** 으로 생성해 넣되 텍스트는 Dynamic Type text style에 매핑하는 방식이 HIG와 충돌이 적음.

## 10. 내 DS로 가져올 것 (1~3개)
1. **text style 이름을 Dynamic Type 11단계에 맞추기**: 내 DS 타이포 토큰을 `largeTitle / title1 / title2 / title3 / headline / body / callout / subhead / footnote / caption1 / caption2`로 정의하고, 웹 값은 기본 Large 사이즈(34/28/22/20/17/17/16/15/13/12/11pt)를 rem으로 옮긴다. iOS에서는 `.font(.body)`로 1:1 매핑되어 Dynamic Type을 공짜로 얻는다.
2. **semantic 색은 4변형(light/dark × 기본/고대비)으로 정의**하고, 배경은 primary/secondary/tertiary 3단계 + 다크모드 elevated 개념을 둔다. 토큰 빌드 결과를 CSS(`prefers-color-scheme`, `prefers-contrast: more`)와 Xcode asset catalog 양쪽에 생성.
3. **컴포넌트 문서 템플릿에 "Platform considerations"와 "Change log" 섹션 추가**: 웹/iOS 차이와 변경 이력을 한 페이지에 두면 AI 에이전트가 플랫폼별로 다른 구현을 헷갈리지 않는다. 최소 터치 타깃 44×44pt도 공통 규칙으로 명시.

## 11. 가져오지 않을 것 / 주의
- Liquid Glass를 웹에서 흉내 내지 말 것 (backdrop-filter 남용은 성능·가독성 문제, HIG 자체도 "아껴 쓰라"고 함). iOS에서는 시스템 컴포넌트가 자동 적용하므로 커스텀 유리 효과도 최소화.
- HIG에는 spacing/radius/shadow 스케일이 없음 → 이 부분은 다른 DS(Fluent의 4px 램프 등)에서 가져와야 함.
- 문서의 색 hex 값을 복사해 하드코딩하지 말 것 (릴리스마다 변함). iOS에선 가능하면 system/semantic color 직접 사용.
- SF 폰트·SF Symbols는 Apple 플랫폼 외(웹) 사용 라이선스 제약 → 웹은 system-ui 폰트 스택으로.
- DocC JSON 엔드포인트는 비공식 → 에이전트 워크플로에 의존하되 깨질 수 있음을 전제.

## 출처
- https://developer.apple.com/design/human-interface-guidelines (루트 구조)
- https://developer.apple.com/design/human-interface-guidelines/color (dynamic system color, Liquid Glass color, iOS 전경/배경 color)
- https://developer.apple.com/design/human-interface-guidelines/typography (Dynamic Type 사이즈 표, SF/NY, 최소 크기)
- https://developer.apple.com/design/human-interface-guidelines/accessibility (컨트롤 크기 표, 대비 표, 200% 확대)
- https://developer.apple.com/design/human-interface-guidelines/materials (Liquid Glass regular/clear, 표준 머티리얼 4종)
- https://developer.apple.com/design/human-interface-guidelines/dark-mode (base/elevated 배경)
- https://developer.apple.com/design/human-interface-guidelines/buttons (페이지 구조, role, 44×44pt, change log)
- https://developer.apple.com/design/human-interface-guidelines/layout (safe area, layout guide)
- 본문 수집 경로: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/color.json 등 DocC JSON
- Xcode 26.3 agentic coding/MCP 보도: https://techcrunch.com/2026/02/03/agentic-coding-comes-to-apples-xcode-26-3-with-agents-from-anthropic-and-openai/ , https://9to5mac.com/2026/02/26/apple-releases-xcode-26-3-with-support-for-agentic-coding/ (Apple 공식 릴리스 노트는 미확인)
- llms.txt 확인: https://developer.apple.com/llms.txt (404)
