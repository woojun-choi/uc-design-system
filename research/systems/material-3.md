# Google Material Design 3 — 읽기 노트

> 회사: Google · 공식 문서: https://m3.material.io · 라이선스/사용 범위: 가이드라인은 공개, 구현 라이브러리(material-web, material-color-utilities, Compose Material3 등)는 Apache-2.0 · 플랫폼: Android(Compose/Views), Web(material-web), Flutter, (iOS는 공식 M3 네이티브 라이브러리 없음) · 조사일: 2026-11-13

## 1. 한 줄 정리
_하나의 seed color에서 HCT 색 공간으로 전체 color role을 계산해 내는 "알고리즘 기반 테마" DS이며, `ref → sys → component` 3계층 토큰으로 모든 플랫폼 구현을 묶는다._

## 2. 핵심 원칙 / 철학
- **Personal / adaptive**: 사용자의 배경화면 등에서 뽑은 색으로 UI 전체가 바뀌는 dynamic color(Material You)가 출발점.
- **Role 기반 설계**: 색·타입·모양을 "값"이 아니라 "역할(role)"로 지정 → 값이 바뀌어도 의미가 유지됨 (`primary`, `on-primary`, `surface-container-high` …).
- **Material 3 Expressive** (2025 발표): 더 큰 shape 대비, emphasized 타이포, spring 기반 motion으로 감정적 표현을 강화한 확장판. Compose API에는 `@Material3ExpressiveApi`로 노출.
- Accessibility와 contrast를 색 생성 알고리즘 자체에 내장 (tone 차이로 대비 보장).

## 3. 토큰 구조 · 네이밍
- 계층 (primitive → semantic → component 등): **Reference(`ref`) → System(`sys`) → Component** 3계층. component 토큰이 sys를 참조하고, sys가 ref 값을 참조 → 상위만 바꾸면 하위로 전파.
- 네이밍 규칙 예시 (실제 토큰 이름 2~3개): 패턴 `--md-[tier]-[category]-[role]-[property]`.
  - ref: `--md-ref-typeface-brand`, `--md-ref-typeface-plain` (스펙상 `md.ref.palette.primary40` 같은 tonal palette도 있으나 material-web은 palette 토큰 미지원)
  - sys: `--md-sys-color-primary`, `--md-sys-color-on-primary-container`, `--md-sys-color-surface-container-highest`, `--md-sys-shape-corner-small`, `--md-sys-typescale-body-medium-size`
  - component: `--md-filled-button-container-shape`, `--md-filled-button-label-text-color` (component 토큰에는 `comp` 접두사를 붙이지 않음)
- 색 / 타이포 / 간격 / 라운드 / 그림자 / 모션 스케일:
  - **색 role**: primary / secondary / tertiary / error 각각 + `on-*`, `*-container`, `on-*-container`. surface 계열: `surface`, `surface-dim`, `surface-bright`, `surface-container-lowest/low/(기본)/high/highest`, `on-surface`, `on-surface-variant`, `outline`, `outline-variant`. (모든 배경 role에 대응하는 `on-` 전경 role이 짝으로 존재)
  - **타입 스케일**: 5개 역할 × 3사이즈 = 15 스타일 — display / headline / title / body / label × large / medium / small. Baseline 값(sp, size/line-height): display L 57/64, M 45/52, S 36/44 · headline L 32/40, M 28/36, S 24/32 · title L 22/28, M 16/24, S 14/20 · body L 16/24, M 14/20, S 12/16 · label L 14/20, M 12/16, S 11/16. Expressive에서 15개 각각의 **Emphasized** 변형 추가 (`displayLargeEmphasized` … `labelSmallEmphasized`, Compose 기준).
  - **Shape(corner) 스케일**: none 0 · extra-small 4 · small 8 · medium 12 · large 16 · extra-large 28 · full. Expressive 추가분 `large-increased`(20) · `extra-large-increased`(32) · `extra-extra-large`(48). 기본 매핑 예: 텍스트필드·메뉴·스낵바=extraSmall, 칩=small, 카드=medium, FAB=large, 버튼=full. (Expressive 추가분의 dp 값은 Compose 레퍼런스에서 이름·순서만 확인, 정확한 dp는 미확인)
  - **간격**: 4dp 기반 그리드 (8dp 단위 권장). 별도 spacing 토큰 세트는 공식 sys 토큰으로 노출되지 않음.
  - **Elevation**: level 0~5 (0, 1, 3, 6, 8, 12dp). M3는 그림자보다 **tonal elevation**(surface-container 단계 색)으로 층을 표현.
  - **Motion**: duration(short1~extra-long4) + easing(`emphasized`, `standard` 등) 토큰. Expressive는 spring 기반 motion physics(spatial/effects)로 전환 — 세부 토큰명 미확인.
- 포맷·도구 (DTCG JSON, Style Dictionary, Figma Variables 등): **Material Theme Builder**(Figma 플러그인 + 웹)에서 seed color로 스킴 생성 → CSS / Compose / Flutter / DSP(JSON) 등으로 export. 런타임 생성은 `material-color-utilities`(C++, Dart, Java, Kotlin, Swift, TypeScript; npm `@material/material-color-utilities`). DTCG 공식 export 지원 여부는 미확인.

## 4. 테마 · 다크모드 · 브랜드 확장
- **Dynamic color**: seed 1색 → HCT(Hue-Chroma-Tone, CAM16 + L* 기반 지각 색공간)로 5개 key color의 tonal palette(tone 0~100) 생성 → light/dark 스킴은 같은 palette에서 다른 tone을 집는 것(예: light `primary`=tone 40, dark `primary`=tone 80).
- 스킴 변형(variant): TonalSpot(기본), Vibrant, Expressive, Content, Fidelity, Monochrome, Neutral, Rainbow, FruitSalad 등 — 라이브러리 코드 기준이며 공식 문서 명칭은 미확인.
- **Contrast level**: standard / medium / high 대비 스킴을 같은 알고리즘으로 생성 (사용자 대비 설정 대응).
- 브랜드 확장: seed를 브랜드 색으로 고정하거나 "custom color"를 추가해 harmonize(브랜드 색을 스킴 hue 쪽으로 살짝 당김).
- 다크모드는 별도 디자인이 아니라 **같은 role, 다른 tone** → role만 쓰면 자동 대응.

## 5. 컴포넌트
- 개수·범위: m3.material.io 기준 30여 개 컴포넌트 카테고리(버튼, FAB, 카드, 칩, 다이얼로그, 내비게이션 바/레일/드로어, 탭, 앱 바, 시트, 스낵바 등). Expressive로 button group, split button, FAB menu, loading indicator, toolbar 등 추가. 정확한 개수는 사이트가 JS 렌더링이라 미확인. material-web은 18개 폴더(button, checkbox, chips, dialog, divider, fab, field, icon, iconbutton, list, menu, progress, radio, select, slider, switch, tabs, textfield)만 구현했고 **유지보수 모드("pending new maintainers")**.
- API 스타일 (props, 합성 패턴, variant 네이밍): variant를 **별도 컴포넌트/태그로 분리** (`<md-filled-button>`, `<md-outlined-button>`, `<md-text-button>`, `<md-elevated-button>`, `<md-filled-tonal-button>`; Compose도 `Button`/`OutlinedButton`/`FilledTonalButton`). 스타일 커스터마이즈는 props가 아니라 CSS custom property(component 토큰)로.
- 눈에 띄는 컴포넌트/패턴: 버튼 5단계 강조 계층(elevated/filled/tonal/outlined/text), navigation bar ↔ rail ↔ drawer를 window size class에 따라 전환하는 adaptive navigation, Expressive shape morph(모양 변형 애니메이션).

## 6. 문서 구성
- 사이트 구조 (Foundations / Components / Patterns / Content …): **Get started / Foundations**(accessibility, layout, interaction, content design 등) / **Styles**(color, elevation, icons, motion, shape, typography) / **Components** / **Blog·Develop** 링크.
- 컴포넌트 페이지 한 장의 구성 (사용 시점, Do/Don't, 접근성, 코드 …): 탭 4개 — **Overview**(언제 쓰나, 플랫폼별 구현 링크) / **Specs**(anatomy, 측정값, **토큰 테이블**: 각 파트별 color/shape/type 토큰) / **Guidelines**(사용법, Do/Don't 이미지) / **Accessibility**(포커스, 레이블, 터치 타깃). 탭 구성은 기존 사용 경험 기준이며 이번 조사에서 JS 렌더링으로 직접 재확인은 못함(미확인).

## 7. 접근성
- 터치 타깃 최소 **48×48dp** (아이콘이 24dp여도 패딩으로 48dp 확보) — Android 공식 문서가 Material 가이드라인으로 인용.
- 대비: 텍스트 4.5:1, 비텍스트(아이콘·경계) 3:1 — color role 쌍(`primary`/`on-primary`)이 tone 차이로 기본 대비를 보장.
- 컴포넌트마다 Accessibility 탭에서 키보드 포커스, 스크린리더 레이블, 상태 전달을 안내.
- contrast level(standard/medium/high) 스킴으로 고대비 설정 대응.

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- **공식 llms.txt 없음**: `m3.material.io/llms.txt`, `material.io/llms.txt` 모두 404 (2026-11-13 확인).
- **공식 MCP 서버 없음(확인 범위 내)**: 커뮤니티 서버만 존재 — material3-mcp-server(토큰·아이콘·WCAG 안내), MD3-Docs MCP(공식 문서를 Markdown으로 반환) 등. 커뮤니티 Claude Code 스킬(material-3, m3-expressive)도 다수.
- m3.material.io가 클라이언트 렌더링이라 일반 fetch로 본문을 못 읽음 → **AI 에이전트 친화도 낮음**. 대신 GitHub의 material-web 문서(markdown)와 Compose API 레퍼런스가 에이전트가 읽기 좋은 실질적 소스.
- Google 측 AI 도구(Stitch, Android Studio Gemini 등)의 M3 연동 범위는 미확인.

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: 하나의 토큰 스펙(`md.sys.color.primary` 등 점 표기 이름)을 플랫폼별 이름으로 매핑 — Web `--md-sys-color-primary`, Compose `MaterialTheme.colorScheme.primary`, Flutter `ColorScheme.primary`. 색 생성은 `material-color-utilities`가 **Swift 포함 6개 언어**로 같은 알고리즘을 제공해 iOS에서도 동일 스킴 재현 가능.
- 단, **iOS 네이티브 M3 컴포넌트는 사실상 없음** (MDC-iOS는 오래전 유지보수 모드). iOS에서 M3 룩을 쓰면 HIG와 충돌 → 개인 DS에서는 "색 알고리즘·토큰 네이밍만 차용, iOS 컴포넌트는 네이티브"가 현실적.

## 10. 내 DS로 가져올 것 (1~3개)
1. **`on-*` 쌍 규칙**: 모든 배경 role(`primary`, `primary-container`, `surface-container-high` …)에 전경 role `on-*`을 짝으로 정의. AI 에이전트에게 "배경 토큰을 쓰면 글자색은 반드시 같은 이름의 `on-` 토큰"이라는 기계적 규칙을 줄 수 있어 대비 실수가 줄어든다.
2. **seed 1색 → 팔레트 자동 생성**: `@material/material-color-utilities`(TS)로 브랜드 색 하나에서 light/dark/고대비 스킴을 빌드 타임에 생성하고 CSS 변수 + Swift `Color` 에셋으로 같이 export. 다크모드를 손으로 고르지 않아도 된다.
3. **surface-container 5단계로 깊이 표현**: 그림자 대신 `surface-container-lowest → highest` 색 단계로 카드/시트/다이얼로그 층을 구분 (다크모드에서 특히 깔끔, iOS의 base/elevated 배경과도 개념이 맞음).

## 11. 가져오지 않을 것 / 주의
- 컴포넌트 토큰 레이어 전체(버튼 하나에 수십 개 토큰)는 개인 DS에 과함 → ref/sys 2계층이면 충분.
- variant마다 별도 컴포넌트로 쪼개는 API(`FilledButton`, `OutlinedButton` …)는 웹 React 관점에선 `variant` prop 하나가 AI에게 더 예측 가능.
- material-web은 유지보수 모드 → 의존성으로 채택하지 말 것. Expressive 일부 API는 Compose에서 아직 experimental.
- iOS에 Material 룩을 그대로 이식하지 말 것 (HIG 위반·이질감).
- 공식 문서가 JS 렌더링이라 에이전트가 직접 참조하기 어려움 → 필요한 값은 내 DS 문서에 복사해 둘 것.

## 출처
- https://m3.material.io (Styles: color / shape / typography, Components) — 본문 JS 렌더링으로 직접 열람 실패, 구조는 일부 미확인
- https://github.com/material-components/material-web (README, 유지보수 모드 공지, 컴포넌트 목록)
- https://github.com/material-components/material-web/blob/main/docs/theming/README.md (토큰 계층·네이밍)
- https://github.com/material-components/material-web/blob/main/docs/theming/color.md (`--md-sys-color-*` role 목록)
- https://github.com/material-foundation/material-color-utilities (HCT, scheme, 지원 언어)
- https://developer.android.com/reference/kotlin/androidx/compose/material3/Shapes (shape 스케일, Expressive 추가 shape)
- https://developer.android.com/reference/kotlin/androidx/compose/material3/Typography (15 스타일 + Emphasized)
- https://developer.android.com/develop/ui/compose/accessibility/api-defaults (48dp 최소 터치 타깃)
- https://developer.android.com/design/ui/mobile/guides/foundations/accessibility (대비 4.5:1 / 3:1)
- llms.txt 확인: https://m3.material.io/llms.txt (404)
