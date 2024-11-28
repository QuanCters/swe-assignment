import PrintPage from '@/Pages/Student_Pages/Print'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_private/_print/print')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PrintPage />
    </>
  )
}
