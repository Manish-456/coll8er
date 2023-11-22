import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full bg-slate-100/50">
    <Navbar />
  <main className="pt-40 pb-20 bg-slate-100/50">
    {children}
  </main>
  <Footer />
  </div>;
}
