# uc-design-system 인수인계 로그

## 2026-11-15 16:40 — M0~M4 완료·푸시, M5 대상 변경(포트폴리오 아님, 미정)

**지금 상태**: 토큰 파이프라인(DTCG → CSS·Tailwind·JSON·Swift, 8조합 대비 검사), 컴포넌트 7개(Button·Badge·Input·Textarea·Card·Alert·Dialog)와 MDX 문서, AI 레이어(DESIGN.md·AGENTS.md·`uc-ui` 스킬·lint), `copy-to` 스크립트, Pages 배포 워크플로까지 끝났고 origin/main에 푸시됨.
**남은 일**: 1) 사용자가 GitHub Settings → Pages → Source를 "GitHub Actions"로 바꾸고 워크플로 Re-run (gh CLI 미인증이라 결과 미확인) 2) M5 대상 프로젝트가 정해지면 `npm run copy-to -- <경로>` → README "다른 프로젝트에 붙이기" 순서로 연결 3) 그 프로젝트에 필요한 2차(Separator·Select·Sheet·Tooltip)·3차 컴포넌트만 추가.
**하면 안 되는 일**: M5를 사진 포트폴리오로 진행하지 말 것(사용자가 바꿈). 받는 프로젝트에 TypeScript 7 쓰지 말 것(typescript-eslint 미지원 → 5.9). 생성 파일(tokens.css 등)을 손으로 고치지 말고 `tokens/` JSON을 고친 뒤 `npm run tokens`. 단계 값을 바꾸면 대비 검사가 깨지기 쉬움 — 반드시 다시 돌려 볼 것.
**검증 방법**: `npm run tokens && npm run lint && npm run typecheck` 모두 통과, `npm run storybook`(6006)에서 테마·모드·대비 툴바로 확인, 접근성 패널 위반 0(기초/색은 의도적 예외).
**참고**: docs/roadmap.md(M5), docs/decisions.md(마지막 줄), README.md "다른 프로젝트에 붙이기", scripts/copy-to.ts, 커밋 48f233c(M4).
