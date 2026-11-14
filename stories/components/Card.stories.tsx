import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const meta = {
  title: '컴포넌트/Card',
  component: Card,
  args: { variant: 'outlined' },
  argTypes: { variant: { control: 'inline-radio', options: ['elevated', 'outlined', 'flat'] } },
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

function Album(props: { variant?: 'elevated' | 'outlined' | 'flat' }) {
  return (
    <Card className="w-72" {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>여름의 끝</CardTitle>
          <Badge tone="success">공개됨</Badge>
        </div>
        <CardDescription>2026년 8월 · 사진 12장</CardDescription>
      </CardHeader>
      <CardContent className="text-muted">해가 기울 무렵의 골목을 필름으로 담았어요.</CardContent>
      <CardFooter>
        <Button size="sm">열기</Button>
        <Button size="sm" variant="ghost" tone="neutral">공유하기</Button>
      </CardFooter>
    </Card>
  )
}

export const 기본: Story = { render: (args) => <Album variant={args.variant ?? undefined} /> }

export const 종류: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 bg-layer-1 p-2">
      {(['elevated', 'outlined', 'flat'] as const).map((v) => (
        <div key={v} className="space-y-2">
          <code className="text-caption1 text-muted">{v}</code>
          <Album variant={v} />
        </div>
      ))}
    </div>
  ),
}

/** 사진이 주인공일 때 — 여백 없이 사진을 꽉 채우고 글자는 아래로 */
export const 사진_카드: Story = {
  name: '사진 카드',
  render: () => (
    <Card variant="flat" className="w-72 gap-0 overflow-hidden p-0">
      <div className="aspect-4/3 bg-neutral-weak-pressed" role="img" aria-label="골목 사진 자리" />
      <div className="flex flex-col gap-1 p-4">
        <CardTitle>골목, 오후 6시</CardTitle>
        <CardDescription>Contax T2 · Portra 400</CardDescription>
      </div>
    </Card>
  ),
}
