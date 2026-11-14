# 결정 기록

> 새 결정은 아래에 추가. 바뀐 결정은 지우지 말고 새 줄로 남긴다.

| 날짜 | 결정 | 이유 |
|---|---|---|
| 2026-11-13 | 방향 = 읽고 → 만들기. 읽기 · 시작 도구 · 만들기 · AI 연동을 하나의 흐름으로 | 메모가 "DS 문서 읽어보기"뿐이라 공부·제작 둘 다로 해석 |
| 2026-11-13 | 웹 + iOS, 개인용 | iOS 앱들과 토큰 공유 |
| 2026-11-13 | 디자인 시스템 11개 읽기 (Material 3, Apple HIG, Atlassian, Primer, Fluent 2, Carbon, shadcn/ui, Polaris, 당근 SEED, 토스 TDS, KRDS) | 유명 DS 13개 지도에서 선택. Ant Design·GOV.UK 제외 |
| 2026-11-13 | 컴포넌트 베이스 = shadcn/ui | 코드 소유, 접근성, AI 친화 |
| 2026-11-13 | iOS는 토큰만 공유 (컴포넌트는 SwiftUI 기본) | 범위 줄이기 |
| 2026-11-13 | URL → 테마 추출기는 CSS 파싱 방식 | 실제 값 추출 |
| (plan.md) | 레퍼런스 = shadcn/ui 커스텀 사례 + Vercel Geist DESIGN.md | 처음 계획 |
| (plan.md) | 첫 활용처 = 사진 포트폴리오 | 처음 계획 |
| 2026-11-14 | 원칙 12개 전부 채택 + 운영 원칙 4개 | [02-principles](02-principles.md) |
| 2026-11-14 | 테마 2개(neutral · paper) 동시에 시작 | 테마만으로 무드 차이를 감당하는지 처음부터 확인 |
| 2026-11-14 | 1차 컴포넌트 = Button, Input, Card, Badge, Dialog | 토큰·문서 흐름 먼저 완성 |
| 2026-11-14 | 저장소 = **단일 패키지로 시작**, 필요할 때 workspace | plan.md("작게 시작")와 구체화안(처음부터 workspace)이 달라서 문답으로 정함 |
| 2026-11-14 | 토큰 원본 = **DTCG JSON 한 소스** (CSS 출력은 OKLCH) | plan.md(CSS 직접 작성)와 달라서 문답. iOS 공유에 필요 |
| 2026-11-14 | AI 문서 = **DESIGN.md + AGENTS.md·스킬 + lint 둘 다** | plan.md(DESIGN.md)와 구체화안(AGENTS.md+스킬)을 합침. DESIGN.md 단독은 토큰 비효율(Atlassian) |
| 2026-11-14 | 첫 적용 = **Storybook에서 먼저 완성 → 포트폴리오** | 두 계획을 순서로 합침 |
| 2026-11-14 | 문서는 Storybook 먼저, Next.js 문서 사이트는 workspace 전환 때 | 단일 패키지로 시작하기로 해서 |
| 2026-11-14 | idea_bank의 05 구체화 문서·읽기 노트를 이 저장소로 옮김, plan.md는 docs/로 나눠 합침 | 디자인 시스템 자료를 한곳에 |
| 2026-11-14 | 패키지 매니저 = **npm** | pnpm이 설치돼 있지 않고, 단일 패키지라 차이 없음. workspace 전환 때 다시 판단 |
| 2026-11-14 | 테마 · 모드 전환 = `<html data-uc-theme data-uc-mode>` 속성 | 테마 × 모드를 독립적으로 바꿀 수 있음. 기본(neutral·light)은 `:root`에도 |
| 2026-11-14 | Tailwind 클래스 = 용도별 이름공간: `bg-layer-1` `text-default` `border-default` `outline-focus` | `--color-*`에 넣으면 `bg-fg-default` 같은 잘못된 조합이 생김. 기본 팔레트(`bg-blue-500` 등)는 지워서 하드코딩을 막음 (원칙 1) |
| 2026-11-14 | `fg.on-brand` = 배경색(`color.background`) | brand.50이 배경 대비 4.5라서 짝이 자동으로 맞음. 다크에선 어두운 글자가 됨 — 열린 질문 |
| 2026-11-14 | Leonardo 보간 = OKLCH, paper는 gray key 3개(미색·중간·먹)로 배경을 정확히 미색에 맞춤 | key 1개면 배경이 거의 흰 회색이 됨 |
| 2026-11-14 | Swift 출력 = 테마마다 `UCColors.neutral/.paper`, 색은 UIColor 동적 색으로 라이트/다크 자동 | 앱에서 테마를 골라 쓰기 쉬움. iOS 전용(UIKit) |
| 2026-11-14 | 생성 파일(`tokens.css`, `tokens.theme.css`, `UCColor.swift`)도 커밋한다 | 다른 프로젝트가 빌드 없이 복사해 갈 수 있게 (원칙 9) |
| 2026-11-14 | seed 확정: neutral brand = `#3e63dd`(선명한 파랑), paper brand = `#9c4a2f`(붉은 갈색). gray는 neutral `#737373`, paper `#f4ecda`·`#8a7d66`·`#2e2a24` | Storybook `기초/seed 후보`에서 후보 4개씩 비교. 대비는 Leonardo가 맞추므로 색조·채도로 고름 |
| 2026-11-14 | `fg.on-brand` = 모드 상관없이 흰 글자. 다크에선 `bg.brand.solid`를 새 단계 **45(대비 3.5)**로 | 다크에서 흰 글자 4.5 이상 + 버튼 경계 3 이상을 둘 다 맞추는 구간이 대비 3~4 사이뿐. iOS 다크 버튼과 같은 느낌 |
| 2026-11-14 | 상태 색 seed = red `#d6453d` · green `#2f9e5a` · yellow `#d99a00` · blue `#2f7de1`, 두 테마 공통 | 같은 의미는 같은 색이 덜 헷갈림. 필요하면 테마 파일에서 덮어쓰기 |
| 2026-11-14 | 고대비 모드 = Leonardo `contrast` 배율 1.4 + 테두리 1px→2px | 단계 번호·semantic 매핑을 그대로 두고 값만 진해짐. 따로 관리할 표가 없음 |
| 2026-11-14 | 모드 기본값 = 시스템 설정(`prefers-color-scheme`, `prefers-contrast: more`)을 따르고, `data-uc-mode`가 있으면 그걸 우선 | 사용자 설정 존중. 강제로 바꾸고 싶을 때만 속성 |
| 2026-11-14 | paper 제목 글꼴 = 마루 부리 (본문은 두 테마 모두 Pretendard) | 무료(OFL)·웹폰트 있음·굵기 여러 개. 본명조보다 화면에서 덜 딱딱함 |
| 2026-11-14 | 그림자: neutral = 흐린 그림자 3단계, paper = 흐림 0인 엇갈린 그림자(종이 겹침). 모션: 120 / 200 / 320ms, `cubic-bezier(0.2, 0, 0, 1)` | 테마 무드 차이를 그림자로 크게 냄. 모션은 iOS 기본 속도 근처 |
| 2026-11-14 | Storybook 배포 = GitHub Pages, 레지스트리 이름 = `@uc` | 저장소와 같은 곳, 추가 계정 없음 |
| 2026-11-14 | 고대비는 모드 값이 아니라 **별도 축** `data-uc-contrast`. 테마 2 × 모드 2 × 대비 2 = 8조합 | 다크 + 고대비도 필요해서 (iOS도 둘이 따로). 앞서 정한 `data-uc-mode="high-contrast"`를 바꿈 |
| 2026-11-14 | 다크 solid hover·pressed = 40 (앞서 정한 '밝게 50·60' 취소) | 대비 검사에서 50 위 흰 글자가 3.97로 미달 |
| 2026-11-14 | `fg.subtle` 50 → 60, `stroke.strong` 40 → 45 | 대비 검사: subtle이 layer.2·3 위 미달, 인풋 테두리 3 미달 |
| 2026-11-14 | Tailwind 기본 글자 크기·그림자·글꼴·ease·container도 지움. 글자는 `text-body` 등 iOS 이름만 | 하드코딩 차단 (원칙 1·6) |
| 2026-11-14 | 대비 검사는 `npm run tokens`에 묶어서 미달이면 빌드 실패 | 토큰을 고칠 때마다 자동으로 확인 |
| 2026-11-14 | shadcn 연결은 `src/styles/shadcn.css`로 분리. 새 코드는 uc 이름만 | 붙여 넣은 shadcn 컴포넌트도 테마를 따르게 하되 이름은 하나로 |
| 2026-11-14 | neutral tone 토큰 추가: solid = gray.90(다크에선 흰색), 위 글자 = 배경색 | Button `tone="neutral"`에 필요. 검정 버튼은 포트폴리오에 잘 어울림 |
| 2026-11-14 | Badge tone에 `info` 추가 | 토큰이 이미 있고 '안내' 상태가 필요 |
| 2026-11-14 | Input은 tone prop 없이 `error`가 있으면 danger | tone과 에러 문구가 따로 놀면 어긋남 |
| 2026-11-14 | 컨테이너 `xs` = 448px (Dialog 폭) | Dialog에 임의 값(`max-w-[28rem]`)을 안 쓰려고 |
| 2026-11-14 | `cn()`에 uc 토큰 이름을 알려 준 tailwind-merge | 기본 설정이면 `text-headline`(크기)과 `text-on-brand`(색)를 같은 그룹으로 보고 하나를 지움 |
| 2026-11-14 | 아이콘 = lucide-react, Radix = `radix-ui` 통합 패키지 | shadcn 기본과 같음 |
| 2026-11-14 | Storybook 문서 = MDX(remark-gfm) + 접근성 애드온, 문서 미리보기 칸은 테마 바탕색 | 원칙 11 문서 1장. 표를 쓰려고 GFM |
| 2026-11-15 | lint = ESLint + eslint-plugin-better-tailwindcss(globals.css를 읽어 토큰에 없는 클래스를 에러로) + no-restricted-syntax(hex·style 숫자) | Tailwind 기본값을 지워 둔 덕에 '모르는 클래스' 하나로 대부분 잡힘. 직접 만든 스크립트보다 JSX를 정확히 읽음 |
| 2026-11-15 | 임의 값은 색·간격·크기 유틸리티만 막고, `var(--uc-*)`와 grid 템플릿·variant(`[&_svg]:`)는 허용 | 레이아웃 표현까지 막으면 우회 코드가 생김 |
| 2026-11-15 | Button 아이콘 크기를 size마다 토큰 크기로 (임의 값 `1.15em` 제거) | lint 규칙을 컴포넌트에도 똑같이 |
| 2026-11-15 | Claude Code 스킬 이름 = `uc-ui`, 저장소 안 `.claude/skills/`. 다른 프로젝트엔 AGENTS.md·DESIGN.md·스킬·eslint 설정을 같이 복사 | 코드 복사형 배포(원칙 9)와 같은 방식 |
