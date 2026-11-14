# 06. AI 레이어

> 목표: AI(Claude Code, Cursor)가 이 디자인 시스템으로 화면을 만들 때 토큰을 지키고, 하드코딩 색·간격이 0개.

## 구성 — 원본 하나, 안내는 짧게, 마지막은 lint
| 파일 | 역할 | 길이 |
|---|---|---|
| `DESIGN.md` | **규칙 원본.** Vercel Geist 방식. 사람과 AI가 모두 읽음 | 길어도 됨 |
| `AGENTS.md` | AI에게 주는 핵심 규칙 10줄 + "자세한 건 DESIGN.md의 ○장" | 짧게 |
| Claude Code 스킬 | "UI 만들 때" 자동으로 불려서 필요한 장만 읽게 함 | 짧게 |
| `llms.txt` | 문서 목차 (AI가 필요한 파일만 찾아 읽게) | 목차만 |
| lint | 색 hex·임의 px 값을 쓰면 에러 → 토큰 사용 강제 | — |

**왜 둘 다:** Atlassian 실험에서 DESIGN.md만 통째로 넣는 방식은 MCP·스킬보다 토큰을 약 92% 더 썼다. 그래서 DESIGN.md는 원본으로 두고, AI는 AGENTS.md·스킬로 필요한 부분만 찾아 읽게 한다. MCP는 필요해지면 나중에.

## DESIGN.md 목차 (Vercel 구조 기준)
1. Visual Theme & Atmosphere — 철학과 무드 (한 문단, 테마별)
2. Color Palette & Roles — 토큰 표 + 역할
3. Typography Rules — 글꼴, 크기 표, 굵기 규칙
4. Component Stylings — 버튼·인풋·카드 규격, 포커스 스타일
5. Layout & Spacing — 간격, 컨테이너 폭
6. Depth & Motion — 그림자 단계, 전환 규칙
7. Writing — UX 문구 규칙 (원칙 12)
8. Do's and Don'ts
9. Agent Prompt Guide — AI용 빠른 참조 + 예시 요청

## AGENTS.md 핵심 규칙 (초안)
- 색·간격·모서리는 토큰만. hex·임의 px 금지
- 토큰 목록에 없는 이름을 만들지 않는다
- 새 컴포넌트를 만들기 전에 `src/components/ui/`에 있는지 먼저 확인
- 버튼은 `variant`와 `tone`으로만 스타일 조절
- 문구는 해요체, 버튼은 동사로 시작
- 토큰을 바꾸면 DESIGN.md도 같이 고친다

## 검증 방법
1. 빈 프로젝트에 DESIGN.md·AGENTS.md만 두고 "설정 화면 만들어줘", "카드 목록 만들어줘" 요청
2. 결과에서 하드코딩 값 개수 세기 (lint 결과)
3. 기존 Storybook 화면과 스타일이 맞는지 나란히 비교
4. 틀린 부분 → 규칙 문구 고치고 다시
