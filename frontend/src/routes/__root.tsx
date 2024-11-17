import Header from "@/Components/Header";
import Tab from "@/Components/Tab";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// It's the layout component
export const Route = createRootRoute({
  component: () => (
    <div className="app bg-gray-20">
      <Header />
      <body>
        <Outlet />
      </body>

      <TanStackRouterDevtools />
    </div>
  ),
});
