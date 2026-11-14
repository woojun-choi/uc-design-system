import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Field — 입력 요소의 라벨·도움말·에러 문구 틀. Input, Textarea가 같이 쓴다.
 * 입력 요소에 줄 id·aria 속성을 만들어 children 함수로 넘긴다.
 */
export interface FieldProps {
  id?: string
  /** 보이는 라벨. 없으면 입력 요소에 aria-label을 꼭 준다 */
  label?: ReactNode
  /** 입력 아래 도움말 */
  hint?: ReactNode
  /** 에러 문구 — 원인 + 해결 (원칙 12). 있으면 빨간 테두리와 aria-invalid */
  error?: ReactNode
  required?: boolean
}

export interface FieldControlProps {
  id: string
  required?: boolean
  'aria-invalid'?: true
  'aria-describedby'?: string
}

export function Field({
  id, label, hint, error, required, className, children,
}: FieldProps & { className?: string; children: (control: FieldControlProps) => ReactNode }) {
  const autoId = useId()
  const controlId = id ?? autoId
  const hintId = hint ? `${controlId}-hint` : undefined
  const errorId = error ? `${controlId}-error` : undefined
  const control = children({
    id: controlId,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': [errorId, hintId].filter(Boolean).join(' ') || undefined,
  })
  if (!label && !hint && !error) return control

  return (
    <div data-slot="field" className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={controlId} className="text-footnote font-semibold text-default">
          {label}
          {required && <span className="ml-0.5 text-danger" aria-hidden>*</span>}
        </label>
      )}
      {control}
      {error && <p id={errorId} className="text-footnote text-danger">{error}</p>}
      {hint && <p id={hintId} className="text-footnote text-muted">{hint}</p>}
    </div>
  )
}

/** Input · Textarea 공통 모양 */
export const controlClass = cn(
  'w-full min-w-0 rounded-md border border-strong bg-layer-1 px-3 text-body text-default',
  'placeholder:text-subtle transition-colors',
  'focus-visible:border-focus focus-visible:outline-offset-0',
  'disabled:cursor-not-allowed disabled:bg-layer-2 disabled:text-disabled',
  'aria-invalid:border-danger aria-invalid:focus-visible:outline-danger',
)
