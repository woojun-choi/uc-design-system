# 열린 질문

## 정해야 할 것
- [x] 두 테마의 seed 색 실제 값 — neutral `#3e63dd`, paper `#9c4a2f`로 확정 (2026-11-14)
- [x] 다크 모드 `fg.on-brand` → 흰 글자 고정, 다크 solid 배경은 새 단계 45 (2026-11-14, [04-tokens §9](04-tokens.md#9-m1-기본값))
- [x] 상태 색 seed · 고대비 방식 · 시스템 다크 따르기 · 그림자 · 모션 → [04-tokens §9](04-tokens.md#9-m1-기본값)
- [x] paper 테마 제목 글꼴 → 마루 부리 (M1에서 실제로 보고 어색하면 본명조)
- [x] Storybook 배포 위치 → GitHub Pages
- [x] 레지스트리 이름 → `@uc`

## 만들어 보고 확인할 것
- [x] Leonardo 대비 단계 수치가 눈으로 봐도 자연스러운지 — 목표 ±5% 안. 95가 미색·다크 배경에서 검정/흰색으로 붙는 건 그대로 둠 (95는 거의 안 씀)
- [x] 다크 모드 brand.5~10이 채도가 높아(남색) `bg.brand.weak`로 쓰기에 진한지 → M4에서 Alert에 써 보니 무거워서, 다크의 5~30단계 채도를 0.045로 제한 + 다크 tone 글자 60 → 70
- [x] Style Dictionary에서 OKLCH 출력이 깔끔하게 되는지 — culori로 변환하는 transform 하나로 됨 (M0)
- [ ] Swift 출력이 Dynamic Type·다크 모드와 자연스럽게 연결되는지
- [ ] shadcn 변수 ↔ uc 토큰 연결이 shadcn 업데이트에도 버티는지
- [ ] 무드가 다른 프로젝트(빈티지 카메라 ↔ 금융)를 테마만으로 감당할 수 있는지
- [ ] DESIGN.md + AGENTS.md 조합으로 AI 하드코딩이 실제로 0에 가까워지는지

## 나중에
- [ ] URL → 테마 초안 추출기 (시작 도구)
- [ ] MCP 서버
- [ ] Figma 변수 동기화 (Tokens Studio)
- [ ] 시각 회귀 테스트 (Chromatic 무료 티어)
