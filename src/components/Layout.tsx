import { Toolbar } from "./Toolbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <main className="w-full min-h-screen flex flex-col items-center justify-start">
    <div className="fixed top-0 left-0 w-full h-[16vh] bg-linear-to-b from-background to-background/0 z-10 pointer-events-none" />
    <div className="fixed bottom-0 left-0 w-full h-[16vh] bg-linear-to-t from-background to-background/0 z-10 pointer-events-none" />
    <Toolbar />
    {children}
  </main>
);
