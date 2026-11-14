import { cva, type VariantProps } from 'class-variance-authority'
import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Alert — 화면 안에 머무는 알림 (저장했어요, 실패했어요, 안내).
 * danger는 role="alert"(바로 읽힘), 나머지는 role="status"(차례 되면 읽힘).
 * 문서: stories/components/Alert.mdx · DESIGN.md 4.7
 */
const alertVariants = cva('flex gap-3 rounded-md p-4 text-callout [&>svg]:mt-0.5 [&>svg]:size-5 [&>svg]:shrink-0', {
  variants: {
    tone: {
      neutral: 'bg-neutral-weak text-default [&>svg]:text-muted',
      info: 'bg-info-weak text-default [&>svg]:text-info',
      success: 'bg-success-weak text-default [&>svg]:text-success',
      warning: 'bg-warning-weak text-default [&>svg]:text-warning',
      danger: 'bg-danger-weak text-default [&>svg]:text-danger',
    },
  },
  defaultVariants: { tone: 'info' },
})

const ICON = { neutral: Info, info: Info, success: CircleCheck, warning: TriangleAlert, danger: CircleAlert }

export interface AlertProps extends Omit<ComponentProps<'div'>, 'title'>, VariantProps<typeof alertVariants> {
  /** 굵은 첫 줄. 없으면 본문만 */
  title?: ReactNode
  /** 오른쪽 동작 — Button size="sm" variant="ghost" 등 */
  action?: ReactNode
}

function Alert({ className, tone = 'info', title, action, children, ...props }: AlertProps) {
  const Icon = ICON[tone ?? 'info']
  return (
    <div
      data-slot="alert"
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn(alertVariants({ tone }), className)}
      {...props}
    >
      <Icon aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {title && <p className="font-semibold text-default">{title}</p>}
        {children && <div className="text-muted">{children}</div>}
      </div>
      {action && <div className="-my-1 shrink-0 self-center">{action}</div>}
    </div>
  )
}

export { Alert, alertVariants }
