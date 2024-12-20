import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_private/_student/redirect')({
  component: RouteComponent,
})

function RouteComponent() {
  const pageCount = Number(localStorage.getItem('pageCount'))
  const isFromHome = localStorage.getItem('isFromHome') === 'true'

  useEffect(() => {
    // Code to run on initial load
    console.log('Page loaded')
    // You can add more initialization code here
  }, [])

  return <div>Handling transaction</div>
}
