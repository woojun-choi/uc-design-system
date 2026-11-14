import { useId, type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Input — 라벨·도움말·에러 문구를 함께 갖춘 한 줄 입력.
 * tone은 따로 받지 않는다: error가 있으면 danger.
 * 문서: stories/Input.mdx · DESIGN.md 4.2
 */
const inputClass = cn(
  'h-10 w-full min-w-0 rounded-md border border-strong bg-layer-1 px-3 text-body text-default',
  'placeholder:text-subtle transition-colors',
  'focus-visible:border-focus focus-visible:outline-offset-0',
  'disabled:cursor-not-allowed disabled:bg-layer-2 disabled:text-disabled',
  'aria-invalid:border-danger aria-invalid:focus-visible:outline-danger',
  'file:border-0 file:bg-transparent file:text-callout file:font-semibold',
)

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  /** 보이는 라벨. 없으면 aria-label을 꼭 준다 */
  label?: ReactNode
  /** 입력 아래 도움말 */
  hint?: ReactNode
  /** 에러 문구 — 원인 + 해결 (원칙 12). 있으면 빨간 테두리와 aria-invalid */
  error?: ReactNode
}

function Input({ id, label, hint, error, className, required, ...props }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const field = (
    <input
      id={inputId}
      data-slot="input"
      required={required}
      aria-invalid={error ? true : undefined}
      aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
      className={cn(inputClass, !label && !hint && !error && className)}
      {...props}
    />
  )
  if (!label && !hint && !error) return field

  return (
    <div data-slot="field" className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-footnote font-semibold text-default">
          {label}
          {required && <span className="ml-0.5 text-danger" aria-hidden>*</span>}
        </label>
      )}
      {field}
      {error && (
        <p id={errorId} className="text-footnote text-danger">
          {error}
        </p>
      )}
      {hint && (
        <p id={hintId} className="text-footnote text-muted">
          {hint}
        </p>
      )}
    </div>
  )
}

export { Input, inputClass }
