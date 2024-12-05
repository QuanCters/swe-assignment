import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/_student")({
  beforeLoad: async ({ context }) => {
    const { isSPSO } = context.authentication;
    if (isSPSO()) {
      throw redirect({ to: "/" });
    }
  },
});
