import Header from "@/Components/Header";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContext } from "@/hooks/useAuth";

type RouterContext = {
  authentication: AuthContext;
};

// It's the layout component
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="app bg-gray-20 flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-1 z-0 flex flex-col min-h-fit w-full">
        <Outlet />
      </main>
    </div>
  ),
});
