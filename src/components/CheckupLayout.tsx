interface CheckupLayoutProps {
  title: string;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

const CheckupLayout = ({
  title,
  headerActions,
  children,
}: CheckupLayoutProps) => {
  return (
    <main className="min-w-[320px] min-h-screen">
      <header className="sticky top-0 z-10 bg-blue-600 border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Health Dashboard</h1>
          {headerActions}
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        {children}
      </section>
    </main>
  );
};

export default CheckupLayout;
