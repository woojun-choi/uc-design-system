import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@/components/ui/textarea'

const meta = {
  title: '컴포넌트/Textarea',
  component: Textarea,
  args: { label: '소개', placeholder: '예: 필름 카메라로 골목을 찍어요', hint: '200자까지 쓸 수 있어요', maxLength: 200 },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Textarea>
export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {}

export const 상태: Story = {
  render: () => (
    <div className="grid max-w-sm gap-6">
      <Textarea label="소개" placeholder="예: 필름 카메라로 골목을 찍어요" />
      <Textarea label="소개" required error="소개를 10자 이상 써 주세요. 지금은 4자예요." defaultValue="사진 좋아" />
      <Textarea label="메모" disabled defaultValue="공개한 뒤에는 바꿀 수 없어요" />
    </div>
  ),
}
