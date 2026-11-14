import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

const meta = {
  title: '컴포넌트/Dialog',
  component: DialogContent,
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'danger'] }, showClose: { control: 'boolean' } },
  args: { tone: 'neutral', showClose: true },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DialogContent>
export default meta
type Story = StoryObj<typeof meta>

/** 입력을 받는 Dialog. 열리면 첫 입력에 포커스, Esc·바깥 클릭·X로 닫힘 */
export const 기본: Story = {
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" tone="neutral">이름 바꾸기</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>앨범 이름 바꾸기</DialogTitle>
          <DialogDescription>공개된 앨범이면 바뀐 이름이 바로 보여요.</DialogDescription>
        </DialogHeader>
        <Input label="앨범 이름" defaultValue="여름의 끝" hint="20자까지 쓸 수 있어요" maxLength={20} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="weak" tone="neutral">취소하기</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>바꾸기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/**
 * 삭제 확인 패턴: tone="danger", 무엇이 사라지는지 구체적으로, 되돌릴 수 없음을 알리고,
 * 버튼은 "취소하기"(왼쪽) + "삭제하기"(danger). 기본 포커스는 취소 쪽.
 */
export const 삭제_확인: Story = {
  name: '삭제 확인',
  args: { tone: 'danger', showClose: false },
  render: (args) => {
    const [open, setOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)
    return (
      <Dialog open={open} onOpenChange={(o) => !deleting && setOpen(o)}>
        <DialogTrigger asChild>
          <Button variant="ghost" tone="danger">앨범 삭제하기</Button>
        </DialogTrigger>
        <DialogContent {...args} onOpenAutoFocus={(e) => {
          e.preventDefault()
          ;(e.currentTarget as HTMLElement).querySelector<HTMLElement>('[data-cancel]')?.focus()
        }}>
          <DialogHeader>
            <DialogTitle>'여름의 끝' 앨범을 삭제할까요?</DialogTitle>
            <DialogDescription>사진 12장이 함께 삭제되고, 되돌릴 수 없어요.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="weak" tone="neutral" data-cancel disabled={deleting}>취소하기</Button>
            </DialogClose>
            <Button
              tone="danger"
              loading={deleting}
              onClick={() => {
                setDeleting(true)
                setTimeout(() => {
                  setDeleting(false)
                  setOpen(false)
                }, 1200)
              }}
            >
              {deleting ? '삭제하는 중' : '삭제하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}
