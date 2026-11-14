# 토스 TDS (Toss Design System) — 읽기 노트

> 회사: 비바리퍼블리카(토스) · 공식 문서: https://developers-apps-in-toss.toss.im/design (앱인토스 개발자센터), https://tossmini-docs.toss.im/tds-mobile/ (TDS Mobile), https://tossmini-docs.toss.im/tds-react-native/ · 라이선스/사용 범위: **앱인토스 미니앱 개발·디자인·프로토타입 용도로만 허용**(UI Kit 라이선스). 다른 프로젝트·제품·서비스 사용, 복제·수정·재배포 금지. 권리는 비바리퍼블리카 소유 · 플랫폼: Web(WebView React, `@toss/tds-mobile`), React Native(`@toss/tds-react-native`), 사내 iOS·Android·Server Driven UI · 조사일: 2026-11-13

## 1. 한 줄 정리
_토스 앱 전체가 쓰는 단일 디자인 언어로, 공개된 부분은 "앱인토스 미니앱 전용" WebView/RN 키트이며, 배울 점은 코드보다 **큰 텍스트 대응 타이포 규칙, OKLCH 색 재설계, 컴포넌트 가이드 작성 체크리스트, UX 라이팅 규칙**에 있다._

## 2. 핵심 원칙 / 철학
- DS 팀은 "메이커 생산성"과 "사용자 경험의 일관성"을 함께 책임짐. 컴포넌트가 예외 상황·접근성을 미리 처리해 디자이너가 매번 결정하지 않게 하는 것이 목표(toss.tech, 2024-03).
- 레고처럼 조합 가능한 컴포넌트를 플랫폼 팀이 만들고, 메이커는 조합만 함. 공식 문서는 커스텀 UI 대비 개발 속도 3~5배를 주장(토스 측 수치).
- 라이팅 핵심 가치: Clear, Casual, Respect, Emotional + 8가지 실무 원칙(다음 화면 예측 힌트, 잡초 뽑기, 빈 문장 제거, 핵심 메시지 집중, 소리 내 읽기 쉬운 문장, 강요 대신 권유, 보편적 단어, 숨은 감정 고려).

## 3. 토큰 구조 · 네이밍
- 계층 (primitive → semantic → component 등): 2025-12 컬러 시스템 개편 글 기준 **Base → Semantic → Component** 3단계. 공통 구조는 Category / Style Element / Level / Name. Semantic 색은 **Target(fill, text, border) × Role(brand, neutral, primary, secondary) × Variant(weak, alt)**. 단, 개편된 semantic 토큰의 실제 이름 목록은 공개 문서에서 확인 못함(미확인).
- 네이밍 규칙 예시 (실제 토큰 이름 2~3개): 공개 패키지 `@toss/tds-colors`(0.1.0) 기준
  - 정적 팔레트: `colors.blue500`, `colors.grey900`
  - 테마 대응(adaptive): `adaptive.grey900`(라이트에선 검정, 다크에선 흰색), `adaptive.background`, `adaptive.layeredBackground`, `adaptive.floatBackground`, `adaptive.greyBackground`, `adaptive.backgroundLevel01`, `adaptive.hairlineBorder`, `adaptive.disabledBlue500`
  - CSS 변수: `--adaptiveBlue500`, `--adaptiveBackground`, `--adaptiveBackgroundLevel01` (camelCase, 접두사 없음)
- 색 / 타이포 / 간격 / 라운드 / 그림자 / 모션 스케일:
  - 색: grey, blue, red, orange, yellow, green, teal, purple 8개 색상 × `50`~`900`(10단계), 별도로 `greyOpacity50~900`, `opacity*`, `whiteOpacity*`, `inverseGrey*`. 소스에는 `lightThemeBlue500` / `darkThemeBlue500`처럼 테마별 원본 값이 따로 있음.
  - 타이포: **Typography 1~7(주 단계) + sub Typography 1~13(보조 단계)** 총 20단계. 기본값(100%) 예: Typography 1 = 30/40, Typography 3 = 22/31, Typography 5 = 17/25.5(일반 본문), Typography 6 = 15/22.5, Typography 7 = 13/19.5, sub Typography 13 = 11/16.5. 본문 계열 line-height는 1.5배. 코드상 토큰 식별자(`t1`, `st1` 등) 표기는 공개 문서에서 확인 못함(미확인).
  - 간격·라운드·그림자·모션: 공개 문서(TDS Mobile Foundation은 Colors·Typography 두 페이지뿐)에서 스케일을 확인하지 못함(미확인).
- 포맷·도구 (DTCG JSON, Style Dictionary, Figma Variables 등): 디자이너가 **Tokens Studio(Figma 플러그인)**에서 편집 → GitHub PR → 전처리 → **Style Dictionary**로 CSS, TypeScript, 사내 디자인 에디터 Deus용 변수 컬렉션, Server Driven UI 포맷을 생성. 빌드 시 깨진 참조 검사. 공개 패키지는 `colors.css`, `colors.light.css`, `colors.dark.css`, `colors.scss`, JS 객체를 함께 배포.

## 4. 테마 · 다크모드 · 브랜드 확장
- 다크모드: "adaptive" 토큰 하나가 라이트/다크 값을 가지는 방식(`colors.light.css` / `colors.dark.css`로 `:root` 변수 값을 교체). 다크 전용 팔레트를 별도로 설계하며, 다크에서는 밝은 요소가 덜 보인다는 점을 감안해 대비를 더 강하게 잡음(APCA 참고).
- 2025 컬러 개편: 같은 숫자 단계인데 색상마다 명도가 달랐던 문제(Grey 100 ≈ 1.1:1 vs Red 100 ≈ 1.34:1)를 **OKLCH** 기반으로 재정렬. gamut 밖 색은 hue·lightness를 유지하고 chroma만 깎음. 노랑은 수치만으로 안 돼 수동 보정("The Dark Yellow Problem").
- 브랜드 확장은 **규칙 기반 테마 오버라이드**: 앱인토스 파트너 브랜드 색 덮어쓰기, TDS POS용 크기·간격 오버라이드, 증권(WTS)용 파생 테마(상승=빨강을 긍정으로). OKLCH 덕분에 파트너 브랜드 색에서도 접근 가능한 색 쌍을 자동 생성.
- 앱인토스 미니앱: 로고는 라이트·다크 모두에서 보이는 배경 필요, 그래픽은 양쪽 모드에서 보이는 중간 명도 권장. Button 등은 CSS 변수로 색 업데이트 가능.

## 5. 컴포넌트
- 개수·범위: TDS Mobile llms.txt 기준 컴포넌트 문서 57개(+ Foundation 2, Overlay hook 4). 단독 컴포넌트는 약 35개이고 Agreement, BottomCTA, Dialog, Keypad, ListRow, TextField, Asset 등은 하위 페이지가 있음. 앱인토스가 꼽는 핵심 11개: Badge, Border, BottomCTA, Button, Asset, ListRow, ListHeader, Navigation, Paragraph, Tab, Top.
- API 스타일 (props, 합성 패턴, variant 네이밍): Emotion 기반 React(`@emotion/react@^11`, React 18). 앱 최상위를 `TDSMobileAITProvider`(`@toss/tds-mobile-ait`)로 감쌈. Button 예: `color: 'primary' | 'danger' | 'light' | 'dark'`, `variant: 'fill' | 'weak'`, `size: 'small' | 'medium' | 'large' | 'xlarge'`(기본 `xlarge`), `display: 'inline' | 'block' | 'full'`, `loading`, `disabled`, `as: 'button' | 'a'`. 즉 **색(의미)과 강조(variant)를 별도 축으로 분리**. 오버레이는 `useDialog` / `useToast` / `useBottomSheet` 훅으로 명령형 호출.
- 눈에 띄는 컴포넌트/패턴: **ListRow**(토스 화면의 기본 단위, 좌/중/우 영역 조합), **BottomCTA**(Single/Double/FixedBottomCTA, 하단 고정 주 행동), 금융 특화 **Keypad**(Number, Alphabet, Full Secure), Agreement(약관 동의), Asset(아이콘·이미지 프레임 래핑), Top(화면 상단 제목 영역), Numeric Spinner, BarChart.

## 6. 문서 구성
- 사이트 구조 (Foundations / Components / Patterns / Content …): TDS Mobile 문서 = Start / Foundation(Colors, Typography) / Components / Hooks(Overlay Extension) / Migration(`@toss-design-system` → `@toss/tds-mobile`, v1 → v2). 디자인·정책 쪽은 앱인토스 개발자센터의 Design 섹션(도구, Figma UI Kit 라이선스, UI/UX 가이드: 브랜딩, 다크패턴 방지, UX 라이팅, 그래픽, 해상도)에 별도로 있음.
- 컴포넌트 페이지 한 장의 구성 (사용 시점, Do/Don't, 접근성, 코드 …): 공개 개발 문서는 개요 → Preview → 사용 예제(prop별 섹션) → **접근성(기본 제공 vs 개발자가 추가로 챙길 것을 표로 분리)** → 인터페이스(Props 타입). 사내 디자인 가이드(toss.tech 2024-04)는 **풀옵션 예시 → 상위 타입 → 타입별 요소 → 상세 상태(다크모드, 두 줄 넘김) → 위치 → 접근성(맨 아래 고정 위치: 큰 텍스트, VoiceOver, 동작 줄이기)** 순서이고, 작성 체크리스트(구조, 타입, 영역, 상세 스펙, 큰 텍스트, 다크모드) 도입 후 가이드 1개 1주 → 하루 3개로 단축.

## 7. 접근성
- **큰 텍스트(Dynamic Type) 대응이 핵심**: iOS 단계를 비율로 환산해 Android·iOS·웹 공통 규칙을 만듦. Large 100%, xLarge 110%, xxLarge 120%, xxxLarge 135%, A11y_Medium 160%, A11y_Large 190%, A11y_xLarge 235%, A11y_xxLarge 275%, A11y_xxxLarge 310%. Android는 100% 이상 임의 값을 지원하므로 `기본 크기 × NN × 0.01` 계산식(+토큰별 최대값) 사용. 앱 내 WebView 본문도 같은 비율을 따라야 함. 표의 px 값을 하드코딩하지 말 것.
- VoiceOver·TalkBack에 맞춰 플랫폼별 구현, 화면 읽기용 초점 순서 규칙, 고정값보다 유연한 단위(폴드폰 포함).
- 컴포넌트 문서에 "기본 제공 접근성"(예: Button은 role, disabled 읽기, `loading` 시 `aria-busy`)과 "추가로 해야 할 것"(아이콘 버튼 `aria-label`, `as="a"`면 `href` 필수)을 구분.
- 대비: OKLCH 명도 정렬로 주요 색 조합이 접근성 기준을 충족하도록 설계. 구체 목표 비율 수치는 공개 글에 없음(미확인).
- 앱인토스 UI/UX 가이드 자체에는 별도 접근성 장이 없음(다크패턴 방지 정책은 있음: 진입 직후 동의 바텀시트, 이탈 방지 바텀시트, 거절 불가 구조 등 금지).

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- **llms.txt**: `https://tossmini-docs.toss.im/tds-mobile/llms.txt`(+ `llms-full.txt`, 페이지별 `.../llm.txt`), `https://developers-apps-in-toss.toss.im/llms.txt`. 개발자센터는 페이지 URL 끝에 `.md`를 붙이면 Markdown 원문 제공.
- **공식 플러그인/MCP(앱인토스용)**: Claude Code 플러그인 `claude plugin install ait@apps-in-toss -y`(마켓플레이스 `toss/apps-in-toss-harness`), 확인용 `/ait:welcome`, 콘솔 MCP `apps-in-toss-console`. "AI와 함께 미니앱을 만들어 출시"하는 바이브코딩 섹션 운영. 지원 도구로 Claude Code·Codex 명시. 이 플러그인이 TDS 전용 규칙을 얼마나 담는지는 미확인.
- TDS 문서 검색 MCP는 서드파티(glama 등록) 것만 확인됨, 공식 아님.

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: 단일 원천(Tokens Studio JSON in GitHub) → Style Dictionary → 웹(CSS/TS), React Native, Android, iOS, Server Driven UI, Deus 변수 컬렉션(System/Light/Dark context)으로 각각 패키지 생성. 구 앱 버전용 SDUI에는 역매핑 색까지 제공. 컬러 개편 전에는 플랫폼별 원천이 따로 있어 불일치가 났던 것이 개편의 이유 중 하나. 공개된 것은 웹·RN 패키지뿐이고 Swift 쪽 산출물 형태는 미확인.
- 타이포는 "iOS Dynamic Type 단계 → 비율 → 웹/Android 동일 비율"로 플랫폼을 맞추는 것이 가장 참고할 만한 지점.
- 앱인토스 해상도 가이드: 기준 논리 해상도 하나(세로 약 360×640~420×740)를 정해 스케일링, 에셋 1x·2x 기본, Safe Area 처리.

## 10. 내 DS로 가져올 것 (1~3개)
1. **큰 텍스트 비율 표를 타이포 토큰의 1급 시민으로**: 웹 폰트 토큰을 `calc(base * var(--text-scale))`로 두고, iOS Dynamic Type 단계(100/110/120/135%…)와 같은 비율 표를 문서화. iOS는 `UIFontMetrics`/`.dynamicTypeSize`, 웹은 같은 배율 변수로 맞춘다. "표의 px를 하드코딩하지 말 것"을 에이전트 규칙에 넣는다.
2. **adaptive 색 토큰 + 색(의미)/variant(강조) 분리 API**: 컴포넌트 prop은 `color="primary|danger"` × `variant="fill|weak"`처럼 두 축으로, 색 토큰은 라이트/다크 값을 함께 가진 adaptive 하나만 노출. 팔레트 단계를 OKLCH 명도로 맞추면 "같은 숫자 = 같은 대비"가 돼서 에이전트가 숫자만 보고 대비를 예측할 수 있다.
3. **컴포넌트 문서 템플릿 + UX 라이팅 규칙 파일**: 페이지 순서를 "풀옵션 예시 → 타입 → 상태(다크·긴 텍스트) → 접근성(기본 제공 / 직접 챙길 것) → Props"로 고정하고, 해요체·능동형·긍정형·다이얼로그 왼쪽 버튼은 "닫기" 같은 라이팅 규칙을 `WRITING.md`로 두어 에이전트가 UI 문구를 쓸 때 참조하게 한다.

## 11. 가져오지 않을 것 / 주의
- **라이선스**: Figma UI Kit 라이선스는 앱인토스 외 사용, 복제·수정·재배포를 금지함. 개인 DS에 TDS 컴포넌트 코드·Figma 에셋·아이콘·3D 그래픽을 가져오면 안 됨. 원칙·구조만 참고. (npm `@toss/tds-react-native`의 메타데이터에는 Apache-2.0이 적혀 있고 `@toss/tds-mobile`, `@toss/tds-colors`에는 license 필드가 없음. 공식 라이선스 문서와 상충할 수 있으므로 안전하게 "사용 불가"로 간주.)
- Toss Product Sans(토스 전용 서체)는 사용 불가로 간주. 서체 공개 라이선스 여부는 미확인.
- Typography 7 + sub 13 = 20단계는 개인 DS에 과함. 6~8단계로 축소.
- Server Driven UI·Deus·POS/WTS 파생 테마 같은 대규모 조직용 인프라는 불필요.
- camelCase·접두사 없는 CSS 변수(`--adaptiveBlue500`)는 다른 라이브러리와 충돌하기 쉬움. 내 DS는 접두사를 붙인다.

## 출처
- https://developers-apps-in-toss.toss.im/design/components.md
- https://developers-apps-in-toss.toss.im/design/prepare/figma-ui-license.md
- https://developers-apps-in-toss.toss.im/design/consumer-ux-guide.md
- https://developers-apps-in-toss.toss.im/llms.txt
- https://developers-apps-in-toss.toss.im/ai-vibe-coding/intro.md
- https://tossmini-docs.toss.im/tds-mobile/llms.txt
- https://tossmini-docs.toss.im/tds-mobile/start/llm.txt
- https://tossmini-docs.toss.im/tds-mobile/foundation/colors/llm.txt
- https://tossmini-docs.toss.im/tds-mobile/foundation/typography/llm.txt
- https://tossmini-docs.toss.im/tds-mobile/components/button/llm.txt
- https://tossmini-docs.toss.im/tds-react-native/foundation/typography/
- https://registry.npmjs.org/@toss/tds-colors (0.1.0 패키지의 `index.d.ts`, `colors.light.css`, `colors.dark.css`에서 토큰 이름 확인)
- https://toss.tech/article/tds-color-system-update (2025-12-15)
- https://toss.tech/article/toss-design-system-guide (2024-04-05)
- https://toss.tech/article/toss-design-system (2024-03-05)
- https://toss.tech/article/8-writing-principles-of-toss (2022-11-15)
