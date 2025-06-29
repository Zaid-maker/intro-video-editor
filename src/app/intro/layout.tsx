export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0; 