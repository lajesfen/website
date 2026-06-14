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
  const getPosition = (index: number, total: number) => ({
    x: 0.5 + (index - (total - 1) / 2) * 0.15 + (Math.random() * 0.04 - 0.02),
    y: 0.5 + (Math.random() * 0.06 - 0.03),
    rotation: Math.random() * 20 - 10,
  });

  useGSAP(
    () => {
      gsap.from(".animate-in", {
        opacity: 0,
        y: 16,
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
      {projects.map((project: Project, index) => (
        <GrabbableObject
          key={index}
          label={project.title}
          url={project.path}
          defaultX={getPosition(index, projects.length).x}
          defaultY={getPosition(index, projects.length).y}
          defaultRotation={getPosition(index, projects.length).rotation}
        >
          <img
            src={"../assets/icons/" + project.image_url}
            alt={project.title}
            className="w-42 h-42 rounded-3xl border-3 border-white"
          />
        </GrabbableObject>
      ))}

      {/* Media Icons */}
      <GrabbableObject
        defaultX={0.86}
        defaultY={0.85}
        defaultRotation={-15}
        label="LinkedIn"
        url="https://www.linkedin.com/in/luciano-aguirre-jesfen/"
      >
        <img src={LinkedIn} alt="LinkedIn" className="w-12 h-12" />
      </GrabbableObject>
      <GrabbableObject
        defaultX={0.9}
        defaultY={0.83}
        defaultRotation={15}
        label="GitHub"
        url="https://github.com/lajesfen"
      >
        <img src={GitHub} alt="GitHub" className="w-12 h-12" />
      </GrabbableObject>
      <GrabbableObject
        defaultX={0.94}
        defaultY={0.85}
        defaultRotation={0}
        label="Email"
        url="mailto:lajesfen@gmail.com"
      >
        <img src={Email} alt="Email" className="w-12 h-12" />
      </GrabbableObject>
    </div>
  );
}
