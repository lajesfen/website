import { Board } from "../components/interactive/Board";
import { Toolbar } from "../components/Toolbar";

export function Home() {
  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="fixed top-0 left-0 w-full h-[16vh] bg-linear-to-b from-background to-background/0 z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-[16vh] bg-linear-to-t from-background to-background/0 z-10 pointer-events-none" />

      <Toolbar />

      {/* Text-Based */}
      <div className="hidden max-w-2xl px-8 mt-[25vh] mb-[10vh]"></div>
      {/* Interaction-Based */}
      <Board />
    </main>
  );
}
