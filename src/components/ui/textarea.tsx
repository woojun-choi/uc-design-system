import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { controlClass, Field, type FieldProps } from './field'

/**
 * Textarea — 여러 줄 입력. 라벨·도움말·에러는 Input과 같다.
 * 문서: stories/components/Textarea.mdx · DESIGN.md 4.6
 */
export interface TextareaProps extends ComponentProps<'textarea'>, Omit<FieldProps, 'id' | 'required'> {}

function Textarea({ id, label, hint, error, className, required, rows = 4, ...props }: TextareaProps) {
  const bare = !label && !hint && !error
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={className}>
      {(control) => (
        <textarea
          data-slot="textarea"
          rows={rows}
          className={cn(controlClass, 'field-sizing-content min-h-20 resize-y py-2', bare && className)}
          {...control}
          {...props}
        />
      )}
    </Field>
  )
}

export { Textarea }
