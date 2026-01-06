import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import IconURL from "./components/IconURL";
import ProjectCard from "./components/ProjectCard";
import Desk from "./scenes/Desk";

gsap.registerPlugin(useGSAP);

const data = {
  donut: {
    title: "*Beep Boop*",
    description:
      "Hey there! This personal website is still a WIP, there might be some visual bugs but you can preview how each project will be displayed once complete :)",
    url: "",
    source: "",
  },
  hca: {
    title: "Huesos, Camara, Accion",
    description:
      "Web application that captures human poses in real time from a webcam and applies them to 3D characters using MediaPipe pose detection [Next.js, Three.js, R3F].",
    url: "https://cs4016-motion-transfer.vercel.app/",
    source: "https://github.com/lajesfen/CS4016-motion-transfer",
  },
};

function App() {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const cardRef = useRef(null);

  useGSAP(
    () => {
      if (focusedId && cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );
      }
    },
    { dependencies: [focusedId] }
  );

  const currentProject = focusedId
    ? data[focusedId as keyof typeof data]
    : null;

  return (
    <main className="relative">
      <section className="w-full h-screen">
        <Desk focusedId={focusedId} setFocusedId={setFocusedId} />
      </section>

      <footer className="w-full max-w-90 flex flex-col gap-8 absolute left-1/2 -translate-x-1/2 bottom-14 p-2 place-items-center">
        {currentProject && (
          <ProjectCard
            title={currentProject.title}
            description={currentProject.description}
            url={currentProject.url}
            source={currentProject.source}
            ref={cardRef}
          />
        )}
        <ul className="flex flex-row gap-3">
          <IconURL href="mailto:lajesfen@gmail.com" icon="email" />
          <IconURL href="https://github.com/lajesfen" icon="github" />
          <IconURL
            href="https://www.linkedin.com/in/luciano-aguirre-jesfen/"
            icon="linkedin"
          />
        </ul>
      </footer>
    </main>
  );
}

export default App;
