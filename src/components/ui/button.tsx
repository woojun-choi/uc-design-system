import { cva, type VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import { Slot } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/**
 * Button — variant(강조) × tone(의미) (원칙 8)
 * 문서: stories/Button.mdx · DESIGN.md 4.1
 */
const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold',
    'transition-colors select-none',
    'disabled:pointer-events-none disabled:opacity-40 aria-busy:pointer-events-none',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: { solid: '', weak: '', outline: 'border bg-transparent', ghost: 'bg-transparent' },
      tone: { neutral: '', brand: '', danger: '' },
      size: {
        sm: "h-8 px-3 text-footnote [&_svg:not([class*='size-'])]:size-4",
        md: "h-10 px-4 text-callout [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 px-5 text-headline [&_svg:not([class*='size-'])]:size-5",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    // Tailwind가 찾을 수 있게 클래스 이름을 조립하지 않고 다 적는다
    compoundVariants: [
      { variant: 'solid', tone: 'neutral', class: 'bg-neutral-solid text-on-neutral hover:bg-neutral-solid-hover active:bg-neutral-solid-pressed' },
      { variant: 'solid', tone: 'brand', class: 'bg-brand-solid text-on-brand hover:bg-brand-solid-hover active:bg-brand-solid-pressed' },
      { variant: 'solid', tone: 'danger', class: 'bg-danger-solid text-on-danger hover:bg-danger-solid-hover active:bg-danger-solid-pressed' },
      { variant: 'weak', tone: 'neutral', class: 'bg-neutral-weak text-neutral hover:bg-neutral-weak-hover active:bg-neutral-weak-pressed' },
      { variant: 'weak', tone: 'brand', class: 'bg-brand-weak text-brand hover:bg-brand-weak-hover active:bg-brand-weak-pressed' },
      { variant: 'weak', tone: 'danger', class: 'bg-danger-weak text-danger hover:bg-danger-weak-hover active:bg-danger-weak-pressed' },
      { variant: 'outline', tone: 'neutral', class: 'border-strong text-neutral hover:bg-neutral-weak active:bg-neutral-weak-hover' },
      { variant: 'outline', tone: 'brand', class: 'border-focus text-brand hover:bg-brand-weak active:bg-brand-weak-hover' },
      { variant: 'outline', tone: 'danger', class: 'border-danger text-danger hover:bg-danger-weak active:bg-danger-weak-hover' },
      { variant: 'ghost', tone: 'neutral', class: 'text-neutral hover:bg-neutral-weak active:bg-neutral-weak-hover' },
      { variant: 'ghost', tone: 'brand', class: 'text-brand hover:bg-brand-weak active:bg-brand-weak-hover' },
      { variant: 'ghost', tone: 'danger', class: 'text-danger hover:bg-danger-weak active:bg-danger-weak-hover' },
    ],
    defaultVariants: { variant: 'solid', tone: 'brand', size: 'md' },
  },
)

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /** 자식 요소(<a> 등)에 스타일을 입힌다 */
  asChild?: boolean
  /** 진행 중. 누를 수 없고 스피너가 나온다. 글자는 그대로 둔다 */
  loading?: boolean
}

function Button({ className, variant, tone, size, asChild = false, loading = false, disabled, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, tone, size }), className)}
      disabled={asChild ? undefined : disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && !asChild && <LoaderCircle className="animate-spin" aria-hidden />}
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
