import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication;
    if (!isLogged()) {
      throw redirect({ to: "/login" });
    }
  },
});

function Index() {
  const { isSPSO } = Route.useRouteContext({
    select: ({ authentication }) => ({ isSPSO: authentication.isSPSO }),
  });
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      {/* Main container */}
      <div className="w-full max-w-4xl p-6 space-y-8">
        {/* Welcome Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to the Smart Printing Service
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Manage your printing tasks effortlessly and efficiently.
          </p>
        </section>

        {/* Main Content */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {!isSPSO() && (
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-blue-600">
                Print Documents
              </h2>
              <p className="mt-2 text-gray-600">
                Print your documents with ease.
              </p>
            </div>
          )}

          {isSPSO() && (
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-blue-600">
                Manage Printer
              </h2>
              <p className="mt-2 text-gray-600">
                Add new printers and view existing printer configurations
                effortlessly.
              </p>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-blue-600">History</h2>
            <p className="mt-2 text-gray-600">View your previous print jobs.</p>
          </div>

          {!isSPSO() && (
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-blue-600">
                Buy pages
              </h2>
              <p className="mt-2 text-gray-600">
                Easily add more pages to your printer account and manage your
                printing capacity effectively.
              </p>
            </div>
          )}

          {isSPSO() && (
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-blue-600">
                Generate Reports
              </h2>
              <p className="mt-2 text-gray-600">
                Track and review your printer usage with detailed reports.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
