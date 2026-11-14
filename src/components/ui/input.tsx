import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { controlClass, Field, type FieldProps } from './field'

/**
 * Input — 라벨·도움말·에러 문구를 함께 갖춘 한 줄 입력.
 * tone은 따로 받지 않는다: error가 있으면 danger.
 * 문서: stories/components/Input.mdx · DESIGN.md 4.2
 */
const inputClass = cn(controlClass, 'h-10 file:border-0 file:bg-transparent file:text-callout file:font-semibold')

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'>, Omit<FieldProps, 'id' | 'required'> {}

function Input({ id, label, hint, error, className, required, ...props }: InputProps) {
  const bare = !label && !hint && !error
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={className}>
      {(control) => <input data-slot="input" className={cn(inputClass, bare && className)} {...control} {...props} />}
    </Field>
  )
}

export { Input, inputClass }
