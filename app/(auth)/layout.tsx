export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center aurora-bg grid-pattern p-4">
      {children}
    </div>
  );
}
