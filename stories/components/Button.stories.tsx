import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Plus, Trash2 } from 'lucide-react'
import { Fragment } from 'react'
import { Button } from '@/components/ui/button'

const VARIANTS = ['solid', 'weak', 'outline', 'ghost'] as const
const TONES = ['neutral', 'brand', 'danger'] as const

const meta = {
  title: '컴포넌트/Button',
  component: Button,
  args: { children: '저장하기', variant: 'solid', tone: 'brand', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS, description: '강조 정도' },
    tone: { control: 'inline-radio', options: TONES, description: '의미' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'icon'] },
    loading: { control: 'boolean', description: '진행 중 — 누를 수 없고 스피너' },
    disabled: { control: 'boolean' },
    asChild: { control: false },
  },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {}

/** variant × tone 전체. 툴바에서 테마·모드·대비를 바꿔 가며 본다 */
export const 조합: Story = {
  render: () => (
    <div className="grid w-fit grid-cols-[auto_repeat(3,auto)] items-center gap-3">
      <span />
      {TONES.map((t) => <code key={t} className="text-caption1 text-muted">{t}</code>)}
      {VARIANTS.map((v) => (
        <Fragment key={v}>
          <code className="text-caption1 text-muted">{v}</code>
          {TONES.map((t) => (
            <Button key={v + t} variant={v} tone={t}>
              {t === 'danger' ? '삭제하기' : '저장하기'}
            </Button>
          ))}
        </Fragment>
      ))}
    </div>
  ),
}

export const 크기: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">작게</Button>
      <Button {...args} size="md">보통</Button>
      <Button {...args} size="lg">크게</Button>
      <Button {...args} size="icon" aria-label="추가하기"><Plus /></Button>
    </div>
  ),
}

export const 아이콘_로딩_비활성: Story = {
  name: '아이콘 · 로딩 · 비활성',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button><Plus />사진 추가하기</Button>
      <Button variant="weak">다음으로<ArrowRight /></Button>
      <Button loading>저장하는 중</Button>
      <Button disabled>저장하기</Button>
      <Button variant="ghost" tone="danger"><Trash2 />삭제하기</Button>
    </div>
  ),
}

/** asChild로 링크에 버튼 모양을 입힌다. 이동은 <a>, 동작은 <button> */
export const 링크: Story = {
  render: () => (
    <Button asChild variant="outline" tone="neutral">
      <a href="#portfolio">포트폴리오 보기</a>
    </Button>
  ),
}
