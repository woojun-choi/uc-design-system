# IBM Carbon — 읽기 노트

> 회사: IBM · 공식 문서: https://carbondesignsystem.com · 리포: https://github.com/carbon-design-system/carbon · 라이선스/사용 범위: 코드 Apache-2.0, IBM Plex 폰트 OFL. 호스팅 Carbon MCP는 IBM Terms of Use · 플랫폼: Web(React, Web Components), Figma/Sketch 킷. iOS 코드 패키지 없음(네이티브 모바일 디자인 킷만) · 조사일: 2026-11-13

## 1. 한 줄 정리
_"역할 기반 토큰 + 레이어(01/02/03) 모델 + 4개 회색 테마"로 엔터프라이즈 UI를 규격화하고, 컴포넌트마다 Usage/Style/Code/Accessibility 4탭 문서를 갖춘 가장 "교과서적인" 문서 구조의 DS._

## 2. 핵심 원칙 / 철학
- 토큰은 **역할(role)** 이름, 값만 테마별로 바뀜: theme(값 세트) / token(역할 식별자, 테마 불변) / role(체계적 용도) / value(hex 등) 4개 용어를 명확히 분리.
- **2x Grid**: 타이포·레이아웃·아이콘의 기하학적 기반(2/4/8 배수).
- **Productive vs Expressive**: 타이포·모션 모두 "업무용(조밀·빠름)"과 "표현용(크고·부드러움)" 두 모드.
- 접근성은 IBM Accessibility Checklist(WCAG AA + Section 508 + 유럽 표준)를 컴포넌트 수준에서 보장.

## 3. 토큰 구조 · 네이밍
- 계층: 팔레트(`$blue-60`, `$gray-100`) → **역할 토큰**(`$interactive` → 기본 테마에서 `$blue-60` 참조) → **컴포넌트 토큰**(`buttonTokens`, `tagTokens`, `notificationTokens`, `statusTokens`, `contentSwitcherTokens`).
- 네이밍 규칙: `$[UI 요소]-[강도/종류]-[상태]-[레이어번호]`, kebab-case.
  - 예: `$background`, `$layer-01`, `$layer-hover-01`, `$layer-accent-01`, `$field-02`, `$border-subtle-01`, `$border-strong-01`, `$border-interactive`, `$text-primary`, `$text-secondary`, `$text-helper`, `$text-on-color`, `$icon-primary`, `$link-primary`, `$support-error`, `$focus`, `$focus-inset`, `$skeleton-element`.
  - 상태 접미사: `-hover`, `-active`, `-selected`, `-disabled`, `-inverse`, `-on-color`.
  - **레이어 번호 규칙**: `$layer-01`은 `$background` 위, `-02`는 `-01` 위, `-03`은 `-02` 위. 짝 토큰도 같은 번호(`$field-02`는 `$layer-01` 위 입력창, `$border-subtle-02`는 `$layer-02`와 짝). `$layer-background-01..03`은 현재 컨텍스트 레이어에 자동 매칭.
  - 그 밖의 그룹: Syntax(코드 하이라이트), AI 토큰(AI label 등), 컴포넌트 토큰.
- 스케일:
  - 간격: `$spacing-01` 2px, `-02` 4, `-03` 8, `-04` 12, `-05` 16, `-06` 24, `-07` 32, `-08` 40, `-09` 48, `-10` 64, `-11` 80, `-12` 96, `-13` 160 (2/4/8 배수, 숫자가 클수록 큼 — 값이 아닌 순번).
  - 타이포(IBM Plex Sans/Mono): Productive(14px 기준, `-01`) `$label-01` 12, `$helper-text-01` 12, `$code-01` 12, `$body-compact-01` 14, `$body-01` 14, `$heading-01` 14, `$heading-03` 20 … `$heading-07` 54. Expressive(16px 기준, `-02`) `$body-02` 16, `$fluid-heading-03..06`, `$fluid-display-01..04`(최대 92px, 브레이크포인트별 유동). "compact" 변형은 행간이 좁은 버전.
  - 모션: `duration-fast-01` 70ms, `fast-02` 110, `moderate-01` 150, `moderate-02` 240, `slow-01` 400, `slow-02` 700. easing은 standard/entrance/exit × productive/expressive 6종, 예: standard-productive `cubic-bezier(0.2, 0, 0.38, 0.9)`, entrance-expressive `cubic-bezier(0, 0, 0.3, 1)`. 사용법은 `motion(standard, productive)` 함수.
  - 라운드: 기본적으로 거의 0(각진 IBM 스타일). 별도 radius 토큰 스케일은 이번 조사에서 미확인.
- 포맷·도구: 모노레포 패키지 분리 — `@carbon/colors`, `@carbon/themes`, `@carbon/type`, `@carbon/layout`, `@carbon/motion`, `@carbon/grid`, `@carbon/styles`, `@carbon/icons(-react)`, `@carbon/pictograms`, `@carbon/react`, `@carbon/web-components`, `@carbon/upgrade`(마이그레이션 codemod). `@carbon/themes`의 토큰 소스는 **DTCG 2025.10 JSON**(`tokens/themes/<theme>/theme.tokens.json` + 컴포넌트별 파일) → `yarn build`로 JS·Sass 생성. 런타임 CSS 변수는 `--cds-` 접두사로 알려짐(README에선 미언급 — 미확인).

## 4. 테마 · 다크모드 · 브랜드 확장
- 테마 4종: **White**(기본), **Gray 10**(light), **Gray 90**, **Gray 100**(dark). JS: `white`, `g10`, `g90`, `g100`.
- Sass: `@use '@carbon/styles/scss/themes'` 후 `with`로 기본 테마 변경/토큰 값 덮어쓰기(=커스텀 테마). **인라인 테마**: `theme.theme(themes.$g90)` mixin으로 페이지 일부만 다른 테마(예: 라이트 페이지 속 다크 헤더) — React `<Theme theme="g90">` 컴포넌트로도 가능(문서 이번엔 미확인).
- 다크모드 = 테마 교체. 토큰 역할은 동일, 값만 변경.

## 5. 컴포넌트
- 개수·범위: Components 섹션 41개(Accordion, AI label, Breadcrumb, Button, Code snippet, Contained list, Content switcher, Data table, Date picker, Dropdown, File uploader, Modal, Multiselect, Notification, Number input, Popover, Structured list, Tile, Toggletip, Tree view, UI shell …). 이 밖에 Carbon Labs, IBM Products(확장 컴포넌트) 별도.
- API 스타일: React props. Button `kind="primary|secondary|tertiary|ghost|danger"`, `size`(7단계: sm/md/lg/xl/2xl 등 — 문서상 7 사이즈), `renderIcon`, `hasIconOnly` + `iconDescription`(툴팁 필수).
- 눈에 띄는 것: **AI label**(AI 생성 콘텐츠 표시 컴포넌트 + AI 전용 색 토큰) — AI 기능 UI 표준화 사례. UI shell(엔터프라이즈 앱 프레임). Data visualization이 별도 최상위 섹션(Carbon Charts, MCP `get_charts`).

## 6. 문서 구성
- 사이트 구조(llms.txt 기준 8섹션): Getting Started(Designing/Developing, Carbon MCP) / Foundations·Elements(2x Grid, Color, Typography, Spacing, Motion, Iconography, Pictograms, Themes) / Components / Patterns(Common actions, Forms, Empty states …) / Data Visualization / Building Experiences(Buy 등 유저 여정 단위 가이드) / Support / Resources.
- **컴포넌트 페이지 = 4탭**: Usage(=Guidelines) / Style(=Specifications) / Code / Accessibility.
  - Usage 탭 순서: Live demo(테마·variant 선택기, Storybook 링크) → Overview(언제 쓰나 / 언제 쓰지 말아야 하나 — 예: 내비게이션엔 Link) → Formatting(Anatomy, 사이즈, 강조 위계, 정렬) → Content(라벨 문구: 동사+명사, sentence case, 줄바꿈 vs 말줄임, RTL) → Universal behaviors(상태, 마우스/키보드, 로딩) → variant별 섹션(+Do/Don't 이미지) → Modifiers → Related → References(NN/g 등 근거) → Feedback.
  - Accessibility 탭: What Carbon provides / Design recommendations / Development considerations / **테스트 현황 표**.
- 페이지마다 "last updated" 날짜 표시.

## 7. 접근성
- 기준: IBM Accessibility Checklist(WCAG AA 기반 + Section 508 + 유럽 표준). 개요 페이지는 WCAG 2.1 링크. 서브페이지: Overview / Color / Developers / Keyboard.
- 도구: IBM Equal Access Toolkit(Accessibility Checker), High Contrast 플러그인, Stark(Figma), 대비 체커.
- 컴포넌트별 **테스트 상태 표**: Default state / Advanced states / Keyboard nav = 자동 테스트 통과, Screen reader = JAWS·VoiceOver·NVDA 수동 테스트. "무엇이 검증됐는지"를 페이지에 명시하는 점이 특징.
- 컴포넌트 규칙 예: 아이콘 전용 버튼은 툴팁 라벨 필수, 버튼 역할 링크는 Space에도 반응, 토글은 `aria-pressed`.
- 색: `$focus`/`$focus-inset` 토큰, `$text-on-color` 등 페어 토큰으로 대비 보장.

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- **Carbon MCP**(공식, 호스팅): `https://mcp.carbondesignsystem.com/mcp`. 인증 IBMid(OAuth; 미지원 클라이언트는 auth 페이지에서 token+session ID 발급). 도구 5개: `docs_search`, `code_search`, `get_charts`, `labs_search`, `code_audit`. 지원 클라이언트: IBM Bob, Claude Desktop(커넥터), Claude Code, Cursor, VS Code, Figma Make. 로드맵: Carbon Labs/Patterns 컨텍스트, **v10→v11 및 타 DS→Carbon 에이전트 마이그레이션**. (문서 갱신 2026-09-28 / 2026-10-30)
- **Carbon Builder 스킬**(Apache-2.0): carbon-mcp GitHub 리포에서 `carbon-builder.zip` 배포. 설치 위치: Claude Code `.claude/skills/`, Copilot `.github/skills/`, Cursor `.cursor/rules/carbon-builder.mdc`, Figma Make용 `carbon-builder-figma-make-react`. MCP(지식) + Skill(작업 절차) 분리 구조.
- **llms.txt**: `carbondesignsystem.com/llms.txt` 존재 — 문서·컴포넌트·소스 리포 인덱스(8섹션).
- DESIGN.md: 공식 제공 확인 안 됨(서드파티 비공식 IBM DESIGN.md만 존재) — 미확인.
- AI 자체를 UI 요소로 다룸: AI label 컴포넌트 + AI 색 토큰.

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: 코드 출력은 JS·Sass(웹 전용). iOS/Android는 Figma/Sketch **네이티브 모바일 디자인 킷**(그리드 템플릿, Light/Dark)만 제공, Swift 토큰 패키지 없음 — 미확인이 아니라 공개 패키지 부재로 판단. 다만 토큰 소스가 DTCG JSON으로 바뀌었으므로 Style Dictionary 등으로 Swift를 뽑는 건 사용자 몫으로 가능.
- 시사점: "역할 이름 + 레이어 번호" 체계는 iOS의 `systemBackground` / `secondarySystemBackground` / `tertiarySystemBackground` 계층과 개념이 거의 같음 → 웹·iOS 공통 시맨틱으로 매핑하기 좋음.

## 10. 내 DS로 가져올 것 (1~3개)
1. **레이어 번호 모델**: `background` → `layer-01` → `layer-02` (+ 짝 토큰 `field-01/02`, `border-subtle-01/02`) 3단만 도입. iOS `systemBackground` 계층과 1:1 매핑해 웹/iOS 공통 시맨틱으로 사용하고, "카드 안 카드면 번호+1" 규칙 한 줄을 AI 규칙서에 명시.
2. **컴포넌트 문서 4블록 템플릿(축소판)**: Usage(언제/언제 아님 + Do/Don't) · Content(라벨 문구 규칙) · Code(import·props) · Accessibility(키보드/스크린리더 + **검증 상태 체크박스**). 컴포넌트마다 짧은 md 하나로, AI 에이전트가 그대로 읽는 문서로 겸용.
3. **Productive/Expressive 2모드 + 모션 토큰 6개**: duration은 `fast-01/02`, `moderate-01/02`, `slow-01/02` 정도, easing은 standard/entrance/exit 3종만. 앱(업무형) 화면은 productive, 랜딩·온보딩은 expressive로 분리하면 선택이 단순해짐.

## 11. 가져오지 않을 것 / 주의
- 거의 0에 가까운 라운드·IBM 회색 톤 미학은 개인 프로젝트 성격과 안 맞을 수 있음 — 구조만 차용.
- 4개 회색 테마·인라인 테마 Sass mixin 인프라는 과함(light/dark 2개면 충분).
- `$spacing-13` 같은 순번형 이름은 값을 외우기 어려움 → Atlassian식 `space.100=8px`처럼 값 비례 이름이 AI에게 더 추측 가능.
- 호스팅 MCP는 IBMid 로그인·IBM 약관 필요 — 레퍼런스로만, 개인 DS 의존성으로 쓰지 말 것.
- 패키지가 20+개로 쪼개진 모노레포 구조는 개인용엔 과잉.

## 출처
- https://carbondesignsystem.com/elements/themes/overview/
- https://carbondesignsystem.com/elements/color/tokens/
- https://carbondesignsystem.com/elements/spacing/overview/
- https://carbondesignsystem.com/elements/typography/type-sets/
- https://carbondesignsystem.com/elements/motion/overview/
- https://carbondesignsystem.com/components/overview/components/
- https://carbondesignsystem.com/components/button/usage/
- https://carbondesignsystem.com/components/button/accessibility/
- https://carbondesignsystem.com/guidelines/accessibility/overview/
- https://carbondesignsystem.com/developing/carbon-mcp/overview/
- https://carbondesignsystem.com/developing/carbon-mcp/onboarding-and-setup/
- https://carbondesignsystem.com/llms.txt
- https://github.com/carbon-design-system/carbon/tree/main/packages
- https://github.com/carbon-design-system/carbon/tree/main/packages/themes
- https://preview.carbondesignsystem.com/getting-started/designing/design-resources (네이티브 모바일 킷)
