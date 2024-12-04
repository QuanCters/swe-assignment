import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/_student/buy-page')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_private/_student/buy-page!'
}
