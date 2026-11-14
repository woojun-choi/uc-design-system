import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import './storybook.css'

/** 'system'이면 속성을 지워서 OS 설정을 따르게 한다 */
function setAttr(name: string, value: string) {
  const el = document.documentElement
  if (value === 'system') el.removeAttribute(name)
  else el.setAttribute(name, value)
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: '테마',
      toolbar: { title: '테마', icon: 'paintbrush', items: ['neutral', 'paper'], dynamicTitle: true },
    },
    mode: {
      description: '모드',
      toolbar: {
        title: '모드',
        icon: 'mirror',
        items: [
          { value: 'system', title: '모드: 시스템' },
          { value: 'light', title: '라이트' },
          { value: 'dark', title: '다크' },
        ],
        dynamicTitle: true,
      },
    },
    contrast: {
      description: '대비',
      toolbar: {
        title: '대비',
        icon: 'contrast',
        items: [
          { value: 'system', title: '대비: 시스템' },
          { value: 'standard', title: '기본 대비' },
          { value: 'more', title: '고대비' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'neutral', mode: 'system', contrast: 'system' },
  decorators: [
    (Story, ctx) => {
      const { theme, mode, contrast } = ctx.globals
      useEffect(() => {
        setAttr('data-uc-theme', theme)
        setAttr('data-uc-mode', mode)
        setAttr('data-uc-contrast', contrast)
        document.body.style.background = 'var(--uc-bg-layer-1)'
      }, [theme, mode, contrast])
      return <Story />
    },
  ],
  parameters: { layout: 'padded' },
}
export default preview
