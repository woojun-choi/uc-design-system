# 04. 토큰 · 테마

> 초안. 수치는 M0 스파이크에서 실제로 만들어 보고 조정한다.

## 1. 계층
| 계층 | 예 | 누가 참조 |
|---|---|---|
| primitive | `color.gray.50`, `space.4` | semantic만 |
| semantic | `bg.layer.1`, `fg.on-brand` | 컴포넌트, 화면 |
| component | `button.bg.solid` | 해당 컴포넌트만 (필요할 때만 만든다) |

## 2. 색 단계 = 흰 배경 대비 (원칙 4)
| 단계 | 5 | 10 | 20 | 30 | 40 | 45 | **50** | 60 | 70 | 80 | 90 | 95 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 대비 | 1.05 | 1.15 | 1.3 | 1.6 | 2.5 | 3.5 | **4.5** | 6 | 8 | 11 | 15 | 18 |
| gray 예 (45 추가 전) | `#f9f9f9` | `#efefef` | `#e2e2e2` | `#cccccc` | `#a4a4a4` | `#777777` | `#636363` | `#515151` | `#3c3c3c` | `#272727` | `#171717` |

- 50 이상은 흰 배경 위 글자로 써도 WCAG AA(4.5:1) 통과.
- 색 계열: `gray`, `brand`(테마의 seed), `red`, `green`, `yellow`, `blue`.
- 다크 모드는 같은 표를 검은 배경 기준으로 다시 생성한다.

## 3. semantic 색 (원칙 2·5)
| 그룹 | 토큰 | 비고 |
|---|---|---|
| 배경 | `bg.layer.1` `bg.layer.2` `bg.layer.3` | iOS systemBackground / secondary / tertiary |
| | `bg.brand.solid` `bg.brand.weak` | |
| | `bg.danger.*` `bg.success.*` `bg.warning.*` | solid / weak |
| | `bg.overlay` | Dialog 뒤 |
| 글자 | `fg.default` `fg.muted` `fg.subtle` `fg.disabled` | |
| | `fg.brand` `fg.danger` `fg.success` | |
| | `fg.on-brand` `fg.on-danger` … | solid 배경 위 글자 — 배경마다 짝 |
| 테두리 | `stroke.default` `stroke.strong` `stroke.focus` `stroke.danger` | 고대비 모드에선 두께도 키움 |
| 상태 | 위 토큰 + `-hover` `-pressed` | |

## 4. 글자 (원칙 6)
- 글꼴: **Pretendard** (한·영). paper 테마 제목은 한글 세리프 후보(마루 부리, 본명조) — 검증 필요.
- 굵기는 3개 이하 (400 / 600 / 700).

| 이름 | iOS 기본(pt) | 쓰임 |
|---|---|---|
| `largeTitle` | 34 | 화면 제목 |
| `title1` / `title2` / `title3` | 28 / 22 / 20 | 섹션 제목 |
| `headline` | 17 (굵게) | 카드 제목 |
| `body` | 17 | 본문 |
| `callout` / `subheadline` | 16 / 15 | 보조 본문 |
| `footnote` / `caption1` / `caption2` | 13 / 12 / 11 | 설명·라벨 |

웹도 같은 이름의 변수·클래스를 쓴다. 큰 글씨 배율표는 iOS 기준값을 가져온다.

## 5. 나머지
| 그룹 | 토큰 |
|---|---|
| 간격 | 4px 단위 `space.1`(4) … `space.16`(64) |
| 모서리 | `radius.sm` `md` `lg` `full` — 테마마다 값이 다름 |
| 그림자 | `shadow.1` `2` `3` |
| 모션 | `duration.fast/normal/slow`, `easing.standard` — 모션 감소 설정 시 0 |
| 레이아웃 | 컨테이너 폭 `container.sm/md/lg` (640/768/1024) |

## 6. 모드
테마 3 × 모드 2 × 대비 2 = **12가지 조합**을 Storybook 툴바 토글로 확인한다.

| 모드 | 내용 |
|---|---|
| light | 기본 |
| dark | 검은 배경 기준으로 팔레트 재생성 |
| high-contrast | 모드가 아니라 별도 축 — 라이트·다크 둘 다에 적용 (§9) |

## 7. 테마 3개
| | neutral | paper | ink |
|---|---|---|---|
| 느낌 | 무채색 + 절제된 포인트 1색, 사진이 주인공 | 미색 종이, 잡지·콜라주 | 먹과 흰 종이, 흑백과 투명도만 |
| seed 색 | `#3e63dd` 선명한 파랑 | `#9c4a2f` 붉은 갈색 | 없음 (brand = neutral) |
| 배경 | 흰색·회색 | 미색 종이 | `#0c0c0c` 먹 / `#f3f3f3` (다크가 기본) |
| 모서리 | 둥글게 | 거의 각지게 | 각지게 (0) |
| 그림자 | 부드럽게 | 종이를 겹친 느낌 | 없음, 1px 선 |
| 어울리는 곳 | 포트폴리오, SVG 아이콘 웹, 발표자료, 금융, 쿠션어 | 빈티지 디카 앱, 감시 뽀모도로, 4컷 사진 | 작업물 포트폴리오(uzun-choi), 소개 페이지 |

ink는 2026-11-15에 디자인 시스템 없이 만든 포트폴리오(`~/dev/uzun-choi`)에서 뽑았다. 무엇을 어떻게 옮겼는지는 [§10](#10-ink-테마--포트폴리오에서-뽑은-값).

처음부터 두 테마를 같이 만드는 이유: "테마만 바꿔서 무드가 다른 프로젝트를 감당할 수 있나"를 첫 단계에서 확인하려고.

## 8. 실제 구현 (M0)
| 무엇 | 어디 |
|---|---|
| seed · 테마별 덮어쓰기 | `tokens/themes/{neutral,paper,ink}.json` — `seed`는 생성 입력이라 출력에 안 나감 |
| 팔레트 생성 | `src/lib/palette.ts` (Leonardo, OKLCH 보간) — Storybook에서도 같은 코드 |
| semantic | `tokens/semantic/color.json` — 라이트·다크가 같은 단계 번호를 씀 (단계 = 배경 대비라 자동으로 뒤집힘) |
| 빌드 | `scripts/build-tokens.ts` → `npm run tokens` |

Tailwind에서 쓰는 이름:
| 토큰 | 클래스 |
|---|---|
| `bg.layer.1`, `bg.brand.solid` | `bg-layer-1`, `bg-brand-solid` |
| `fg.default`, `fg.on-brand` | `text-default`, `text-on-brand` |
| `stroke.default`, `stroke.focus` | `border-default`, `outline-focus`, `ring-focus` |
| `radius.md` | `rounded-md` |
| `space.N` | `p-N`, `gap-N` … (`--spacing` = `space.1` = 4px) |

Tailwind 기본 색(`bg-blue-500` 등)과 기본 radius는 지웠다.

## 9. M1 기본값
> 2026-11-14 정함. 실제로 보고 어색하면 바꾼다.

| 항목 | 값 |
|---|---|
| 새 단계 | **45** = 대비 3.5. 다크 모드 `bg.brand.solid` 전용 (다른 계열도 같이 생성) |
| `fg.on-brand` 등 `on-*` | 흰색 고정. 라이트 solid 50 / hover 60 / pressed 70, 다크 solid 45 / hover·pressed 40 (50은 흰 글자 4.5 미달), 다크 고대비 solid 40 / hover·pressed 30 |
| 상태 색 seed | red `#d6453d` · green `#2f9e5a` · yellow `#d99a00` · blue `#2f7de1` (두 테마 공통) |
| | `danger` = red, `success` = green, `warning` = yellow, `info` = blue. yellow solid 위 글자는 흰색이 안 돼서 `fg.on-warning` = gray.95 |
| 고대비 | Leonardo `contrast: 1.4`, `stroke.default` → gray.40, 테두리 1px → 2px, 포커스 2px → 3px. 경고 solid는 한 단계 밝게(라이트) |
| 모드 선택 | `data-uc-mode="light|dark"`, `data-uc-contrast="standard|more"` 두 축. 속성이 없으면 `prefers-color-scheme` · `prefers-contrast: more`를 따름 |
| 그 밖에 M1에서 바뀐 것 | `fg.subtle` 50 → 60 (layer.2·3 위 4.5 미달), `stroke.strong` 40 → 45 (인풋 테두리 3 이상) |
| 글꼴 | 본문 Pretendard, paper 제목만 마루 부리 |
| 그림자 neutral | `shadow.1` 0 1px 2px / `2` 0 4px 12px / `3` 0 12px 32px, 검정 6~12% |
| 그림자 paper | `shadow.1` 1px 1px 0 / `2` 2px 3px 0 / `3` 4px 6px 0, 먹색(gray.90) 15~25% — 흐림 없음 |
| 모션 | `duration.fast` 120ms, `normal` 200ms, `slow` 320ms, `easing.standard` cubic-bezier(0.2, 0, 0, 1). `prefers-reduced-motion`이면 0 |
| 95단계 | 미색·다크 배경에서 목표(18) 못 닿으면 검정/흰색 그대로 둠 |

## 10. ink 테마 — 포트폴리오에서 뽑은 값
`~/dev/uzun-choi`(Next.js, Tailwind 임의 값)의 클래스·스타일을 모두 세어서 반복되는 값을 토큰으로 옮겼다.

| 사이트에서 쓰던 값 | 횟수 | → uc 토큰 | 메모 |
|---|---|---|---|
| 배경 `#0c0c0c` | 5+ | `color.background` 다크 (lightness 4 → `#0d0d0d`) | 다크가 기본 얼굴 |
| `#f3f3f3` (메뉴 선, 툴팁) | 4 | `color.background` 라이트 (lightness 96 → `#f2f2f3`) | 사이트엔 라이트 모드가 없어서 이 색으로 만듦 |
| `text-white` | 22 | `fg.default` 다크 = `#ffffff` | 순백 그대로 |
| `text-white/90·80·70` | 10 | `fg.muted` | 투명도 대신 단계색 (배경이 바뀌어도 대비 보장) |
| `text-white/40·60`, `opacity-30` | 5 | `fg.subtle` / `fg.disabled` | |
| 구분선 `bg-white/40·60` 1~2px | 9 | `stroke.default` = gray.40 | 다른 테마(gray.20)보다 진함 |
| `rgba(12,12,12,0.6)` + blur | 1 | `bg.overlay` = `#0c0c0c99` | blur는 토큰 없음 — 필요하면 `backdrop-blur-sm` |
| 둥근 모서리 | 0 | `radius.sm·md·lg` = 0 | |
| 그림자 | 0 | `shadow.*` = 1px 선 (8~16%) | Card·Dialog 경계용 |
| `duration-300 ease-out` | 15+ | `duration.normal` = 300ms | fast 150, slow 500 |
| `cubic-bezier(0.19,1,0.22,1)` | 2 | `easing.standard` | 글자 등장 곡선 |
| `cubic-bezier(0.65,0,0.35,1)` | 2 | (토큰 없음) | 슬라이드 전환 전용. 두 번째 곡선이 필요해지면 `easing.emphasized` 추가 |
| `font-bold` 제목·라벨 | 대부분 | `text.{largeTitle…headline}.weight` = bold | |
| Pretendard | 전체 | `font.family.sans` | |
| NEXON Lv2 Gothic (부제 1곳), itc-bradley-hand (서명 1곳) | 2 | (토큰 없음) | 한 번씩만 쓴 장식 글꼴 → 앱 쪽에서 직접 |
| 포인트 색 | 없음 | `brand` = neutral과 같은 먹/흰 | 링크·포커스도 흑백 |

**옮기지 않은 것**
- 글자 크기: 1920px(데스크톱)·390px(모바일) 시안 기준 `vw` 값 40여 개(`text-[1.25vw]` = 24px, `text-[1.145833vw]` = 22px, `text-[4.10256vw]` = 16px …). 화면 폭에 비례하는 크기는 Dynamic Type 크기 체계와 맞지 않고 확대 설정을 무시해서, 크기는 기존 `text-*`를 그대로 쓴다. 사이트를 uc로 옮길 땐 24px → `text-title3`, 22px → `text-headline`/`text-body`, 16px → `text-callout` 근처로 맞춘다.
- 간격: 모두 `vw` 임의 값이라 4px 단위로 반올림해서 옮긴다.
- 갤러리·메뉴 오버레이·스크롤 내비 같은 조각 → 3차 컴포넌트 후보 ([05-components](05-components.md)).
