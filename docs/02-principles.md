# 02. 원칙

> 디자인 시스템 11개 읽기 노트에서 뽑은 12개 + 운영 원칙 4개. 2026-11-14 전부 채택.
> 각 원칙이 어디서 왔는지는 [research/README.md](../research/README.md) 마지막 표 참고.

## 토큰 · 색
| # | 원칙 | 출처 |
|---|---|---|
| 1 | **토큰 한 소스** — DTCG JSON 하나에서 CSS 변수 · Tailwind · Swift를 자동 생성한다. 컴포넌트는 토큰만 참조하고 값을 하드코딩하지 않는다 | Fluent, TDS, SEED |
| 2 | **색 이름은 `fg / bg / stroke` × 역할 × `solid / weak`**, 상태는 `-hover` `-pressed` 접미사. 모든 배경에 그 위 글자색 `on-` 짝이 있다 | SEED, M3, Fluent, shadcn |
| 3 | **브랜드 색 1개 → 테마** — seed 색 하나로 팔레트와 라이트·다크를 만든다. 프로젝트마다 테마 교체가 쉽다 | M3, Fluent |
| 4 | **단계 번호 = 대비** — 단계 50 이상은 흰 배경에서 4.5:1 이상 | KRDS |

## 화면 · 모드
| # | 원칙 | 출처 |
|---|---|---|
| 5 | **배경 3단계** — `bg.layer.1/2/3`을 iOS `systemBackground / secondary / tertiary`와 1:1로 | Carbon, HIG |
| 6 | **글자 크기는 iOS Dynamic Type 이름** 그대로, 큰 글씨 배율표 포함 | HIG, TDS |
| 7 | **라이트 / 다크 / 고대비** 세 모드. 고대비에선 테두리도 굵게 | KRDS, HIG |
| 8 | **variant(강조)와 tone(의미)를 분리** — `<Button variant="weak" tone="danger">` | Polaris, TDS |

## 운영 · 문서
| # | 원칙 | 출처 |
|---|---|---|
| 9 | **코드 복사형 배포** — shadcn처럼 코드를 프로젝트에 복사해 소유. 안정되면 내 레지스트리로 | shadcn |
| 10 | **AI 레이어** — DESIGN.md(규칙 원본) + AGENTS.md·스킬(짧은 안내) + llms.txt. 하드코딩은 lint로 막는다 | Primer, SEED, Atlassian, Vercel |
| 11 | **컴포넌트 문서 1장** = 언제 쓰나 / Do·Don't / 접근성 체크 / 코드 / 변경 이력 | Carbon, KRDS |
| 12 | **UX 문구 규칙** — 해요체, 버튼은 동사로 시작, 같은 동작엔 같은 단어, 에러는 원인 + 해결 | Polaris, TDS |

## 운영 원칙
- **문서는 코드와 함께 산다** — 토큰이 바뀌면 DESIGN.md도 같은 커밋에서 바뀐다.
- **작게 시작한다** — 단일 패키지로 시작하고, 모노레포·버전 관리·자동화는 필요해질 때 들인다.
- **AI가 오해 없이 따라 하는 문서** — 예쁜 문서보다 규칙이 분명한 문서가 우선이다.
- **사진이 주인공일 땐 UI가 물러난다** — 포트폴리오처럼 콘텐츠가 색을 담당하는 곳은 무채색 테마(neutral)를 쓴다.
