import { RouterProvider, createRouter } from "@tanstack/react-router";
// Import the auto generated route tree
import { routeTree } from "./routeTree.gen";
import { ModalProvider } from "./context/ModalContext";
import ModalManager from "./Components/modals/ModalManager";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
// Create a new router instance
const router = createRouter({ routeTree });

export default function App() {
  return (
    <ModalProvider>
      <ModalManager />
      <RouterProvider router={router} />
    </ModalProvider>
  );
}
