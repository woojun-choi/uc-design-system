# DESIGN.md — uc-design-system

> 사람과 AI가 같이 읽는 디자인 규칙 원본. 토큰이 바뀌면 이 문서도 같은 커밋에서 고친다.
> 값의 원본은 `tokens/`, 최종 값은 `dist/tokens.json`. 규칙은 `npm run lint`가 강제한다.
> AI는 [AGENTS.md](AGENTS.md)를 먼저 읽고, 필요한 장만 여기서 찾아 읽는다.

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
- **삭제 확인:** `tone="danger"` + `showClose={false}`, 제목은 "'○○'을 삭제할까요?", 설명에 "되돌릴 수 없어요", 버튼은 `취소하기`(weak · neutral) + `삭제하기`(solid · danger), 처음 포커스는 취소 (`취소하기` 버튼에 `autoFocus`).

---

## 5. Layout & Spacing

### 5.1 간격
4px 단위. Tailwind 숫자 = N × 4px (`p-4` = 16px). **쓰는 값은 아래만:**

| 토큰 | 값 | 주로 |
|---|---|---|
| `space.1` · `2` | 4 · 8 | 아이콘과 글자 사이, 배지 안 |
| `space.3` · `4` | 12 · 16 | 버튼 안, 인풋 안, 목록 항목 사이 |
| `space.5` · `6` | 20 · 24 | 카드 안쪽, Dialog 안쪽 |
| `space.8` · `10` · `12` | 32 · 40 · 48 | 구획 사이 |
| `space.16` | 64 | 화면 위아래 큰 여백 |

- 관계가 가까울수록 좁게: 라벨↔인풋 `gap-1.5`, 항목 사이 `gap-4`, 구획 사이 `gap-10` 이상.
- 화면 좌우 여백: 모바일 `px-4`, 넓은 화면 `px-6` 이상.
- 임의 값(`p-[13px]`)은 lint 에러.

### 5.2 컨테이너
| 클래스 | 폭 | 쓰임 |
|---|---|---|
| `max-w-xs` | 448 | Dialog, 좁은 양식 |
| `max-w-sm` | 640 | 글 본문, 설정 화면 |
| `max-w-md` | 768 | 일반 화면 |
| `max-w-lg` | 1024 | 갤러리, 넓은 목록 |

가운데 정렬은 `mx-auto w-full max-w-md px-4`.

### 5.3 배경 층
화면 바탕 `bg-layer-1` → 구획·카드 `bg-layer-2` → 그 안 구획 `bg-layer-3`. 세 단계를 넘기지 않는다.

### 5.4 모서리
| 클래스 | neutral | paper | 쓰임 |
|---|---|---|---|
| `rounded-sm` | 6 | 0 | 작은 요소, 체크박스 |
| `rounded-md` | 10 | 2 | 버튼, 인풋 |
| `rounded-lg` | 16 | 4 | 카드, Dialog |
| `rounded-full` | 원 | 원 | 배지, 아바타 |

---

## 6. Depth & Motion

### 6.1 그림자
| 클래스 | 쓰임 |
|---|---|
| `shadow-1` | 살짝 뜬 요소 (눌리는 카드) |
| `shadow-2` | 떠 있는 카드 (`Card variant="elevated"`) |
| `shadow-3` | 겹쳐 뜨는 것 (Dialog, 메뉴) |

neutral은 흐린 그림자, paper는 흐림 없이 어긋난 그림자(종이 겹침). 그림자를 직접 만들지 않는다.

### 6.2 모션
| 토큰 | 값 | 쓰임 |
|---|---|---|
| `duration.fast` | 120ms | hover, 닫힘 |
| `duration.normal` | 200ms | 기본 전환, 열림 (`transition-*` 기본값) |
| `duration.slow` | 320ms | 큰 화면 전환 |
| `ease-standard` | cubic-bezier(0.2, 0, 0, 1) | 모든 전환 |

- 색·배경 바뀜은 `transition-colors` 하나면 된다 (길이·곡선은 기본값이 토큰).
- 등장·퇴장 애니메이션은 `animate-fade-in/out`, `animate-pop-in/out`.
- 모션 줄이기 설정이면 모든 길이가 0 — 따로 처리할 필요 없다.

---

## 7. Writing

문구 규칙 (원칙 12). 모든 화면 글자에 적용.

| 규칙 | ✓ | ✗ |
|---|---|---|
| **해요체** | "사진을 올렸어요" | "사진이 업로드되었습니다" |
| **버튼은 동사로 끝낸다** | "저장하기", "사진 추가하기" | "확인", "OK", "저장" |
| **같은 동작엔 같은 단어** | 늘 "삭제하기" | 화면마다 "삭제" / "지우기" / "제거" |
| **에러는 원인 + 해결** | "이메일 형식이 아니에요. @ 뒤에 주소까지 입력해 주세요." | "잘못된 입력입니다" |
| **확인은 질문으로, 대상을 구체적으로** | "'여름의 끝' 앨범을 삭제할까요?" | "정말 삭제하시겠습니까?" |
| **되돌릴 수 없으면 말한다** | "되돌릴 수 없어요" | (안 알림) |
| **빈 화면엔 다음 행동** | "아직 사진이 없어요. 첫 사진을 올려 보세요." | "데이터 없음" |
| **진행 중** | "저장하는 중" | "저장 중..." / "Loading" |
| **짧게** | 배지 2~6자, 버튼 2~8자 | |

자주 쓰는 동작 단어: 저장하기 · 취소하기 · 삭제하기 · 만들기 · 바꾸기 · 올리기 · 닫기 · 다음으로 · 공유하기.

---

## 8. Do's and Don'ts

| ✓ Do | ✗ Don't | 왜 |
|---|---|---|
| `bg-layer-2`, `text-muted` | `bg-gray-100`, `text-gray-500`, `#f5f5f5` | 테마·다크·고대비가 안 바뀜 (lint 에러) |
| `p-4`, `gap-2` | `p-[13px]`, `style={{ padding: 12 }}` | 4px 단위가 깨짐 (lint 에러) |
| `text-body`, `text-title2 font-heading` | `text-sm`, `text-[15px]` | iOS 이름 체계 (lint 에러) |
| solid 배경 위 `text-on-*` | `bg-brand-solid text-white` | 다크·고대비에서 대비 깨짐 |
| `<Button tone="danger">` | `<Button className="bg-red-…">` | 상태색·hover가 다 따라와야 함 |
| 있는 컴포넌트부터 (`src/components/ui/`) | 비슷한 버튼을 새로 만들기 | |
| 한 영역에 `solid` 버튼 1개 | `solid` 여러 개 | 주요 동작이 흐려짐 |
| 색 + 글자로 상태 전달 | 빨간 점 하나 | 색을 못 보는 사람 |
| 포커스 링은 그대로 | `outline-none` | 키보드 사용자가 길을 잃음 |
| 사진이 주인공이면 neutral, 장식 빼기 | 사진 옆에 브랜드 색 배경 | 원칙: UI가 물러난다 |

---

## 9. Agent Prompt Guide

### 9.1 빠른 참조
```
배경   bg-layer-1(바탕) bg-layer-2(카드) bg-layer-3(카드 안) bg-overlay
       bg-{tone}-solid|-hover|-pressed  bg-{tone}-weak|-hover|-pressed
글자   text-default text-muted text-subtle text-disabled text-{tone} text-on-{tone}
테두리 border(기본색) border-strong border-focus border-danger · outline-focus ring-focus
tone   neutral brand danger success warning info
크기   text-large-title title1 title2 title3 headline body callout subheadline footnote caption1 caption2
       제목(large-title, title1~3)은 font-heading 같이
굵기   font-regular font-semibold font-bold
간격   p-N m-N gap-N (N×4px: 1 2 3 4 5 6 8 10 12 16)
모서리 rounded-sm rounded-md rounded-lg rounded-full
그림자 shadow-1 shadow-2 shadow-3
폭     max-w-xs(448) sm(640) md(768) lg(1024)
모션   transition-colors(기본 200ms ease-standard) animate-fade-in animate-pop-in
```

### 9.2 컴포넌트
```tsx
import { Button } from '@/components/ui/button'      // variant solid|weak|outline|ghost · tone neutral|brand|danger · size sm|md|lg|icon · loading · asChild
import { Input } from '@/components/ui/input'        // label hint error required
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'  // variant outlined|elevated|flat
import { Badge } from '@/components/ui/badge'        // variant weak|solid · tone neutral|brand|danger|success|warning|info
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'  // DialogContent tone neutral|danger
```

### 9.3 예시 요청 → 결과
**"앨범 카드 목록 만들어줘"**
```tsx
<main className="mx-auto w-full max-w-lg px-4 py-10">
  <h1 className="font-heading text-large-title text-default">앨범</h1>
  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
    {albums.map((a) => (
      <li key={a.id}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{a.title}</CardTitle>
              <Badge tone={a.public ? 'success' : 'neutral'}>{a.public ? '공개됨' : '비공개'}</Badge>
            </div>
            <CardDescription>{a.date} · 사진 {a.count}장</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button size="sm">열기</Button>
          </CardFooter>
        </Card>
      </li>
    ))}
  </ul>
</main>
```

**"설정 화면"** → `max-w-sm`, 구획마다 `Card variant="flat"`, 라벨 있는 `Input`, 아래에 `저장하기`(solid) + `취소하기`(weak · neutral).

### 9.4 자주 쓰는 패턴
컴포넌트가 아직 없는 것들. 아래 모양 그대로 쓴다.

**빈 화면** — 무엇이 없는지 + 다음 행동 버튼 하나
```tsx
<div className="flex flex-col items-center gap-4 rounded-lg bg-layer-2 px-6 py-16 text-center">
  <p className="text-headline text-default">아직 앨범이 없어요</p>
  <p className="text-callout text-muted">첫 앨범을 만들어 사진을 모아 보세요.</p>
  <Button>앨범 만들기</Button>
</div>
```

**처리 결과 알림** (저장됐어요, 실패했어요) — `role="status"`, tone의 weak 배경
```tsx
<p role="status" className="rounded-md bg-success-weak p-3 text-callout text-success">저장했어요.</p>
<p role="alert" className="rounded-md bg-danger-weak p-3 text-callout text-danger">저장하지 못했어요. 잠시 뒤 다시 시도해 주세요.</p>
```

**위험 구역** (계정 삭제 등) — 화면 맨 아래 따로. 테두리 tone은 `className`으로 바꿔도 된다 (4장의 예외)
```tsx
<Card variant="outlined" className="border-danger">
  <CardHeader>
    <CardTitle className="text-danger">위험 구역</CardTitle>
    <CardDescription>계정을 삭제하면 사진과 앨범이 모두 사라져요. 되돌릴 수 없어요.</CardDescription>
  </CardHeader>
  <CardFooter><Button variant="outline" tone="danger">계정 삭제하기</Button></CardFooter>
</Card>
```

**여러 줄 입력** — Textarea 컴포넌트 전까지
```tsx
import { inputClass } from '@/components/ui/input'
import { cn } from '@/lib/utils'
<textarea className={cn(inputClass, 'h-auto py-2')} rows={4} />  // 라벨은 Input과 같은 모양으로 직접
```

### 9.5 끝내기 전에
1. `npm run lint` — 에러 0
2. 새 문구가 7장 규칙에 맞는지
3. 테마를 바꿔도(neutral ↔ paper, 다크) 깨지지 않는지 — 토큰만 썼다면 자동으로 맞다
