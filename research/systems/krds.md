# KRDS 한국 디자인 시스템 (Korea Design System) — 읽기 노트

> 회사: 행정안전부(운영 문의 krds@nia.or.kr, 한국지능정보사회진흥원) · 공식 문서: https://www.krds.go.kr (코드 github.com/KRDS-uiux/krds-uiux, Figma figma.com/@krds) · 라이선스/사용 범위: 저작권정책 페이지 본문을 가져오지 못해 **공공누리 유형 등 정확한 조건은 미확인**. npm `krds-uiux`(1.1.0)의 package.json은 `ISC`, README는 "KRDS 이용약관을 따름"이라고만 적음. 공식 배너(Masthead) 등 정부 아이덴티티 요소는 **정부 사이트가 아닌 곳에서 사용 금지** · 플랫폼: 웹(HTML/CSS/JS 컴포넌트 키트), 모바일 웹. 네이티브 앱은 범위 밖 · 조사일: 2026-11-13

## 1. 한 줄 정리
_전자정부 웹사이트를 위한 공공 디자인 시스템으로, 국내 DS 가운데 **접근성 근거(KWCAG 2.2 / WCAG 2.1 조항 매핑)와 고대비("선명한 화면") 모드, 대비율과 묶인 색 단계("매직넘버")**가 가장 체계적이다._

## 2. 핵심 원칙 / 철학
- 목표: 디지털 정부 서비스의 편의성, 일관성, 접근성, 사용성 보장 및 표준화. 장애인·고령자를 우선 고려하고 어린이·외국인까지 포함하는 "디지털 포용".
- 디자인 원칙 메뉴가 별도로 있으며, 두 번째 원칙이 "모든 사용자를 포용하는 서비스"(나머지 원칙의 전체 목록은 이번 조사에서 확인 못함 → 미확인).
- **표준형 / 확장형 스타일** 이원화: 표준형은 토큰을 그대로 적용, 확장형은 KRDS 스타일 원칙을 지키면서 기관 고유의 색·형태를 시험해 적용.
- 서비스 패턴 가이드라인은 **필수 / 권장 / 우수** 3개 적용 수준으로 나눔(필수 미준수 = 작업 실패로 이어짐).
- "KRDS를 적용한다고 웹 접근성을 완벽히 충족하는 것은 아니다"라고 명시.

## 3. 토큰 구조 · 네이밍
- 계층 (primitive → semantic → component 등): **Primitive → Semantic → Component** 3단계. Primitive(팔레트, 타이포, `number`)는 직접 쓰지 않고 참조용. Semantic은 역할(배경, 아이콘, 보더, 카드 패딩 등). Component 토큰은 디자인 툴이 아니라 **코드(SCSS)에서만 정의**.
- 네이밍 규칙 예시 (실제 토큰 이름 2~3개):
  - JSON(`tokens/transformed_tokens.json`): `primitive.color.light.primary.50`, `primitive.number.8`, `mode-light.color.text.bolder`(→ `{primitive.color.light.gray.95}` 참조), `mode-light.color.button.primary-fill`, `semantic.radius.medium1`, `responsive-pc.gap-layout.h2-h3`
  - CSS 변수(`krds_tokens.css`, 768개): `--krds-color-light-primary-50`, `--krds-light-color-text-secondary`, `--krds-high-contrast-color-input-border-disabled`, `--krds-pc-font-size-heading-xxsmall`, `--krds-mobile-gap-layout-title-body-small`, `--krds-gap-9`, `--krds-radius-xsmall2`
  - 컴포넌트 토큰 규칙: `--namespace-component--theme-type-size-modifier`(컴포넌트명 뒤 이중 대시), 같은 값 가로/세로는 `-x` / `-y`, 가능하면 CSS 속성 이름 재사용.
- 색 / 타이포 / 간격 / 라운드 / 그림자 / 모션 스케일:
  - 색 팔레트: primary, secondary, danger, information, warning, success, point 각 **11단계(5, 10, 20 … 90, 95)**, gray는 **13단계(0=White ~ 100=Black)**, alpha(black/white 0·10·25·50·75·100), graphic(10/30/50/70/90). HSL에서 L 50%를 기준으로 5~95%를 만든 뒤 대비 기준에 맞게 보정(예: primary-50이 3.9:1이라 L 55%로 조정).
  - **매직넘버**(단계 번호 = 흰 배경 대비 보장): 40 → 3:1, 50 → 4.5:1, 70 → 7:1, 90 → 15:1. 글자는 기본 모드 최소 40·본문 50, 선명한 화면 모드 70·본문 90. 아이콘 기본 40 / 고대비 70. 역할별 기본 단계: 아이콘 50, 텍스트 60, 배경 5, 보더 10.
  - Semantic 색 카테고리(mode-light 기준 개수): surface 16, border 21, divider 11, text 17, icon 22, link 4, button 17, background 5, element 25, action 16, input 6, graphic 11, alpha 15. 강도 어휘는 `bolder` / `basic` / `subtle` / `subtler`, `-inverse`, `-static`, `disabled-on`.
  - 타이포: 서체 Pretendard GOV, 굵기 400/700 기본. Display(large/medium/small) PC 60/44/36 → 모바일 44/32/28, Heading xlarge~xxsmall PC 40/32/24/19/17/15, Body·Label large~xsmall 19/17/15/13, Navigation 별도 스케일. 줄 간격 전부 150%. 본문 기본 17px(최소 16px 이상).
  - 간격(`primitive.number`): 0, 0.1rem, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.6, 2, 2.4, 2.8, 3.2 … 9.6rem, max 100rem. 루트 `font-size: 62.5%`(`--krds-font-size-base`)이므로 1rem = 10px → 1, 2, 4, 6, 8, 10, 12, 16, 20 … 96px. Semantic `gap.1~12`, `padding.1~10`, `size-height.1~11`, 레이아웃 간격은 `gap-layout.h1-h2`, `title-body-medium`처럼 **"무엇과 무엇 사이"로 이름을 붙임**.
  - 라운드: `semantic.radius.xsmall1~3`, `small1~3`, `medium1~4`, `large1~2`, `xlarge1~2`, `max`(2px~12px 범위 + max).
  - 그림자: 색 토큰 `alpha-shadow1~3`만 확인. 엘리베이션 단계 정의는 별도 페이지에 있으나 세부 미확인. 모션 토큰은 확인 못함(미확인).
  - 보더 두께: `border-width.variable-regular/medium`(고대비 모드에서 0.1 → 0.2rem, 0.2 → 0.3rem로 두꺼워짐)과 `static-*`(고정).
- 포맷·도구 (DTCG JSON, Style Dictionary, Figma Variables 등): Figma 로컬 변수(라이브러리 v1.0.0, 모드 전환 지원) → JSON export(`figma_token.json`) → 변환(`transformed_tokens.json`, `{a.b.c}` 참조 문법은 Tokens Studio·Style Dictionary 계열) → CSS 변수. 컴포넌트 토큰은 SCSS 맵 + `@each`로 CSS 변수 출력.

## 4. 테마 · 다크모드 · 브랜드 확장
- 다크모드 대신 **"선명한 화면 모드"(고대비, 어두운 배경)**: `mode-light` / `mode-high-contrast` 두 세트가 같은 semantic 키(각 190개)를 가짐. HTML에서 `[data-krds-mode=high-contrast]`(기본은 `theme`) 속성으로 전환. 사용자 설정 UI는 "기본(밝은 배경) / 선명하게(어두운 배경) / 시스템 설정" 3택.
- 고대비 모드에서는 색뿐 아니라 **보더 두께도 바뀜**(입력 보더는 두 모드 모두 50단계 색을 쓰고 두께로 차이).
- 반응형도 모드로 처리: `responsive-pc` / `responsive-mobile`이 같은 키(font-size, gap-layout, padding-card)를 다른 값으로 가짐.
- 글자 크기 설정(작게/보통/조금 크게/크게/가장 크게)을 사이트 수준 기능으로 제공(Resize 컴포넌트).
- 브랜드 확장: 확장형 스타일로 기관 색·형태 적용 가능. 서체는 고딕 계열(Noto Sans, 나눔고딕, 스포카 한 산스) 권장, 비고딕 자체 서체는 디스플레이·배너에만.

## 5. 컴포넌트
- 개수·범위: 공식 컴포넌트 목록 페이지에 **55종, 11개 카테고리**(아이덴티티 4, 탐색 6, 레이아웃 및 표현 13, 액션 3, 선택 5, 피드백 2, 도움 5, 입력 5, 설정 2, 콘텐츠 2, 모바일 8). 같은 페이지의 카운터는 "총 37건"이라 불일치(모바일 카테고리 추가 전 수치로 추정, 미확인). HTML 키트 `html/code/`에는 변형 포함 70여 개 예제 파일. 패턴: 기본 패턴 11종(개인 식별 정보 입력, 도움, 동의, 목록 탐색, 사용자 피드백, 상세 정보 확인, 오류, 입력 폼, 첨부파일, 필터링·정렬, 확인), 서비스 패턴 5종(방문, 검색, 로그인, 신청, 정책 정보 확인).
- API 스타일 (props, 합성 패턴, variant 네이밍): 프레임워크 없는 HTML 마크업 + CSS 클래스(`krds-btn small text`, `#krds-masthead` 등) + 바닐라 JS. React 공식 패키지는 없음(`@gracefullight/krds`는 개인이 만든 MUI 기반 비공식 구현). variant는 파일명 기준 `_size`, `_state`, `_hierarchy`, `_icon` 축.
- 눈에 띄는 컴포넌트/패턴: 정부 특화 **공식 배너(Masthead)**, **운영기관 식별자(Identifier)**, 긴급 공지(Critical alerts), **음성지원(TTS)**, **화면 크기 조정(Resize)**, 언어 변경, 접근 가능한 미디어, 숨긴 콘텐츠(Visually hidden), 건너뛰기 링크, 따라하기 패널, 코치마크, 맥락적 도움말·도움 패널.

## 6. 문서 구성
- 사이트 구조 (Foundations / Components / Patterns / Content …): 시작하기(디자이너 / 개발자 / 정부 관계자 / 리소스 다운로드) → 디자인 스타일(소개, 색상, 타이포그래피, 형태, 레이아웃, 아이콘, 엘리베이션, 선명한 화면 모드, 디자인 토큰) → 컴포넌트 → 기본 패턴 → 서비스 패턴 → 소식·소통(새소식, FAQ, 적용 사례, 자료실, 문의) → KRDS 소개(UI/UX 가이드라인 소개, 디자인 원칙, **네이밍 원칙**, 디지털 포용, 이용 안내, 저작권). 역할별 시작 가이드가 있다는 점이 특징.
- 컴포넌트 페이지 한 장의 구성 (사용 시점, Do/Don't, 접근성, 코드 …): 탭 3개 **개요 / 접근성 / 코드**. 개요: 정의 → 이 페이지의 구성(TOC) → 구조(번호 붙은 anatomy) → 사용성 가이드라인(규칙마다 좋은 예/나쁜 예) → FAQ → **정보 변경 내역(날짜·내용·Figma/HTML 리소스 링크)**. 접근성: 가이드라인 + 관련 지침 조항. 코드: 예시(코드 보기) + 마크업 가이드(필수 선택자 등). 별도로 키보드·마우스별 "상호작용 가이드라인".

## 7. 접근성
- 준거: **KWCAG 2.2**(한국형 웹 콘텐츠 접근성 지침), 전자정부 웹사이트 품질관리 지침(웹 접근성), **WCAG 2.1**. "디지털 포용" 페이지에 컴포넌트별 접근성 가이드라인 ↔ 관련 조항 매핑 표가 있음. 예: 공식 배너 "건너뛰기 링크는 공식 배너 이전에 제공" → KWCAG 2.2 반복 영역 건너뛰기 / WCAG 2.1 Bypass Blocks (A). 건너뛰기 링크 → Focus Visible (AA) 등.
- 색 대비는 토큰 단계 자체에 내장(매직넘버). 본문 AA 4.5:1, AAA 7:1 참고, 고대비 모드 본문 15:1 권장. 색만으로 정보 전달 금지.
- 타이포: rem 단위로 브라우저 글자 크기 설정 반영, 줄 간격 150% 이상, WCAG 1.4.12 Text Spacing(AA) 참조, 상대 단위 사용.
- 고대비 모드에서 보더 두께 증가, 사이트 수준 글자 크기 5단계 조정, TTS.
- 참고로 터치 영역 최소 크기 수치는 이번 조사에서 확인 못함(미확인).

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- 공식 AI 연동은 확인되지 않음: `https://www.krds.go.kr/llms.txt`는 404, 공식 MCP·스킬 없음.
- 서드파티: Claude Code 플러그인 "Awesome-KRDS"(컴포넌트 43종·패턴 16종을 제공한다고 소개, 비공식), MCP 레지스트리의 비공식 KRDS 관련 서버 등. 공식 문서가 아니므로 신뢰도 낮음.
- 대신 GitHub에 **토큰 JSON과 컴포넌트별 HTML 예제 파일이 평문으로 공개**되어 있어 에이전트가 읽기 쉬운 편. 사이트 HTML은 메뉴·검색 UI 등 잡음이 많아 크롤링 효율이 낮음.

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: 공유하지 않음. 웹(HTML/CSS) 전용이고 "모바일 OS별 네이티브 컴포넌트·상호작용, 앱 특화 화면·탐색 모델은 고려하지 않았다"고 명시하며 앱은 별도 문서('모바일 서비스의 UI/UX 개선')를 참고하라고 안내. 모바일 카테고리(바텀시트, 토스트, 스낵바, 탭바, 스플래시 등)는 모바일 웹·앱 화면 가이드 수준. 다만 토큰 JSON(Figma 변수 기반, 모드별 값)을 Style Dictionary로 Swift에 변환하는 것은 기술적으로 가능.
- 대응 관점에서 반응형을 "PC / Mobile 모드"로 토큰화한 방식은 iOS size class와 대응시키기 쉬움.

## 10. 내 DS로 가져올 것 (1~3개)
1. **매직넘버 규칙(단계 번호 = 대비 보장)**: 팔레트 단계를 "흰 배경 대비 40 → 3:1, 50 → 4.5:1, 70 → 7:1"처럼 고정하면, 에이전트가 "본문 글자는 50 이상"이라는 한 줄 규칙만으로 접근 가능한 색을 고를 수 있다. 다크 쪽도 같은 규칙을 반대 방향으로 정의.
2. **모드 세트를 같은 키로 복제하는 구조 + 고대비 모드에서 보더 두께까지 바꾸기**: `mode-light` / `mode-dark`(필요하면 `mode-high-contrast`)가 동일한 semantic 키를 갖게 하고, `border-width.variable-*`처럼 모드에 따라 바뀌는 치수 토큰을 둔다. iOS의 "대비 증가(Increase Contrast)" 설정과도 바로 매핑된다.
3. **"무엇과 무엇 사이" 레이아웃 간격 토큰 + 컴포넌트 문서의 '정보 변경 내역' + 접근성 조항 매핑**: `gap-layout.title-body-medium`, `h2-h3` 같은 이름은 에이전트가 화면 간격을 고를 때 모호함을 줄인다. 컴포넌트 문서 하단에 변경 이력 표와 관련 WCAG 조항(예: 2.4.7 Focus Visible)을 한 줄씩 붙이는 형식도 그대로 차용.

## 11. 가져오지 않을 것 / 주의
- 정부 아이덴티티 요소(공식 배너, 운영기관 식별자, 정부 상징)는 비정부 사이트 사용 금지. Pretendard GOV 서체의 재배포 조건도 미확인이므로 일반 Pretendard(OFL)로 대체.
- 라이선스 조건(공공누리 유형)이 확인되지 않았으므로 코드·이미지 복제는 피하고 원칙·구조만 참고.
- `62.5%` 루트 폰트 트릭(1rem = 10px)은 사용자 기본 글자 크기 설정과 서드파티 컴포넌트와 충돌할 수 있음. 내 DS는 16px 기준 rem 사용.
- `radius.xsmall1~3`처럼 같은 값을 여러 이름으로 쪼갠 semantic 토큰, `--krds-light-color-…`와 `--krds-color-light-…`가 섞인 변수 네이밍 순서는 혼란스러움. 반면교사.
- jQuery식 HTML 키트 구조, PC/모바일 별도 메뉴 컴포넌트 등은 현대 컴포넌트 API의 참고 대상이 아님.
- 다크모드가 아닌 "고대비 어두운 배경" 하나뿐이라 일반 다크 테마 설계 참고로는 부족함.

## 출처
- https://www.krds.go.kr/html/site/component/component_summary.html (컴포넌트 목록)
- https://www.krds.go.kr/html/site/component/component_02_01.html (공식 배너 페이지, 문서 구조·접근성 조항)
- https://www.krds.go.kr/html/site/style/style_02.html (색상, 매직넘버)
- https://www.krds.go.kr/html/site/style/style_03.html (타이포그래피)
- https://www.krds.go.kr/html/site/style/style_07.html (디자인 토큰)
- https://www.krds.go.kr/html/site/utility/utility_04.html (디지털 포용, KWCAG 2.2 / WCAG 2.1 매핑)
- https://www.krds.go.kr/html/site/utility/utility_07.html (UI/UX 가이드라인 소개: 적용 대상, 적용 수준, 활용 범위, 관련 법령)
- https://www.krds.go.kr/html/site/utility/utility_06.html (저작권정책, 본문은 JS 로딩이라 내용 미확인)
- https://github.com/KRDS-uiux/krds-uiux (README, package.json, tokens/transformed_tokens.json, resources/css/token/krds_tokens.css, resources/css/common/common.css, html/code/)
- https://designcompass.org/2025/01/22/krds-start/ (정식 개시 기사, 2025-01)
- https://www.npmjs.com/package/@gracefullight/krds (비공식 React 구현 참고)
