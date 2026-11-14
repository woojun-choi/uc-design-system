# 당근 SEED Design — 읽기 노트

> 회사: 당근(Daangn) · 공식 문서: https://seed-design.io (저장소 github.com/daangn/seed-design) · 라이선스/사용 범위: Apache-2.0 (코드·토큰 저장소. 당근 브랜드 자산의 별도 사용 조건은 미확인) · 플랫폼: Web(React), Lynx, iOS·Android(사내 구현, 공개 패키지 없음) · 조사일: 2026-11-13

## 1. 한 줄 정리
_Rootage YAML 한 곳에 토큰·컴포넌트 스키마를 정의하고 웹·Lynx·iOS·Android로 흘려보내는, 그리고 llms.txt·docs MCP·Figma MCP·CLI·에이전트 스킬까지 갖춰 "AI 에이전트가 읽는 DS"로 가장 앞서 있는 국내 공개 디자인 시스템._

## 2. 핵심 원칙 / 철학
- 슬로건 "Seed to Root, Root to Daangn": 토큰(씨앗)이 컴포넌트(뿌리)를 이루고 당근이라는 제품 생태계로 이어진다는 구조 서사.
- V3(2026 리브랜딩과 함께 공개)의 출발점은 **접근성 기반 색 재설계 + 최소 터치 영역 + 타이포 스타일 축소(38 → 24) + Scale 토큰 도입 + Rootage(단일 원천)**.
- 리브랜딩 대상은 당근 사용자가 아니라 **DS를 쓰는 디자이너·엔지니어**: 사용자 쪽의 친근한 톤 대신 전문적인 톤을 택하고, 주황은 유지하면서 코드 에디터 하이라이트에서 가져온 라임을 포인트 컬러로 더함. 로고는 교차로·동네 지도·뿌리 형태를 결합.
- 디자인 결정을 "사람과 기계가 모두 읽을 수 있는 형태"로 인코딩하는 것이 토큰의 정의(Design Token 문서).
- 리브랜딩 시점: design.co.kr 기사가 2026-08-06에 게재됨(세부 공개는 2026-07~08로 보임. 공식 사이트 업데이트 글에는 날짜가 표시되지 않음 → 정확한 공개일 미확인).
- 성과 지표(공식 글): V3를 처음 적용한 프로필 화면에서 "다른 이웃 모아보기" 약 44% 증가, 체류 시간 Android 68%·iOS 83% 증가.

## 3. 토큰 구조 · 네이밍
- 계층 (primitive → semantic → component 등): **Raw value → Scale 토큰 → Semantic 토큰** + 컴포넌트 스키마(`packages/rootage/components/*.yaml`, 107개 파일). Scale은 값의 집합을 유한하게 만들고 플랫폼 차이를 숨기며, Semantic은 디자인 의도를 표현함(`fg.brand`, `bg.brand`, `global-gutter` 예시). 팔레트(`$color.palette.*`)가 primitive 역할.
- 네이밍 규칙 예시 (실제 토큰 이름 2~3개): 원천 형식은 `$type.category.name`.
  - 색: `$color.fg.brand`, `$color.bg.brand-solid`, `$color.bg.brand-solid-pressed`, `$color.stroke.focus-ring`, `$color.palette.gray-00`
  - 치수: `$dimension.x2`, `$dimension.x1_5`(반 단계는 언더스코어), `$dimension.spacing-x.global-gutter`, `$dimension.spacing-y.between-text`
  - 기타: `$radius.r2`, `$radius.full`, `$font-size.t5`, `$duration.d3`, `$timing-function.enter`, `$shadow.s2`
  - CSS 변수로는 `--seed-color-bg-brand-solid`처럼 평탄화되고, Tailwind에서는 `bg-bg-informative-weak`, `text-fg-brand`, `p-x2`, `rounded-r2`, `t3-bold` 같은 클래스가 됨.
- 색 / 타이포 / 간격 / 라운드 / 그림자 / 모션 스케일:
  - 색: 속성(`fg` / `bg` / `stroke`) × 역할(brand, neutral, positive, warning, critical, informative, layer 등) × 강도(`solid` / `weak` / `muted` / `subtle` / `contrast` / `inverted`) + 상태 접미사(`-pressed`). 채운 면 위 텍스트용 `fg.on-*-solid`가 짝으로 있음. 레이어 배경은 `bg.layer-basement` / `bg.layer-default` / `bg.layer-floating`. 팔레트는 `gray-00`, `gray-100`…처럼 100 단위(라이트/다크 값이 토큰마다 함께 정의됨).
  - 간격: `$dimension.x0_5`(2px)부터 `x16`(64px)까지, 4px 그리드 기반의 x 배수.
  - 라운드: `r0_5`(2px)~`r6`(24px) + `full`(9999px).
  - 타이포: `$font-size.t1`(11px)~`t14`(48px), 각 단계에 `-static`(사용자 글자 크기 설정에 반응하지 않는 고정 px) 변형이 있음. 실사용은 `screen-title`, `article-body`, `t3-regular`처럼 조합된 텍스트 스타일 사용.
  - 모션: `$duration.d1`~`d6`, `$timing-function.easing` / `enter` / `exit`. AGENTS.md가 "하드코딩 전에 시스템 토큰을 먼저 찾을 것"을 규칙으로 둠.
  - 그림자: `$shadow.s*`(정확한 단계 수 미확인). 이 밖에 그라디언트 토큰(AI 관련 비주얼용, 예: `glow-magic`, `highlight-magic`, `shimmer-neutral`)이 있음.
  - 피드백: pressed 시 색(`*-pressed` 토큰)과 축소 스케일(고정 거리 기반)을 함께 정의.
- 포맷·도구 (DTCG JSON, Style Dictionary, Figma Variables 등): 자체 포맷인 **Rootage YAML**(`kind: Tokens`, `kind: TokenCollections`, 컴포넌트 스키마는 JSON Schema 검증). DTCG나 Style Dictionary가 아니라 자체 엔진(`ecosystem/rootage`, 스타일 recipe 엔진 `qvism`)으로 생성. `color.yaml`·`gradient.yaml`·`shadow.yaml`은 `bun figma:sync`로 **Figma Variables에서 역으로 덮어씀**(Figma가 색의 원천). 생성물은 `__generated__/*.json|mjs|d.ts`, CSS vars, Tailwind theme. 공개된 Rootage JSON은 CDN(R2 + Worker)으로도 불변 배포함.

## 4. 테마 · 다크모드 · 브랜드 확장
- 토큰 컬렉션별 "모드"를 명시: `color` → `theme-light` / `theme-dark`, `motion` → `preferred` / `reduced`, `viewport-width` → `base`/`sm`/`md`/`lg`/`xl`. 한 토큰이 모드별 값을 가지는 구조라 다크모드·모션 축소·반응형이 같은 메커니즘으로 처리됨.
- 웹 적용: `<html data-seed-color-mode="system" | "light-only" | "dark-only">`(앱의 정책) + `data-seed-user-color-scheme="light" | "dark"`(실제 기기 설정, `prefers-color-scheme`로 자동 갱신). 하위 요소에 `data-seed-color-mode="light-only"`를 걸어 영역 단위로 테마를 고정할 수 있음.
- 브랜드 확장: 당근 단일 브랜드 중심. 서드파티 브랜딩용 테마 오버라이드 체계는 문서에서 확인 못함(미확인). Theming 가이드와 실험적 Cascade Layers 가이드는 있음.

## 5. 컴포넌트
- 개수·범위: React 컴포넌트 문서 약 65종(llms 인덱스 기준 66페이지, deprecated된 Menu Sheet 포함). Rootage 컴포넌트 스키마 파일은 107개. 레이아웃 프리미티브(Box, Flex, HStack, VStack, Grid, Float, Text)부터 Action Button, Bottom Sheet, Chip Tabs, Date/Time/Wheel Picker, Quantity Picker, Pull To Refresh, Scroll Fog, Snackbar, Segmented Control 등 모바일 앱 성격이 강함.
- API 스타일 (props, 합성 패턴, variant 네이밍): 스타일 컴포넌트(`@seed-design/react`) + 헤드리스 로직(`@seed-design/react-headless`) 분리. 스키마 수준에서 slot 이름을 public contract로 다룸(`root`, `prefix`, `prefixIcon`…). Figma도 variant 나열에서 **property 조합**으로 이동했고 Field를 Header·Slot·Footer로 나눈 조합형 구조를 씀. 레이아웃 컴포넌트는 `bg="bg.layerDefault"`처럼 토큰 이름을 prop 값으로 받음. **스니펫 방식**도 병행: `npx @seed-design/cli add <id>`로 shadcn처럼 코드를 프로젝트에 복사하고, 스니펫마다 필요한 패키지 버전을 선언해 `compat` 명령으로 검사.
- 눈에 띄는 컴포넌트/패턴: Manner Temp(매너온도) 같은 도메인 컴포넌트, Contextual Floating Button, Scroll Fog(스크롤 끝 페이드), Identity Placeholder, Help Bubble. Action Button이 기존 Box Button을 대체(별도 업데이트 글 있음). Stackflow(당근 화면 전환 라이브러리) 통합 패키지.

## 6. 문서 구성
- 사이트 구조 (Foundations / Components / Patterns / Content …): Get Started / Foundations(색·색 역할·팔레트·디자인 토큰·엘리베이션·피드백·그라디언트·아이콘·포용적 디자인·국제화·레이아웃·모션·라운드·간격·상태·타이포·Voice and Tone·Writing) / Components(디자인 스펙: anatomy, properties, guidelines) / Patterns / Design Guidelines / React / Breeze(유틸리티 UI) / Lynx / AI Integration / Updates. **디자인 문서와 플랫폼별 구현 문서가 분리**되어 있음.
- 컴포넌트 페이지 한 장의 구성 (사용 시점, Do/Don't, 접근성, 코드 …): 디자인 쪽은 anatomy → properties → guidelines, React 쪽은 설치(스니펫/패키지) → 예제 → API 레퍼런스. 세부 섹션 순서는 페이지마다 다를 수 있어 미확인.

## 7. 접근성
- 대비 기준은 WCAG 비율이 아니라 **APCA**: 읽어야 하는 본문·화면 제목·입력 텍스트 등 Lc 75 이상(권장 90), 기타 텍스트 Lc 60 이상(16px 미만이면 bold), placeholder·disabled는 Lc 30 이상.
- 터치 영역: 이상적 44×44px, 최소 24×24px. 시각 요소보다 터치 영역을 넓게.
- VoiceOver·TalkBack에서 모든 인터랙션 동작, 장식 요소 숨김, 오류는 `aria-live` + 시각 피드백 + 해결 방법 안내.
- 시스템 글자 크기 설정을 따르고(폰트 토큰의 `-static` 변형으로 예외 처리), 복잡한 제스처에는 단일 터치 대안 제공.
- 모션 컬렉션의 `reduced` 모드로 동작 줄이기 대응.
- 참조: ARIA APG, Apple·Android 접근성 가이드, APCA. WCAG 직접 인용은 없음.

## 8. AI 연동 (llms.txt / MCP / DESIGN.md / 스킬)
- **llms.txt**: `https://seed-design.io/llms.txt`(섹션 인덱스) + 섹션별 `llms.txt` / `llms-full.txt`, 페이지별 `.txt` 원문(`/llms/foundations/color/color-role.txt` 등), React·Lynx changelog txt.
- **Docs MCP** `@seed-design/docs-mcp`: `claude mcp add seed-docs -- npx -y @seed-design/docs-mcp`. 도구는 `discover_tools`, `list_react_components` / `get_react_component` / `get_react_changelog`, `list_docs_components`, `get_rootage`(토큰 원천 조회), `list_icons` / `search_icons` / `get_icon_details` 등.
- **Figma MCP** `@seed-design/mcp`(서버명 `seed-design-figma`): Figma 노드 → React 코드(`get_node_react_code`), `retrieve_color_variable_names` 등. REST(PAT) 모드와 Figma 플러그인 WebSocket 모드. `--config`로 Figma 컴포넌트 → 커스텀 React 컴포넌트 매핑(ComponentHandler).
- **CLI** `@seed-design/cli`: `init`(`seed-design.json` 생성) / `add` / `add-all` / `compat`(버전 호환 검사, exit code로 CI 사용 가능) / `docs [query]`(문서·llms.txt·스니펫 링크 조회).
- **에이전트 스킬**: `npx skills add https://github.com/daangn/seed-design --skill seed-design`. `SKILL.md` + `migration.md` / `upgrade.md` / `doctor.md`(+ 플랫폼별 `doctor-react.md`, `doctor-lynx.md`). doctor는 읽기 전용이고 리포트를 임시 디렉터리에 씀. 규칙 예: 플랫폼 감지 순서(요청 → `seed-design.json`의 `framework` → 의존성), "문서 경로를 하드코딩하지 말고 인덱스를 먼저 읽을 것", React·Lynx 문서 혼용 금지, 수정은 사용자가 명시적으로 요청할 때만.
- 저장소 자체에 `AGENTS.md`(패키지별로도 있음), `CLAUDE.md`, `.claude/`, `.mcp.json`, `ARCHITECTURE.md`가 있어 **DS 저장소를 에이전트가 유지보수하는 구조**의 레퍼런스로 좋음.
- 향후(공식 글): 에이전트가 이해하는 문서 구조, 자연어 문서 어시스턴트, 프로토타이핑·마이그레이션 자동화 실험 중.

## 9. 웹 + iOS 관점
- 멀티플랫폼 토큰을 어떻게 공유하나: Rootage YAML → 생성 단계 → 웹·Lynx CSS / TS, 그리고 JSON(`__generated__/*.json`, npm `@seed-design/rootage-artifacts`, Rootage CDN)으로 공개. 공식 글에 따르면 "디자인 결정을 한 곳에서 관리해 모든 플랫폼으로 전달"하고 컴포넌트 업데이트 시 문서와 각 플랫폼 구현체가 함께 동기화되며, Docs·React·iOS·Android 카탈로그 앱과 Figma MCP·Code Connect를 연결함. 다만 **iOS(SwiftUI/UIKit)·Android 구현과 토큰→Swift 변환기는 공개 저장소에 없음** → 네이티브 측 소비 방식은 미확인. 모드 기반 토큰(라이트/다크, 모션 축소, viewport)은 네이티브 trait(colorScheme, reduceMotion, size class)에 그대로 매핑하기 좋은 형태.
- Lynx(크로스 플랫폼 네이티브 렌더러) 지원은 공개되어 있어 웹 기술로 네이티브를 그리는 경로가 하나 더 있음.

## 10. 내 DS로 가져올 것 (1~3개)
1. **모드를 가진 토큰 컬렉션 구조**: 토큰 파일 하나에 `theme-light`/`theme-dark` 값을 함께 적고, `motion: preferred/reduced`를 별도 컬렉션으로 둔다. 내 DS는 JSON(또는 YAML) 한 파일 → CSS vars(`[data-color-mode]`) + Swift `Color(light:dark:)` 생성 스크립트 하나로 충분.
2. **`fg / bg / stroke` × 역할 × `solid/weak` + `-pressed` + `on-*-solid` 색 네이밍**: 토큰 이름만 보고 에이전트가 올바른 조합을 고를 수 있음. 역할은 brand·neutral·critical·positive 4개, 레이어 배경 3단(`layer-basement/default/floating`) 정도로 축소해서 가져온다.
3. **AI 진입점 3종 세트를 작게**: (a) `llms.txt` + 페이지별 `.txt` 원문, (b) 저장소 루트 `AGENTS.md`에 "하드코딩 전에 토큰부터 찾을 것", "생성 파일 직접 수정 금지" 같은 규칙, (c) `doctor`처럼 읽기 전용 검사 스크립트(하드코딩 색·px 탐지). MCP 서버는 개인 DS 규모에선 나중에.

## 11. 가져오지 않을 것 / 주의
- 자체 토큰 엔진(Rootage)·recipe 엔진(qvism)·Figma 역동기화 파이프라인은 팀 규모용. 개인 DS는 Style Dictionary나 짧은 스크립트로 충분.
- 65+ 컴포넌트 + 헤드리스/스타일 분리 + 스니펫 레지스트리 + CLI는 과함. 스니펫 복사 방식만 참고.
- APCA 기준은 Apple HIG·WCAG 도구 지원과 어긋날 수 있음. 개인 DS는 WCAG 4.5:1을 기본으로 두고 APCA는 참고만.
- `$dimension.x1_5` 같은 언더스코어 반 단계는 Swift 식별자로 바꿀 때 규칙을 미리 정해야 함.
- 당근 주황·라임, Manner Temp 같은 도메인 컴포넌트는 브랜드 자산이므로 구조만 차용.

## 출처
- https://seed-design.io/llms.txt
- https://seed-design.io/llms/foundations/design-token.txt
- https://seed-design.io/llms/foundations/design-token/reference.txt
- https://seed-design.io/llms/foundations/color/color-role.txt
- https://seed-design.io/llms/foundations/inclusive-design.txt
- https://seed-design.io/react/llms.txt
- https://seed-design.io/llms/react/getting-started/styling/theming.txt
- https://seed-design.io/llms/react/getting-started/styling/tailwind-css.txt
- https://seed-design.io/llms/react/getting-started/cli/commands.txt
- https://seed-design.io/ai-integration/llms-full.txt
- https://seed-design.io/llms/updates/how-seed-evolved.txt
- https://seed-design.io/llms/updates/why-design-system-needs-branding.txt
- https://github.com/daangn/seed-design (README, ARCHITECTURE.md, packages/rootage/AGENTS.md, packages/rootage/collections.yaml, packages/rootage/color.yaml)
- https://unpkg.com/@seed-design/css/base.css (CSS 변수 이름 확인)
- https://design.co.kr/article/169523/ (디자인프레스, "당근의 디자인 시스템, SEED 리브랜딩", 2026-08-06)
