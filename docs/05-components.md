# 05. 컴포넌트

shadcn/ui 컴포넌트를 가져와 uc 토큰으로 바꿔 끼운다. Radix 기반 접근성은 그대로 쓴다.

## 공통 API (원칙 8)
- `variant` = 강조 정도 (solid · weak · outline · ghost …)
- `tone` = 의미 (neutral · brand · danger · success · warning)
- `size` = sm · md · lg (필요한 것만)

## 1차 — 핵심 5개 (M2)
| 컴포넌트 | variant | tone | 메모 |
|---|---|---|---|
| Button | solid · weak · outline · ghost | neutral · brand · danger | 로딩 상태, 아이콘 자리, asChild(링크) |
| Input | — | (error가 있으면 danger) | 라벨·도움말·에러 문구 포함 (UX 문구 규칙 예시) |
| Card | elevated · outlined · flat | — | `bg.layer` 단계 사용 |
| Badge | solid · weak | neutral · brand · danger · success · warning · info | |
| Dialog | — | neutral · danger | 포커스 가두기, Esc 닫기, 삭제 확인 패턴 |

> M2 완료 (2026-11-14): `src/components/ui/`, 문서는 Storybook `컴포넌트/*` (MDX 1장씩).

## 2차 — 기본기 채우기
- [x] **Textarea** · **Alert** (M4, AI 테스트에서 빠져서 먼저). Input과 Textarea는 `field.tsx`(라벨·도움말·에러 틀)를 같이 씀
- [ ] Typography(Heading/Text), Separator, Select, Sheet, Tooltip — M5 대상 프로젝트에서 필요해질 때

## 3차 — 적용하는 프로젝트에 맞춰
그 프로젝트에서 필요해질 때 만든다. 사진 포트폴리오에 붙인다면: Image/Figure(캡션), Gallery Grid, Lightbox, 내비게이션

## 컴포넌트마다 갖출 것 (원칙 11)
1. **언제 쓰나 / 언제 안 쓰나**
2. **Do · Don't** 예시
3. **접근성 체크** — 키보드 조작, 포커스 표시, aria, 대비
4. **코드** — 사용 예, props 표
5. **변경 이력**

Storybook 스토리가 이 문서를 겸한다(MDX). 모든 variant × tone × 모드 조합을 스토리로 확인한다.
