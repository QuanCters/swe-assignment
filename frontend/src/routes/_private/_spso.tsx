import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/_spso")({
  beforeLoad: async ({ context }) => {
    const { isSPSO } = context.authentication;
    if (!isSPSO()) {
      throw redirect({ to: "/" });
    }
  },
});
