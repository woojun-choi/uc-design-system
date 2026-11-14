import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

const TONES = ['neutral', 'info', 'success', 'warning', 'danger'] as const

const meta = {
  title: '컴포넌트/Alert',
  component: Alert,
  args: { tone: 'success', title: '저장했어요', children: '바뀐 프로필이 바로 보여요.' },
  argTypes: {
    tone: { control: 'inline-radio', options: TONES },
    title: { control: 'text' },
    children: { control: 'text' },
    action: { control: false },
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {}

export const tone: Story = {
  render: () => (
    <div className="grid max-w-sm gap-3">
      <Alert tone="neutral" title="임시 저장돼 있어요">마지막 저장: 오후 3시 12분</Alert>
      <Alert tone="info" title="새 기능">앨범을 폴더로 묶을 수 있어요.</Alert>
      <Alert tone="success" title="저장했어요">바뀐 프로필이 바로 보여요.</Alert>
      <Alert tone="warning" title="저장 공간이 거의 찼어요">남은 공간 200MB. 안 쓰는 사진을 정리해 주세요.</Alert>
      <Alert tone="danger" title="올리지 못했어요">파일이 50MB를 넘어요. 더 작은 파일로 다시 올려 주세요.</Alert>
    </div>
  ),
}

export const 한_줄_동작: Story = {
  name: '한 줄 · 동작',
  render: () => (
    <div className="grid max-w-sm gap-3">
      <Alert tone="success">저장했어요.</Alert>
      <Alert tone="danger" title="연결이 끊겼어요" action={<Button size="sm" variant="ghost" tone="neutral">다시 시도하기</Button>}>
        인터넷 연결을 확인해 주세요.
      </Alert>
    </div>
  ),
}
