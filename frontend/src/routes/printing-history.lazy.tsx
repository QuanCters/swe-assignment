import { createLazyFileRoute } from "@tanstack/react-router";
import PrintingHistoryPage from "@/Pages/Student_Pages/PrintingHistory_StudentPage/PrintingHistory";

export const Route = createLazyFileRoute("/printing-history")({
  component: PrintingHistoryPage,
});
