import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import Desk from "./scenes/Desk";

gsap.registerPlugin(useGSAP);

function App() {
  const [cameraMoved, setCameraMoved] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const resetCamRef = useRef(null);

  useGSAP(
    () => {
      if (!resetCamRef.current) return;

      gsap.fromTo(
        resetCamRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    },
    { dependencies: [cameraMoved] }
  );

  return (
    <main className="relative">
      <section className="w-full h-screen">
        <Desk onCameraMoved={setCameraMoved} resetSignal={resetSignal} />
      </section>

      <footer className="absolute left-1/2 -translate-x-1/2 bottom-14 p-2 grid place-items-center">
        {cameraMoved && (
          <div
            onClick={() => setResetSignal((s) => s + 1)}
            className="my-2 p-2 cursor-pointer text-center text-xs text-[#1E4BF5] font-[Monument]"
            ref={resetCamRef}
          >
            Reset camera
          </div>
        )}
        <ul className="flex flex-row gap-3">
          <SocialLink href="mailto:lajesfen@gmail.com" icon="email" />
          <SocialLink href="https://github.com/lajesfen" icon="github" />
          <SocialLink
            href="https://www.linkedin.com/in/luciano-aguirre-jesfen/"
            icon="linkedin"
          />
        </ul>
      </footer>
    </main>
  );
}

const SocialLink = ({ href, icon }: { href: string; icon: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img src={`./assets/icons/${icon}.svg`} width={32} height={32} alt={icon} />
  </a>
);

export default App;
