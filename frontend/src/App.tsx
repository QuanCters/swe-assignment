import { RouterProvider, createRouter } from "@tanstack/react-router";
// Import the auto generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./context/ModalContext";
import ModalManager from "./Components/modals/ModalManager";
import { useAuth } from "./hooks/useAuth";
import setupLogoutOnClose from "./utils/logoutOnClose";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

declare module "@tanstack/react-router" {
  interface HistoryState {
    file?: File;
    config?: any;
  }
}
// Create a new router instance
const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
});

const queryClient = new QueryClient();

setupLogoutOnClose();

export default function App() {
  const authentication = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <ModalManager />
        <RouterProvider router={router} context={{ authentication }} />
      </ModalProvider>
    </QueryClientProvider>
  );
}
