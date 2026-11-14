import type { Meta, StoryObj } from '@storybook/react-vite'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const TONES = ['neutral', 'brand', 'danger', 'success', 'warning', 'info'] as const
const LABEL: Record<(typeof TONES)[number], string> = {
  neutral: '임시 저장', brand: '새 사진', danger: '실패', success: '공개됨', warning: '검토 중', info: '안내',
}

const meta = {
  title: '컴포넌트/Badge',
  component: Badge,
  args: { children: '공개됨', variant: 'weak', tone: 'success' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'weak'] },
    tone: { control: 'inline-radio', options: TONES },
  },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {}

export const 조합: Story = {
  render: () => (
    <div className="space-y-3">
      {(['weak', 'solid'] as const).map((v) => (
        <div key={v} className="flex flex-wrap items-center gap-2">
          <code className="w-12 text-caption1 text-muted">{v}</code>
          {TONES.map((t) => <Badge key={t} variant={v} tone={t}>{LABEL[t]}</Badge>)}
        </div>
      ))}
    </div>
  ),
}

export const 아이콘: Story = {
  render: () => <Badge tone="success"><Check />공개됨</Badge>,
}
