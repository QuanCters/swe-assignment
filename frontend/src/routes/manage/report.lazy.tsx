import { createLazyFileRoute } from '@tanstack/react-router'
import ManageReportPage from '@/Pages/SPSO_Pages/Report'

export const Route = createLazyFileRoute('/manage/report')({
  component: ManageReportPage,
})
