# 04. 토큰 · 테마

> 초안. 수치는 M0 스파이크에서 실제로 만들어 보고 조정한다.

## 1. 계층
| 계층 | 예 | 누가 참조 |
|---|---|---|
| primitive | `color.gray.50`, `space.4` | semantic만 |
| semantic | `bg.layer.1`, `fg.on-brand` | 컴포넌트, 화면 |
| component | `button.bg.solid` | 해당 컴포넌트만 (필요할 때만 만든다) |

## 2. 색 단계 = 흰 배경 대비 (원칙 4)
| 단계 | 5 | 10 | 20 | 30 | 40 | **50** | 60 | 70 | 80 | 90 | 95 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 대비 | 1.05 | 1.15 | 1.3 | 1.6 | 2.5 | **4.5** | 6 | 8 | 11 | 15 | 18 |
| gray 예 | `#f9f9f9` | `#efefef` | `#e2e2e2` | `#cccccc` | `#a4a4a4` | `#777777` | `#636363` | `#515151` | `#3c3c3c` | `#272727` | `#171717` |

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
| 레이아웃 | 컨테이너 폭 `container.sm/md/lg` |

## 6. 모드
테마 2 × 모드 3 = **6가지 조합**을 Storybook 툴바 토글로 확인한다.

| 모드 | 내용 |
|---|---|
| light | 기본 |
| dark | 검은 배경 기준으로 팔레트 재생성 |
| high-contrast | 대비 한 단계 올림 + 테두리 굵게 |

## 7. 테마 2개
| | neutral | paper |
|---|---|---|
| 느낌 | 무채색 + 절제된 포인트 1색, 사진이 주인공 | 미색 종이, 잡지·콜라주 |
| seed 색 | 차분한 파랑 계열 (후보) | 붉은 갈색·잉크 계열 (후보) |
| 배경 | 흰색·회색 | 미색 종이 |
| 모서리 | 둥글게 | 거의 각지게 |
| 그림자 | 부드럽게 | 종이를 겹친 느낌 |
| 어울리는 곳 | 포트폴리오, SVG 아이콘 웹, 발표자료, 금융, 쿠션어 | 빈티지 디카 앱, 감시 뽀모도로, 4컷 사진 |

처음부터 두 테마를 같이 만드는 이유: "테마만 바꿔서 무드가 다른 프로젝트를 감당할 수 있나"를 첫 단계에서 확인하려고.
