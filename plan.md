# uc-design-system 개발 계획

> uzun choi의 개인 디자인 시스템.
> 사람과 AI가 모두 읽을 수 있는 디자인 시스템을 목표로 한다.

---

## 1. 배경 & 방향

두 가지 레퍼런스에서 출발한다.

1. **shadcn/ui 베이스 커스텀 시스템** (Threads @leemir.me 사례)
   - shadcn/ui를 그대로 쓰는 게 아니라, 스타트업 UI/UX 아티클에서 검증된
     패턴들을 얹어 "내 입맛대로" 재정의한 시스템.
   - 컴포넌트를 npm 패키지로 소비하지 않고 **코드를 소유**하는 방식
     (copy & customize)이라 개인 시스템에 적합.

2. **Vercel Geist의 `DESIGN.md`** (AI-readable design system)
   - 색상, 폰트, 버튼 규격, 간격 등 디자인 규칙을 **AI가 읽기 쉬운
     플레인 텍스트**로 정리한 문서.
   - Claude/Cursor 등 AI 도구에 넣으면 화면마다 스타일이 어긋나는 문제와
     디자이너-개발자 핑퐁이 줄어든다.
   - 디자인 시스템의 독자가 사람 → AI로 확장되는 흐름.

**결론: "shadcn/ui 기반 토큰-드리븐 컴포넌트 + AI가 소비하는 DESIGN.md"
두 축으로 만든다.**

### 활용처

- 포트폴리오 웹사이트 (진행 중인 사진집/포트폴리오 프로젝트)
- 이후 개인 사이드 프로젝트 전반의 공통 UI 기반

---

## 2. 기술 스택

| 영역 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | React 19 + TypeScript | shadcn/ui 생태계 표준 |
| 스타일링 | Tailwind CSS v4 | CSS 변수 기반 `@theme` 토큰이 디자인 토큰과 1:1 매핑 |
| 컴포넌트 베이스 | shadcn/ui (Radix primitives) | 접근성 확보 + 코드 소유 방식 |
| 토큰 포맷 | CSS custom properties (OKLCH) | 다크모드/테마 전환 용이, Figma 호환 |
| 문서/개발 환경 | Storybook | 컴포넌트 단위 개발 + 비주얼 문서화 |
| 저장소 구조 | 단일 패키지로 시작 → 필요 시 pnpm workspace | 개인 프로젝트, 처음부터 모노레포는 과함 |
| 배포 | 초기에는 copy 방식, 안정화 후 npm 패키지 또는 shadcn registry | |

---

## 3. 시스템 구조

```
uc-design-system/
├── DESIGN.md              # ★ AI-readable 디자인 규칙 문서 (Vercel 방식)
├── plan.md                # 이 문서
├── src/
│   ├── tokens/
│   │   └── tokens.css     # 모든 디자인 토큰 (CSS variables, light/dark)
│   ├── components/ui/     # shadcn 기반 커스텀 컴포넌트
│   ├── lib/utils.ts       # cn() 등 유틸
│   └── styles/globals.css # Tailwind @theme + 토큰 연결
├── stories/               # Storybook 스토리
└── docs/                  # 결정 기록 (왜 이 토큰인지)
```

핵심 원칙: **컴포넌트에 하드코딩 금지.** 모든 색/간격/라운드는
`--uc-*` 토큰만 참조한다. 토큰이 바뀌면 시스템 전체가 함께 바뀐다.

---

## 4. 단계별 계획

### Phase 1 — Foundation: 디자인 토큰 정의 (1~2주)

가장 중요한 단계. 여기서 "내 취향"을 결정한다.

- [ ] **컬러**: 브랜드 무드 결정 (사진 포트폴리오 특성상 사진이 주인공 →
      Vercel처럼 무채색 중심 + 절제된 액센트 1색 추천)
  - background / foreground / muted / accent / destructive 등 시맨틱 토큰
  - light / dark 2모드, OKLCH로 정의
- [ ] **타이포그래피**: 폰트 선정 (국문+영문 페어링, 예: Pretendard + 영문 세리프/모노)
  - 타입 스케일 (display ~ caption, 6~8단계), 웨이트는 3개 이하로 제한
- [ ] **스페이싱**: 4px 베이스 스케일
- [ ] **라운드/섀도/모션**: radius 스케일, elevation 단계, transition 토큰
- [ ] `src/tokens/tokens.css` + Tailwind v4 `@theme` 연결

### Phase 2 — DESIGN.md 작성 (Phase 1과 병행)

Vercel DESIGN.md 구조를 벤치마킹해 다음 섹션으로 작성:

1. Visual Theme & Atmosphere — 시스템의 철학과 무드 (한 문단)
2. Color Palette & Roles — 토큰 표 + 역할 설명
3. Typography Rules — 폰트, 스케일 표, 웨이트 규칙
4. Component Stylings — 버튼/인풋/카드 규격, 포커스 스타일
5. Layout & Spacing — 스페이싱 스케일, 컨테이너 폭
6. Depth & Motion — 섀도 단계, 트랜지션 규칙
7. Do's and Don'ts — 금지/권장 규칙 목록
8. Agent Prompt Guide — AI에게 주는 퀵 레퍼런스 + 예시 프롬프트

작성 후 실제로 Claude Code에 넣고 화면을 생성시켜 **AI가 규칙을 지키는지
테스트**하며 다듬는다. (예쁜 문서가 아니라 AI가 읽기 좋은 문서가 목표)

### Phase 3 — Core 컴포넌트 (2~3주)

shadcn/ui를 설치 후 토큰 기준으로 커스터마이즈. 포트폴리오에 필요한 것부터:

- [ ] 1차: Button, Typography(Heading/Text), Card, Badge, Separator
- [ ] 2차: Input, Textarea, Select, Dialog, Sheet, Tooltip
- [ ] 3차 (포트폴리오 특화): Image/Figure(캡션 포함), Gallery Grid,
      Lightbox, 내비게이션
- [ ] 각 컴포넌트마다 Storybook 스토리 + 접근성 확인 (키보드, 포커스, aria)

### Phase 4 — 문서화 & 검증 (1주)

- [ ] Storybook 배포 (Vercel/GitHub Pages)
- [ ] README 정비: 시스템 소개, 사용법, DESIGN.md 링크
- [ ] AI 테스트: DESIGN.md만 주고 새 페이지 생성 → 기존 화면과 스타일
      일치하는지 비교

### Phase 5 — 실전 적용 & 반복

- [ ] 포트폴리오 웹사이트에 적용하며 부족한 토큰/컴포넌트 발견 → 보강
- [ ] 변경 시 DESIGN.md를 항상 함께 업데이트 (문서가 곧 시스템)
- [ ] 안정화되면 npm 패키지화 또는 shadcn custom registry 구성 검토

---

## 5. 원칙 요약

1. **토큰이 단일 진실 공급원** — 컴포넌트는 토큰만 참조한다.
2. **DESIGN.md는 코드와 함께 산다** — 토큰이 바뀌면 문서도 같은 커밋에서 바뀐다.
3. **작게 시작한다** — 모노레포, 버전 관리, 자동화는 필요해질 때 도입.
4. **AI-first 문서** — 사람에게 예쁜 문서보다 AI가 오해 없이 따라 하는 문서.
5. **사진이 주인공** — UI는 무채색으로 물러나고, 콘텐츠(사진)가 색을 담당.

---

## 6. 참고 자료

- [Vercel Geist 소개](https://vercel.com/geist/introduction)
- [Vercel DESIGN.md 실물 예시 (design-bites)](https://github.com/educlopez/design-bites/blob/main/design-mds/vercel.com/DESIGN.md)
- [Geist 디자인 시스템 분석](https://www.designsystems.one/design-systems/vercel-geist)
- [shadcn/ui + Tailwind + Design Tokens로 확장 가능한 시스템 만들기](https://shadisbaih.medium.com/building-a-scalable-design-system-with-shadcn-ui-tailwind-css-and-design-tokens-031474b03690)
- [shadcn/ui 공식 — The Foundation for your Design System](https://ui.shadcn.com/)
- [shadcn/ui 컴포넌트 확장 가이드 (Vercel Academy)](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
- [DESIGN.md for shadcn/ui 가이드](https://designmd.directory/guides/design-md-for-shadcn)
- [Building a Design System in 2026 (Udacity Engineering)](https://engineering.udacity.com/building-a-design-system-in-2026-5cfd8d85043c)
