import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'

/** 개발 확인용. 실제 문서·확인은 Storybook에서 (npm run storybook) */
function App() {
  return (
    <main className="mx-auto max-w-sm p-8">
      <div className="rounded-lg border bg-layer-2 p-6 shadow-2">
        <h1 className="font-heading text-title1 text-default">uc-design-system</h1>
        <p className="mt-2 text-callout text-muted">토큰 확인용 페이지</p>
        <div className="mt-4 flex gap-2">
          <button className="rounded-md bg-brand-solid px-4 py-2 text-headline text-on-brand transition-colors hover:bg-brand-solid-hover">
            시작하기
          </button>
          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground ring-ring/50">shadcn 이름</button>
        </div>
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
