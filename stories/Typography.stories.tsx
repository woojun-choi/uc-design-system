import type { Meta, StoryObj } from '@storybook/react-vite'
import { Section, useCssVars } from './_shared'

const STYLES = ['large-title', 'title1', 'title2', 'title3', 'headline', 'body', 'callout', 'subheadline', 'footnote', 'caption1', 'caption2']
const IOS: Record<string, string> = { 'large-title': 'largeTitle' }

function TypePage({ globals }: { globals: Record<string, unknown> }) {
  const v = useCssVars(STYLES.flatMap((s) => [`--uc-text-${s}-size`, `--uc-text-${s}-line-height`, `--uc-text-${s}-weight`]), globals)
  return (
    <div>
      <Section title="글자 크기" desc="iOS Dynamic Type 이름·기본값 그대로. 클래스는 text-{이름}, 제목 4개는 font-heading을 같이 쓴다 (paper = 마루 부리)">
        <div className="divide-y">
          {STYLES.map((s) => (
            <div key={s} className="grid grid-cols-[10rem_1fr] items-baseline gap-4 py-3">
              <div>
                <code className="text-footnote text-default">text-{s}</code>
                <div className="text-caption1 text-subtle">
                  {IOS[s] ?? s} · {v[`--uc-text-${s}-size`]}/{v[`--uc-text-${s}-line-height`]} · {v[`--uc-text-${s}-weight`]}
                </div>
              </div>
              <p className={`text-${s} text-default ${s.startsWith('title') || s === 'large-title' ? 'font-heading' : ''}`}>
                사진은 빛을 기록한다 Photographs 0123
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="굵기" desc="3개만: regular 400 · semibold 600 · bold 700">
        <div className="flex gap-8 text-title3 text-default">
          <span className="font-regular">보통 regular</span>
          <span className="font-semibold">중간 semibold</span>
          <span className="font-bold">굵게 bold</span>
        </div>
      </Section>
      <Section title="본문 예시">
        <article className="max-w-sm">
          <h1 className="font-heading text-large-title text-default">여름의 끝</h1>
          <p className="mt-1 text-subheadline text-muted">2026년 8월 · 필름 사진 12장</p>
          <p className="mt-4 text-body text-default">
            해가 기울 무렵의 골목은 색이 바랜 종이처럼 보였다. 오래된 카메라에 남은 마지막 필름으로 그 빛을 담았다.
          </p>
          <p className="mt-2 text-footnote text-subtle">Contax T2 · Portra 400</p>
        </article>
      </Section>
    </div>
  )
}

const meta: Meta = { title: '기초/글자' }
export default meta
export const 글자: StoryObj = { render: (_, { globals }) => <TypePage globals={globals} /> }
