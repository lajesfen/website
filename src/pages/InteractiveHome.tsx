import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Email from "../assets/icons/email.webp";
import GitHub from "../assets/icons/github.webp";
import LinkedIn from "../assets/icons/linkedin.webp";
import { GrabbableObject } from "../components/GrabbableObject";
import projects from "../data/projects.json";
import type { Project } from "../types/Project";

export function InteractiveHome() {
  const containerRef = useRef<HTMLDivElement>(null);
  const getPosition = (index: number, total: number) => {
    const bounds = {
      x: [-420, 420],
      y: [-20, 20],
    };
    const step = total > 1 ? (bounds.x[1] - bounds.x[0]) / (total - 1) : 0;
    const baseX = bounds.x[0] + step * index;

    return {
      x: baseX,
      y: bounds.y[0] + Math.random() * (bounds.y[1] - bounds.y[0]),
      rotation: Math.random() * 20 - 10,
    };
  };

  useGSAP(
    () => {
      gsap.from(".animate-in", {
        opacity: 0,
        y: "+=20",
        scale: 0.8,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      {projects.map((project: Project, index) => {
        const position = getPosition(index, projects.length);

        return (
          <GrabbableObject
            key={project.path || index}
            label={project.title}
            url={project.path}
            defaultPosition={{ x: position.x, y: position.y }}
            defaultRotation={position.rotation}
          >
            <img
              src={"../assets/icons/" + project.image_url}
              alt={project.title}
              className="w-36 h-36 rounded-3xl border-3 border-white"
            />
          </GrabbableObject>
        );
      })}

      {/* Media Icons */}
      <GrabbableObject
        defaultPosition={{ x: 360, y: 300 }}
        defaultRotation={-15}
        label="LinkedIn"
        url="https://www.linkedin.com/in/luciano-aguirre-jesfen/"
      >
        <img src={LinkedIn} alt="LinkedIn" className="w-12 h-12" />
      </GrabbableObject>
      <GrabbableObject
        defaultPosition={{ x: 420, y: 280 }}
        defaultRotation={15}
        label="GitHub"
        url="https://github.com/lajesfen"
      >
        <img src={GitHub} alt="GitHub" className="w-12 h-12" />
      </GrabbableObject>
      <GrabbableObject
        defaultPosition={{ x: 480, y: 320 }}
        defaultRotation={0}
        label="Email"
        url="mailto:lajesfen@gmail.com"
      >
        <img src={Email} alt="Email" className="w-12 h-12" />
      </GrabbableObject>
    </div>
  );
}
