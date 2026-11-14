# AGENTS.md — uc-design-system으로 UI 만들 때

이 프로젝트의 화면은 uc-design-system 토큰과 컴포넌트로만 만든다. 자세한 규칙은 [DESIGN.md](DESIGN.md), 빠른 참조는 **9장**.

## 핵심 규칙
1. **색·간격·모서리·글자 크기는 토큰 클래스만.** hex, `rgb()`, `p-[13px]`, `style={{ padding: 12 }}` 금지. Tailwind 기본 색·크기(`bg-gray-100`, `text-sm`, `rounded-xl`)는 지워져 있어서 동작하지 않는다.
2. **없는 토큰 이름을 지어내지 않는다.** 목록은 DESIGN.md 9.1. 필요하면 만들지 말고 묻는다.
3. **컴포넌트를 먼저 찾는다:** `src/components/ui/` (Button, Input, Card, Badge, Dialog). 비슷한 걸 새로 만들지 않는다.
4. **스타일은 `variant`·`tone`·`size`로만.** `className`은 레이아웃(`w-full`, `mt-4`, `grid`)에만.
5. **solid 배경 위 글자는 `text-on-{tone}`.** `text-white` 금지.
6. **글자 크기는 iOS 이름:** `text-body`, `text-headline`, `text-title2` …. 제목 4개는 `font-heading`을 같이.
7. **문구는 해요체, 버튼은 동사로 끝낸다** ("저장하기"). 에러는 원인 + 해결. → DESIGN.md 7장
8. **포커스 링을 지우지 않는다** (`outline-none` 금지). 아이콘만 있는 버튼엔 `aria-label`.
9. **끝내기 전에 `npm run lint`** — 에러 0이어야 한다.
10. **토큰을 바꾸면** `tokens/`만 고치고 `npm run tokens` (대비 검사 포함), DESIGN.md도 같은 커밋에서.

## 어디를 읽나
| 하려는 것 | 읽을 곳 |
|---|---|
| 아무 화면 | DESIGN.md 9장 (빠른 참조 + 예시) |
| 색 고르기 | 2장 |
| 글자 | 3장 |
| 버튼·인풋·카드·배지·Dialog | 4장 |
| 여백·폭·배경 층 | 5장 |
| 그림자·애니메이션 | 6장 |
| 문구 | 7장 |
