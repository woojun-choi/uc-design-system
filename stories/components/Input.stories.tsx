import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const meta = {
  title: '컴포넌트/Input',
  component: Input,
  args: { label: '앨범 이름', placeholder: '예: 여름의 끝', hint: '20자까지 쓸 수 있어요' },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>

export const 기본: Story = {}

export const 상태: Story = {
  render: () => (
    <div className="grid max-w-sm gap-6">
      <Input label="앨범 이름" placeholder="예: 여름의 끝" />
      <Input label="앨범 이름" defaultValue="여름의 끝" hint="20자까지 쓸 수 있어요" />
      <Input label="이메일" type="email" defaultValue="photo@" required error="이메일 형식이 아니에요. @ 뒤에 주소까지 입력해 주세요." />
      <Input label="앨범 주소" defaultValue="summer-2026" disabled hint="공개한 뒤에는 바꿀 수 없어요" />
      <Input aria-label="사진 검색" placeholder="사진 검색" />
    </div>
  ),
}

/** 제출할 때 검사하고, 고치면 바로 에러를 지운다 */
export const 검사_예시: Story = {
  name: '검사 예시',
  render: () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string>()
    return (
      <form
        className="grid max-w-sm gap-4"
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          setError(value.trim() ? undefined : '앨범 이름을 입력해 주세요.')
        }}
      >
        <Input
          label="앨범 이름"
          required
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (error) setError(undefined)
          }}
          error={error}
          hint="20자까지 쓸 수 있어요"
          maxLength={20}
        />
        <Button type="submit" className="w-fit">만들기</Button>
      </form>
    )
  },
}
