# 05. 컴포넌트

shadcn/ui 컴포넌트를 가져와 uc 토큰으로 바꿔 끼운다. Radix 기반 접근성은 그대로 쓴다.

## 공통 API (원칙 8)
- `variant` = 강조 정도 (solid · weak · outline · ghost …)
- `tone` = 의미 (neutral · brand · danger · success · warning)
- `size` = sm · md · lg (필요한 것만)

## 1차 — 핵심 5개 (M2)
| 컴포넌트 | variant | tone | 메모 |
|---|---|---|---|
| Button | solid · weak · outline · ghost | neutral · brand · danger | 로딩 상태, 아이콘 자리 |
| Input | — | neutral · danger | 라벨·도움말·에러 문구 포함 (UX 문구 규칙 예시) |
| Card | elevated · outlined · flat | — | `bg.layer` 단계 사용 |
| Badge | solid · weak | neutral · brand · danger · success · warning | |
| Dialog | — | neutral · danger | 포커스 가두기, Esc 닫기, 삭제 확인 패턴 |

## 2차 — 기본기 채우기
Typography(Heading/Text), Separator, Textarea, Select, Sheet, Tooltip

## 3차 — 포트폴리오에 적용할 때
Image/Figure(캡션), Gallery Grid, Lightbox, 내비게이션

## 컴포넌트마다 갖출 것 (원칙 11)
1. **언제 쓰나 / 언제 안 쓰나**
2. **Do · Don't** 예시
3. **접근성 체크** — 키보드 조작, 포커스 표시, aria, 대비
4. **코드** — 사용 예, props 표
5. **변경 이력**

Storybook 스토리가 이 문서를 겸한다(MDX). 모든 variant × tone × 모드 조합을 스토리로 확인한다.
