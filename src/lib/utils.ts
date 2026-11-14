import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/** uc 토큰 이름을 tailwind-merge에 알려 준다. 안 알려 주면 text-headline(크기)과 text-on-brand(색)를 같은 그룹으로 보고 하나를 지운다 */
export const TEXT_STYLES = [
  'large-title', 'title1', 'title2', 'title3', 'headline', 'body',
  'callout', 'subheadline', 'footnote', 'caption1', 'caption2',
] as const

const twMerge = extendTailwindMerge({
  override: {
    theme: {
      text: [...TEXT_STYLES],
      'font-weight': ['regular', 'semibold', 'bold'],
      shadow: ['1', '2', '3'],
      radius: ['sm', 'md', 'lg', 'full'],
      container: ['xs', 'sm', 'md', 'lg'],
      ease: ['standard'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
