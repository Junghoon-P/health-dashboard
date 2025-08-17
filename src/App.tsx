import { CheckupForm } from "@/features/checkup";

const App = () => {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Health Dashboard</h1>
        </div>
      </header>

      <section className="mx-auto min-w-[320px] max-w-6xl px-4 py-8">
        <CheckupForm />
      </section>
    </main>
  );
};

export default App;
