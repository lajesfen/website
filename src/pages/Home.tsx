import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { InlineLink } from "../components/InlineLink";
import { ProjectItem } from "../components/ProjectItem";
import { fetchProjects } from "../utils/api";

export function Home() {
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const data = fetchProjects();

  useGSAP(
    () => {
      if (!data || data.length === 0) return;

      gsap.from(".project-item", {
        opacity: 0,
        y: -20,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    {
      scope: projectsRef,
      dependencies: [data],
    },
  );

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="max-w-2xl px-8 mt-[25vh] mb-[10vh]">
        <div className="fixed top-0 left-0 w-full h-[16vh] bg-linear-to-b from-[#FAF9F6] to-[#FAF9F6]/20 z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-full h-[16vh] bg-linear-to-t from-[#FAF9F6] to-[#FAF9F6]/0 z-10 pointer-events-none" />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 text-pretty">
            <p>
              I'm Luciano, a Computer Science student based in Lima-Peru, with a
              strong interest in Web Development. I enjoy building interactive,
              engaging experiences that blend creativity with technology.
            </p>
            <p>
              Before diving fully into software development, I led a 3D art team
              at a game company, contributing to large-scale live interactive
              events. The role required cross-functional coordination,
              production planning, and delivering assets under real-time
              constraints. More recently, I've been a teaching assistant at my
              university, guiding students through VR application development
              and UI/UX principles.
            </p>
            <p>
              I'm always learning, experimenting, and building new things.
              Mostly for fun, sometimes for something bigger.
            </p>
            <p>
              @{" "}
              <InlineLink href={"https://github.com/lajesfen"}>
                GitHub
              </InlineLink>
              ,{" "}
              <InlineLink
                href={"https://linkedin.com/in/luciano-aguirre-jesfen"}
              >
                LinkedIn
              </InlineLink>{" "}
              or{" "}
              <InlineLink href={"mailto:lajesfen@gmail.com"}>
                email me
              </InlineLink>
              .
            </p>
          </div>
          <div ref={projectsRef} className="flex flex-col gap-3">
            <h2 className="font-medium">My recent work...</h2>
            {data && data.length > 0 && (
              <div className="flex flex-col gap-3">
                {data.map((project) => (
                  <div key={project.path} className="project-item">
                    <ProjectItem {...project} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
