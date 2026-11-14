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

> M3 구현 (2026-11-15): `AGENTS.md`, `.claude/skills/uc-ui/SKILL.md`, `llms.txt`, `eslint.config.js` (`npm run lint`).

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

## lint 규칙 (`eslint.config.js`)
| 규칙 | 잡는 것 |
|---|---|
| `better-tailwindcss/no-unknown-classes` | 토큰에 없는 클래스 — Tailwind 기본 색·크기(`bg-blue-500`, `text-sm`, `rounded-xl`)는 지워져 있어서 여기 걸림 |
| `better-tailwindcss/no-restricted-classes` | 색·간격·크기 유틸리티의 임의 값(`p-[13px]`, `text-[#333]`). `var(--uc-*)`만 허용 |
| `better-tailwindcss/no-conflicting-classes` | `text-default text-muted`처럼 겹치는 클래스 |
| `no-restricted-syntax` | 코드 안 hex·`rgb()`·`oklch()` 문자열, `style`의 px·숫자 |

다른 프로젝트에 붙일 때는 `eslint.config.js`를 복사하고 `entryPoint`만 그 프로젝트의 globals.css로 바꾼다.

## AGENTS.md 핵심 규칙 (초안 → AGENTS.md로 옮김)
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

## 검증 결과 (M3, 2026-11-15)
규칙을 모르는 별도 에이전트(Claude Sonnet) 2개에게 이 저장소에서 화면을 시켰다. 문서는 스스로 찾아 읽게 했다.

| 요청 | 읽은 순서 | 첫 초안 lint 에러 | 결과 |
|---|---|---|---|
| "사진 앨범 카드 목록 (삭제 확인, 빈 화면)" | CLAUDE.md → AGENTS.md → 스킬 → DESIGN.md 4·5·7·9장 → 컴포넌트 소스 | **0** | 9.3 예시 구조 그대로, 삭제 확인 Dialog·빈 화면까지 규칙대로 |
| "프로필 설정 (이메일 에러, 저장 알림, 계정 삭제)" | CLAUDE.md → AGENTS.md → llms.txt → 스킬 → DESIGN.md 4·7·9장 | **0** | Input 에러 문구 해요체·원인+해결, 위험 구역 분리 |

- 두 화면 모두 neutral·paper, 라이트·다크에서 토큰대로 바뀌는 것을 Storybook에서 확인.
- **에이전트가 짐작해야 했던 것** → DESIGN.md 9.4 "자주 쓰는 패턴"에 추가: 빈 화면, 저장 알림, 위험 구역, 여러 줄 입력. 4.5에 첫 포커스 방법(`autoFocus`).
- **빠진 컴포넌트:** Textarea, 알림(Alert/Toast) — M4 2차 컴포넌트에서 우선.
- 테스트 파일은 지웠다 (같은 요청을 다시 시키면 재현 가능).
