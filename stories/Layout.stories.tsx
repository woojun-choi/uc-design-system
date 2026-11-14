import type { Meta, StoryObj } from '@storybook/react-vite'
import { Section } from './_shared'

const SPACE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16]

function LayoutPage() {
  return (
    <div>
      <Section title="간격" desc="4px 단위. space.N = p-N, gap-N, m-N … (N × 4px)">
        <div className="space-y-2">
          {SPACE.map((n) => (
            <div key={n} className="flex items-center gap-4">
              <code className="w-24 text-footnote text-muted">space.{n}</code>
              <div className="h-4 bg-brand-solid" style={{ width: `var(--uc-space-${n})` }} />
              <span className="text-caption1 text-subtle">{n * 4}px</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="모서리" desc="테마마다 다름 — neutral 둥글게, paper 거의 각지게">
        <div className="flex gap-4">
          {['sm', 'md', 'lg', 'full'].map((r) => (
            <div key={r} className={`flex h-20 w-28 items-end border-2 border-strong bg-layer-2 p-2 rounded-${r}`}>
              <code className="text-caption1 text-muted">rounded-{r}</code>
            </div>
          ))}
        </div>
      </Section>
      <Section title="그림자" desc="neutral 흐린 그림자, paper 흐림 없는 종이 겹침">
        <div className="flex gap-8 bg-layer-2 p-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex h-24 w-36 items-end rounded-md bg-layer-1 p-3 shadow-${s}`}>
              <code className="text-caption1 text-muted">shadow-{s}</code>
            </div>
          ))}
        </div>
      </Section>
      <Section title="테두리 · 포커스" desc="고대비에서 테두리 2px, 포커스 3px. Tab 키로 확인">
        <div className="flex gap-4">
          <input className="rounded-md border border-strong bg-layer-1 px-3 py-2 text-body text-default" placeholder="이름을 입력해요" />
          <button className="rounded-md bg-brand-solid px-4 py-2 text-headline text-on-brand transition-colors hover:bg-brand-solid-hover active:bg-brand-solid-pressed">
            저장하기
          </button>
        </div>
      </Section>
      <Section title="모션" desc="fast 120 · normal 200 · slow 320ms, ease-standard. 모션 줄이기 설정이면 0">
        <div className="flex gap-4">
          {['fast', 'normal', 'slow'].map((d) => (
            <div key={d} className="group flex h-16 w-40 items-center rounded-md bg-layer-2 px-2">
              <div className="size-10 rounded-sm bg-brand-solid ease-standard group-hover:translate-x-24" style={{ transitionProperty: 'translate', transitionDuration: `var(--uc-duration-${d})` }} />
            </div>
          ))}
        </div>
        <p className="mt-2 text-caption1 text-subtle">마우스를 올려 보세요</p>
      </Section>
    </div>
  )
}

const meta: Meta = { title: '기초/간격과 모양' }
export default meta
export const 레이아웃: StoryObj = { render: () => <LayoutPage /> }
