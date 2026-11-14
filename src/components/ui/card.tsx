import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/**
 * Card — 관련 내용을 한 덩어리로 묶는다.
 * elevated: 바탕 위에 떠 있음(그림자) · outlined: 테두리 · flat: 한 단계 진한 배경
 * 문서: stories/Card.mdx · DESIGN.md 4.3
 */
const cardVariants = cva('flex flex-col gap-4 rounded-lg p-5 text-default', {
  variants: {
    variant: {
      elevated: 'bg-layer-1 shadow-2',
      outlined: 'border bg-layer-1',
      flat: 'bg-layer-2',
    },
  },
  defaultVariants: { variant: 'outlined' },
})

export interface CardProps extends ComponentProps<'div'>, VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return <div data-slot="card" className={cn(cardVariants({ variant }), className)} {...props} />
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-header" className={cn('flex flex-col gap-1', className)} {...props} />
}

function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 data-slot="card-title" className={cn('text-headline text-default', className)} {...props} />
}

function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p data-slot="card-description" className={cn('text-footnote text-muted', className)} {...props} />
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('text-body', className)} {...props} />
}

function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('flex items-center gap-2', className)} {...props} />
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, cardVariants }
