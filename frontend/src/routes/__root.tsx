import Header from "@/Components/Header";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthContext } from "@/hooks/useAuth";

type RouterContext = {
  authentication: AuthContext;
};

// It's the layout component
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="app bg-gray-20 flex flex-col min-h-screen w-full">
      <Header />
      <body className="flex-1 z-0 flex flex-col min-h-fit w-[100vw]">
        <Outlet />
      </body>

      <TanStackRouterDevtools />
    </div>
  ),
});
