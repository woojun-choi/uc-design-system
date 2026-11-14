import { TriangleAlert, X } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/**
 * Dialog — 흐름을 멈추고 확인·입력을 받는 창. Radix가 포커스 가두기, Esc 닫기, 바깥 스크롤 막기를 맡는다.
 * tone="danger"는 되돌릴 수 없는 동작(삭제 등) 확인용: 경고 아이콘이 붙는다. 버튼 색은 Button tone으로.
 * 문서: stories/Dialog.mdx · DESIGN.md 4.5
 */
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close
const DialogPortal = DialogPrimitive.Portal

function DialogOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn('fixed inset-0 z-50 bg-overlay data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out', className)}
      {...props}
    />
  )
}

export interface DialogContentProps extends ComponentProps<typeof DialogPrimitive.Content> {
  tone?: 'neutral' | 'danger'
  /** 오른쪽 위 닫기(X) 버튼. 기본 true */
  showClose?: boolean
}

function DialogContent({ className, children, tone = 'neutral', showClose = true, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        data-tone={tone}
        className={cn(
          'fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-var(--uc-space-8))] max-w-xs -translate-1/2 gap-4',
          'rounded-lg border bg-layer-1 p-6 text-default shadow-3',
          'data-[state=open]:animate-pop-in data-[state=closed]:animate-pop-out',
          className,
        )}
        {...props}
      >
        {tone === 'danger' && (
          <div className="flex size-10 items-center justify-center rounded-full bg-danger-weak text-danger" aria-hidden>
            <TriangleAlert className="size-5" />
          </div>
        )}
        {children}
        {showClose && (
          <DialogPrimitive.Close
            className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-sm text-muted transition-colors hover:bg-neutral-weak hover:text-default"
            aria-label="닫기"
          >
            <X className="size-4" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={cn('flex flex-col gap-1.5 pr-8', className)} {...props} />
}

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="dialog-footer" className={cn('mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />
  )
}

function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn('text-title3 font-semibold text-default', className)} {...props} />
}

function DialogDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn('text-callout text-muted', className)} {...props} />
}

export {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger,
}
