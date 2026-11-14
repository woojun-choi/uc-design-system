import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/**
 * Badge — 상태·분류를 짧게 표시. 누르는 요소가 아니다.
 * 문서: stories/Badge.mdx · DESIGN.md 4.4
 */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-caption1 font-semibold [&_svg]:size-3",
  {
    variants: {
      variant: { solid: '', weak: '' },
      tone: { neutral: '', brand: '', danger: '', success: '', warning: '', info: '' },
    },
    compoundVariants: [
      { variant: 'solid', tone: 'neutral', class: 'bg-neutral-solid text-on-neutral' },
      { variant: 'solid', tone: 'brand', class: 'bg-brand-solid text-on-brand' },
      { variant: 'solid', tone: 'danger', class: 'bg-danger-solid text-on-danger' },
      { variant: 'solid', tone: 'success', class: 'bg-success-solid text-on-success' },
      { variant: 'solid', tone: 'warning', class: 'bg-warning-solid text-on-warning' },
      { variant: 'solid', tone: 'info', class: 'bg-info-solid text-on-info' },
      { variant: 'weak', tone: 'neutral', class: 'bg-neutral-weak text-neutral' },
      { variant: 'weak', tone: 'brand', class: 'bg-brand-weak text-brand' },
      { variant: 'weak', tone: 'danger', class: 'bg-danger-weak text-danger' },
      { variant: 'weak', tone: 'success', class: 'bg-success-weak text-success' },
      { variant: 'weak', tone: 'warning', class: 'bg-warning-weak text-warning' },
      { variant: 'weak', tone: 'info', class: 'bg-info-weak text-info' },
    ],
    defaultVariants: { variant: 'weak', tone: 'neutral' },
  },
)

export interface BadgeProps extends ComponentProps<'span'>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, tone, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant, tone }), className)} {...props} />
}

export { Badge, badgeVariants }
