# DESIGN.md — uc-design-system

> 사람과 AI가 같이 읽는 디자인 규칙 원본. 토큰이 바뀌면 이 문서도 같은 커밋에서 고친다.
> 1~4장 초안 (M1·M2). 5~9장은 M3에서 채운다. 값의 원본은 `tokens/`, 최종 값은 `dist/tokens.json`.

**가장 중요한 규칙:** 색·간격·모서리·글자 크기는 **토큰 이름으로만** 쓴다. hex, `px` 직접 입력, Tailwind 기본 색(`bg-blue-500`)·크기(`text-sm`)는 쓰지 않는다 — 기본값은 빌드에서 지워져 있어서 써도 동작하지 않는다.

---

## 1. Visual Theme & Atmosphere

테마는 `<html data-uc-theme="…">`로 고른다. 테마를 바꿔도 토큰 이름은 같고 값만 바뀐다.

| 테마 | 무드 | 이럴 때 |
|---|---|---|
| **neutral** (기본) | 무채색 화면에 선명한 파랑 한 색. 둥근 모서리, 흐린 그림자. UI가 물러나고 콘텐츠가 주인공 | 사진 포트폴리오, 도구, 금융, 발표자료 |
| **paper** | 미색 종이 위 붉은 갈색 잉크. 거의 각진 모서리, 흐림 없는 엇갈린 그림자(종이 겹침), 제목은 세리프(마루 부리) | 빈티지 카메라, 4컷 사진, 기록·일기 |

모드와 대비는 따로 고른다. 속성을 안 주면 **시스템 설정을 따른다.**

```html
<html data-uc-theme="paper" data-uc-mode="dark" data-uc-contrast="more">
<!-- data-uc-mode: light | dark       (없으면 prefers-color-scheme) -->
<!-- data-uc-contrast: standard | more (없으면 prefers-contrast) -->
```

- 테마 2 × 모드 2 × 대비 2 = 8조합 모두 대비 검사를 통과한다 (`npm run check:contrast`).
- 모션 줄이기 설정이면 모든 `duration`이 0이 된다.

---

## 2. Color Palette & Roles

### 2.1 규칙
1. 화면·컴포넌트는 **semantic 토큰만** 쓴다 (`bg-*`, `fg-*`, `stroke-*`). 팔레트(`color.gray.50`)는 semantic을 정의할 때만.
2. 이름 = `fg / bg / stroke` × 역할 × `solid / weak`, 상태는 `-hover` `-pressed`.
3. 모든 solid 배경에는 그 위 글자색 짝 `fg-on-*`이 있다. **solid 배경 위 글자는 반드시 `fg-on-*`.**
4. weak 배경 위 글자는 같은 tone의 `fg-*` (예: `bg-danger-weak` 위 `fg-danger`).

### 2.2 팔레트 = 대비 단계
계열: `gray` `brand` `red` `green` `yellow` `blue`. 단계 번호가 곧 배경 대비다.

| 단계 | 5 | 10 | 20 | 30 | 40 | 45 | **50** | 60 | 70 | 80 | 90 | 95 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 배경 대비 | 1.05 | 1.15 | 1.3 | 1.6 | 2.5 | 3.5 | **4.5** | 6 | 8 | 11 | 15 | 18 |

- 50 이상 = 글자로 써도 4.5 이상. 45 = UI 경계(3 이상) 전용.
- 다크도 같은 번호를 쓴다 (다크 배경 기준으로 다시 만들어서 밝기가 뒤집힌다).

### 2.3 배경
| 토큰 | Tailwind | 쓰임 | neutral 라이트/다크 | paper 라이트/다크 |
|---|---|---|---|---|
| `bg.layer.1` | `bg-layer-1` | 화면 바탕 (iOS systemBackground) | `#ffffff` / `#171717` | `#f4ecda` / `#1e1a14` |
| `bg.layer.2` | `bg-layer-2` | 카드·구획 (secondary) | `#f9f9f9` / `#1c1c1c` | `#efe7d4` / `#231f19` |
| `bg.layer.3` | `bg-layer-3` | 카드 안 구획 (tertiary) | | |
| `bg.overlay` | `bg-overlay` | Dialog 뒤 어둡게 | | |

### 2.4 글자
| 토큰 | Tailwind | 쓰임 |
|---|---|---|
| `fg.default` | `text-default` | 본문, 제목 |
| `fg.muted` | `text-muted` | 보조 설명 |
| `fg.subtle` | `text-subtle` | 메타 정보(날짜, 캡션) |
| `fg.disabled` | `text-disabled` | 비활성 표시 전용 (대비 기준 밖) |
| `fg.{tone}` | `text-brand` `text-danger` … | 링크, 상태 문구 |
| `fg.on-{tone}` | `text-on-brand` `text-on-danger` … | solid 배경 위 글자 |

### 2.5 tone (의미)
| tone | 계열 | 쓰임 |
|---|---|---|
| `neutral` | gray | 중립 동작. solid는 검정(다크에선 흰색) |
| `brand` | brand | 주요 동작, 선택됨 |
| `danger` | red | 삭제, 에러 |
| `success` | green | 완료, 성공 |
| `warning` | yellow | 주의. solid 위 글자는 어두운색 (노랑은 흰 글자가 안 보여서) |
| `info` | blue | 안내 |

tone마다 `bg-{tone}-solid` `-solid-hover` `-solid-pressed`, `bg-{tone}-weak` `-weak-hover` `-weak-pressed`.

### 2.6 테두리
| 토큰 | Tailwind | 쓰임 |
|---|---|---|
| `stroke.default` | `border-default` (기본값이라 `border`만 써도 됨) | 구분선, 카드 |
| `stroke.strong` | `border-strong` | 인풋 테두리 (배경 대비 3 이상) |
| `stroke.focus` | `outline-focus` `ring-focus` | 포커스 링 (전역 `:focus-visible`에 이미 걸려 있음) |
| `stroke.danger` | `border-danger` | 에러 인풋 |
| `stroke-width.default / focus` | `border` / `outline` | 1px / 2px, 고대비에서 2px / 3px |

### 2.7 shadcn 이름
shadcn 컴포넌트를 그대로 붙여 넣어도 테마를 따르도록 `--background` `--primary` 등이 uc 토큰에 연결돼 있다 (`src/styles/shadcn.css`). **새로 쓰는 코드는 uc 이름을 쓴다** (`bg-primary` ✗ → `bg-brand-solid` ✓).

---

## 3. Typography Rules

### 3.1 글꼴
| 토큰 | Tailwind | neutral | paper |
|---|---|---|---|
| `font.family.sans` | `font-sans` (기본) | Pretendard | Pretendard |
| `font.family.heading` | `font-heading` | Pretendard | 마루 부리 (MaruBuri) |

글꼴 파일은 쓰는 쪽에서 불러온다:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<!-- paper 테마일 때만 -->
<link rel="stylesheet" href="https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css" />
```

### 3.2 크기 — iOS Dynamic Type 이름 그대로
`text-{이름}` 하나로 크기·줄 높이·굵기가 같이 들어간다. **제목 4개(large-title, title1~3)는 `font-heading`을 같이 쓴다.**

| Tailwind | iOS | 크기/줄 높이 | 굵기 | 쓰임 |
|---|---|---|---|---|
| `text-large-title` | largeTitle | 34/41 | 400 | 화면 제목 |
| `text-title1` | title1 | 28/34 | 400 | 큰 섹션 제목 |
| `text-title2` | title2 | 22/28 | 400 | 섹션 제목 |
| `text-title3` | title3 | 20/25 | 400 | 작은 섹션 제목 |
| `text-headline` | headline | 17/22 | 600 | 카드 제목, 버튼 |
| `text-body` | body | 17/22 | 400 | 본문 (기본) |
| `text-callout` | callout | 16/21 | 400 | 보조 본문 |
| `text-subheadline` | subheadline | 15/20 | 400 | 부제 |
| `text-footnote` | footnote | 13/18 | 400 | 설명 |
| `text-caption1` | caption1 | 12/16 | 400 | 라벨, 메타 |
| `text-caption2` | caption2 | 11/13 | 400 | 가장 작은 글자 |

### 3.3 굵기
3개만: `font-regular`(400) · `font-semibold`(600) · `font-bold`(700). 강조는 굵기보다 크기·색으로 먼저 한다.

### 3.4 예시
```tsx
<article className="bg-layer-1">
  <h1 className="font-heading text-large-title text-default">여름의 끝</h1>
  <p className="text-subheadline text-muted">2026년 8월 · 필름 사진 12장</p>
  <p className="mt-4 text-body text-default">해가 기울 무렵의 골목은…</p>
  <button className="rounded-md bg-brand-solid px-4 py-2 text-headline text-on-brand hover:bg-brand-solid-hover">
    사진 보기
  </button>
</article>
```

---

## 4. Component Stylings

컴포넌트는 `src/components/ui/`에 있다. **새로 만들기 전에 여기 있는지 먼저 본다.** 스타일은 props(`variant` · `tone` · `size`)로만 바꾸고, `className`으로 색을 덮어쓰지 않는다 (레이아웃용 `className`은 괜찮다: `w-full`, `mt-4` 등).

공통 API (원칙 8):
- `variant` = 강조 정도 · `tone` = 의미 (`neutral` `brand` `danger` `success` `warning` `info`) · `size` = `sm` `md` `lg`
- 포커스 링은 전역 `:focus-visible`이 그린다. 컴포넌트에서 `outline-none` 하지 않는다.

### 4.1 Button
| prop | 값 | 기본 |
|---|---|---|
| `variant` | `solid` `weak` `outline` `ghost` | `solid` |
| `tone` | `neutral` `brand` `danger` | `brand` |
| `size` | `sm`(32) `md`(40) `lg`(48) `icon`(40×40) | `md` |
| `loading` | 스피너 + 누를 수 없음 (`aria-busy`) | |
| `asChild` | 자식(`<a>`)에 버튼 모양 | |

- 화면의 주요 동작 1개만 `solid`. 나머지는 `weak` · `outline` · `ghost`.
- 글자는 동사로 끝낸다: "저장하기", "삭제하기". "확인" ✗.
- 아이콘만 있으면 `size="icon"` + `aria-label`.
- 모서리 `rounded-md`, 글자 `font-semibold`, 비활성은 투명도 40%.

### 4.2 Input
| prop | 쓰임 |
|---|---|
| `label` | 항상 보이는 라벨. 없으면 `aria-label` 필수 |
| `hint` | 아래 도움말 |
| `error` | 에러 문구(원인 + 해결). 있으면 `stroke.danger` 테두리 + `aria-invalid` |
| `required` | 라벨에 `*` |

- 높이 40, `rounded-md`, 테두리 `stroke.strong`, 포커스 시 `stroke.focus`.
- placeholder는 예시만 ("예: 여름의 끝"). 라벨 대신 쓰지 않는다.

### 4.3 Card
| `variant` | 모습 |
|---|---|
| `outlined` (기본) | `bg-layer-1` + 테두리 |
| `elevated` | `bg-layer-1` + `shadow-2` |
| `flat` | `bg-layer-2` |

조각: `CardHeader` · `CardTitle`(h3, `text-headline`) · `CardDescription` · `CardContent` · `CardFooter`. 안쪽 여백 `p-5`, 조각 사이 `gap-4`, 모서리 `rounded-lg`. 카드 안에 카드 ✗. 사진 카드는 `flat` + `p-0 overflow-hidden`.

### 4.4 Badge
| prop | 값 | 기본 |
|---|---|---|
| `variant` | `weak` `solid` | `weak` |
| `tone` | `neutral` `brand` `danger` `success` `warning` `info` | `neutral` |

누르는 요소가 아니다. 2~6자. 같은 상태엔 항상 같은 tone (공개됨 = `success`, 실패 = `danger`, 검토 중 = `warning`).

### 4.5 Dialog
조각: `Dialog` · `DialogTrigger` · `DialogContent`(`tone`, `showClose`) · `DialogHeader` · `DialogTitle` · `DialogDescription` · `DialogFooter` · `DialogClose`.

- 폭 `max-w-xs`(448), `rounded-lg`, `shadow-3`, 뒤는 `bg-overlay`.
- `DialogTitle`은 꼭 둔다. 버튼은 `DialogFooter`에 2개까지, 주요 버튼이 오른쪽.
- **삭제 확인:** `tone="danger"` + `showClose={false}`, 제목은 "'○○'을 삭제할까요?", 설명에 "되돌릴 수 없어요", 버튼은 `취소하기`(weak · neutral) + `삭제하기`(solid · danger), 처음 포커스는 취소.

---

## 5~9장 (예정)
5 Layout & Spacing · 6 Depth & Motion · 7 Writing · 8 Do's and Don'ts · 9 Agent Prompt Guide (M3)

미리 알아 둘 값: 간격 `p-N` = N × 4px · 모서리 `rounded-sm/md/lg/full` · 그림자 `shadow-1/2/3` · 컨테이너 `max-w-xs/sm/md/lg` (448/640/768/1024) · 전환 `ease-standard`, 기본 200ms.
