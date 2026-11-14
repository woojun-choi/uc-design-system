# 업계 흐름 · 도구 · 유명 DS 지도

> 2026-11 조사 (idea_bank 05 PRD 3장에서 옮김). 가격·수치 일부는 2차 출처라 실제 진행 전 원출처 확인 필요.

## 업계 흐름
| 항목 | 내용 |
|---|---|
| 토큰 표준 | W3C Design Tokens Community Group이 **2025-10-28 첫 안정판(2025.10)** 공개. 단, W3C 정식 표준 트랙은 아님. 토큰을 JSON 하나로 정의 → Figma·CSS·iOS로 변환하는 구조가 사실상 표준이 됨 |
| 도입률 | zeroheight Design Systems Report 2025 기준(2차 요약) 토큰 도입 56%(2024) → 84%(2025), 전담 DS 팀 72~79%. UI 패턴까지 문서화한 팀은 64% |
| AI용 DS | Google Labs가 **DESIGN.md** 포맷(Apache-2.0) 공개 — 에이전트가 읽는 마크다운 디자인 명세. Atlassian은 DESIGN.md / MCP / 스킬 방식을 비교 실험했는데 같은 작업에서 **DESIGN.md가 토큰 효율 최하**, MCP·스킬이 더 적게 씀. 문서와 실제 DS가 어긋나는 drift 위험도 지적됨 |
| 국내 사례 | **당근 SEED**: 2026-07 리브랜딩, GitHub 공개, Tailwind 플러그인·CLI 제공, 문서를 llms.txt·MCP로도 내보냄. **토스 TDS**: 앱인토스 개발자 문서에 공개되지만 사용 범위가 앱인토스로 제한된 라이선스. 도입 효과로 수천~1만 시간대 절감 발표(2차 요약) |

## 도구 / 경쟁
| 도구 | 성격 | 가격(조사 시점) | 메모 |
|---|---|---|---|
| zeroheight | DS 문서 사이트 빌더 | Free / Starter 약 $59/월 / Enterprise | 디자이너 중심 문서화. 2025년 전 플랜에 토큰 자동화 추가 |
| Supernova | Figma→코드 파이프라인 + 문서 | 약 $25/인/월부터(2차) | 토큰 자동화 강점 |
| Knapsack | 엔터프라이즈 DS 플랫폼 | 견적 | 대기업용 |
| Storybook | 컴포넌트 개발·문서 | 무료 오픈소스 | v9에서 테스트·접근성 애드온 통합 |
| Chromatic | Storybook 호스팅·시각 회귀 테스트 | Free 5,000 스냅샷/월, 유료 $149~399/월 | 개인용은 무료 티어로 충분 |
| Tokens Studio | Figma 토큰 플러그인 | 무료 + 유료 | 토큰 JSON ↔ Figma 동기화 |
| component.gallery | DS 컴포넌트 비교 갤러리 | 무료 | 약 60개 컴포넌트 × 95개 DS × 2,600+ 예시. **"DS 읽기"용 최고 출발점** |

## 유명 DS 지도 — 읽기 후보
사용률 참고: wmtips(2026) 웹사이트 감지 기준 Material 약 83%, Ant Design 약 5%. 중국은 Ant Design, 영국은 GOV.UK가 상위. GitHub 스타는 출처마다 달라 생략.

| # | DS | 회사 | 왜 읽나 (배울 점) | 웹/iOS |
|---|---|---|---|---|
| 1 | **Material Design 3** | Google | 사실상 업계 기본값. 동적 색상(Material You)·토큰 3계층의 교과서 | 웹·Android |
| 2 | **Apple HIG** | Apple | iOS 원칙의 원본. 02 앱에 필수. 컴포넌트보다 "원칙"이 강함 | iOS |
| 3 | **IBM Carbon** | IBM | 문서 구성·접근성·데이터 시각화 가이드가 가장 체계적 | 웹 |
| 4 | **Shopify Polaris** | Shopify | 콘텐츠(문구) 가이드·패턴 문서의 모범 | 웹 |
| 5 | **Atlassian DS** | Atlassian | 토큰 마이그레이션·DESIGN.md/MCP 실험까지 공개 → C 방향 참고 1순위 | 웹 |
| 6 | **Microsoft Fluent 2** | Microsoft | 웹·iOS·Android·Windows 멀티플랫폼 토큰 → "웹 + iOS" 구조 참고 | 웹·iOS |
| 7 | **GitHub Primer** | GitHub | 오픈소스로 토큰·컴포넌트·문서가 다 공개, 개발자 친화 | 웹 |
| 8 | **GOV.UK DS** | 영국 정부 | 접근성·쉬운 말·"패턴" 개념의 원조 | 웹 |
| 9 | **Ant Design** | Ant Group | 중국 최대. 데이터 많은 어드민 UI 컴포넌트가 풍부 | 웹 |
| 10 | **shadcn/ui** | 커뮤니티 | "라이브러리 대신 코드 복사" 모델. 개인 DS의 출발 베이스로 가장 현실적 | 웹 |
| 11 | **당근 SEED** | 당근 | 국내 대표 오픈 DS. llms.txt·MCP·CLI까지 → C·D 참고 | 웹·iOS·Android |
| 12 | **토스 TDS** | 토스 | 국내 최고 수준 UX 문구·인터랙션. 단 사용 범위 제한 라이선스 | 웹·앱 |
| 13 | **KRDS** | 행정안전부 | 2025-01 정식 명칭화, 컴포넌트마다 WCAG 2.1 적합성 명시, 2025 ICT 어워드 대상. 한국어 접근성·공공 패턴 | 웹 |

추천 읽기 묶음(예시):
- **웹+iOS 구조**: Material 3 → Apple HIG → Fluent 2
- **AI-ready(C)**: Atlassian → SEED → Primer
- **한국 갤러리(D)**: SEED → TDS → KRDS
- **개인 DS 베이스(B)**: shadcn/ui → Primer → Polaris


## 레퍼런스
- [W3C DTCG — Design Tokens 안정판 발표 (2025-10-28)](https://w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- [designtokens.org FAQ](https://designtokens.org/faq)
- [zeroheight Design System Report 2025 (PDF)](https://othr.zeroheight.com/hubfs/zeroheight%20-%20Design%20System%20Report%202025%20-%20release%20version.pdf)
- [Atlassian — DESIGN.md 실험기](https://www.atlassian.com/blog/how-we-build/atlassians-design-md-is-here-what-we-learned-testing-portable-design-context-in-practice)
- [Google DESIGN.md 소개](https://themenonlab.blog/blog/google-design-md-ai-agents-design-systems)
- [당근 SEED GitHub](https://github.com/daangn/seed-design) · [SEED 리브랜딩 기사](https://designcompass.org/2026/07/27/daangn-seed-design-system-rebranding/) · [SEED llms.txt/MCP 소개](https://discuss.pytorch.kr/t/seed-llms-txt-mcp-ai/11462)
- [토스 TDS (앱인토스 문서)](https://developers-apps-in-toss.toss.im/design/components) · [토스 디자이너 인터뷰](https://toss.im/tossfeed/article/toss-designer-interview)
- [The Component Gallery](https://component.gallery) · [GitHub](https://github.com/inbn/component-gallery)
- [zeroheight 가격 기록](https://pricingsaas.com/companies/zeroheight) · [zeroheight vs Supernova](https://toolradar.com/compare/zeroheight-vs-supernova) · [Knapsack (Capterra)](https://www.capterra.com/p/241708/Knapsack/reviews/6049352/)
- [KRDS 개시 기사](https://designcompass.org/2025/01/22/krds-start/) · [KRDS 프로젝트(ditoday)](https://ditoday.com/project/%eb%94%94%ec%a7%80%ed%84%b8-%ec%a0%95%eb%b6%80-%eb%94%94%ec%9e%90%ec%9d%b8-%ec%8b%9c%ec%8a%a4%ed%85%9c-krds/) · [행정안전부 UI/UX 혁신](https://mois.go.kr/frt/sub/a06/b04/uixInnovation/screen.do)
- [DS 사용률(wmtips 2026)](https://www.wmtips.com/technologies/design-systems/) · [Best DS examples 2026 (UXPin)](https://www.uxpin.com/studio/?p=30873)
- [Chromatic 가격](https://chromatic.com/pricing) · [Storybook 개요](https://pangea.app/glossary/storybook)

### 처음 계획(plan.md)에서 참고한 자료
- [Vercel Geist 소개](https://vercel.com/geist/introduction)
- [Vercel DESIGN.md 실물 예시 (design-bites)](https://github.com/educlopez/design-bites/blob/main/design-mds/vercel.com/DESIGN.md)
- [Geist 디자인 시스템 분석](https://www.designsystems.one/design-systems/vercel-geist)
- [shadcn/ui + Tailwind + Design Tokens로 확장 가능한 시스템 만들기](https://shadisbaih.medium.com/building-a-scalable-design-system-with-shadcn-ui-tailwind-css-and-design-tokens-031474b03690)
- [shadcn/ui 공식](https://ui.shadcn.com/)
- [shadcn/ui 컴포넌트 확장 가이드 (Vercel Academy)](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
- [DESIGN.md for shadcn/ui 가이드](https://designmd.directory/guides/design-md-for-shadcn)
- [Building a Design System in 2026 (Udacity Engineering)](https://engineering.udacity.com/building-a-design-system-in-2026-5cfd8d85043c)

