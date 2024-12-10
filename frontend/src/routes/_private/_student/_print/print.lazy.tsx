// import PrintPage from '@/Pages/Student_Pages/Print'
import { createLazyFileRoute } from "@tanstack/react-router";
import DragNDrop from "@/Components/DragNDrop";

export const Route = createLazyFileRoute("/_private/_student/_print/print")({
  component: PrintPage,
});

function PrintPage() {
  return (
    <div className="flex justify-center w-full pt-10 pb-16 z-0">
      <DragNDrop />
    </div>
  );
}
