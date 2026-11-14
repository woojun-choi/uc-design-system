import { useEffect, useState, type ReactNode } from 'react'

/** 지금 html에 걸린 테마·모드·대비 기준으로 CSS 변수 값을 읽는다 */
export function useCssVars(names: string[], globals: Record<string, unknown>) {
  const [values, setValues] = useState<Record<string, string>>({})
  const key = JSON.stringify(globals)
  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement)
      setValues(Object.fromEntries(names.map((n) => [n, cs.getPropertyValue(n).trim()])))
    }
    const id = requestAnimationFrame(read)
    const mq = [matchMedia('(prefers-color-scheme: dark)'), matchMedia('(prefers-contrast: more)')]
    mq.forEach((m) => m.addEventListener('change', read))
    return () => {
      cancelAnimationFrame(id)
      mq.forEach((m) => m.removeEventListener('change', read))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return values
}

export function Section({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-heading text-title2 text-default">{title}</h2>
      {desc && <p className="mt-1 text-footnote text-muted">{desc}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}
