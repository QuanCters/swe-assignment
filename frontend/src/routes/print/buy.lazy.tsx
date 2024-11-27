import { BuyPage } from '@/Pages/Student_Pages/Print/Buy'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/print/buy')({
  component: BuyPage
})
