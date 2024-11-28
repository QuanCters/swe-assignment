import Header from "@/Components/Header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// It's the layout component
export const Route = createRootRoute({
  component: () => (
    <div className="app bg-gray-20 flex flex-col min-h-screen">
      <Header />
      <body className="flex-1 z-0">
        <Outlet />
      </body>

      <TanStackRouterDevtools />
    </div>
  ),
});
