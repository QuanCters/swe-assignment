import { createLazyFileRoute } from "@tanstack/react-router";
import ConfigPrintPage from "@/Pages/Student_Pages/ConfigPrint";

export const Route = createLazyFileRoute(
  "/_private/_student/_print/config-page"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center w-full pt-5 pb-16 z-0">
      <ConfigPrintPage />
    </div>
  );
}
