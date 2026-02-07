import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Project, { type ProjectProps } from "./components/Project";

gsap.registerPlugin(useGSAP);

function App() {
  const [projects, setProjects] = useState<ProjectProps[] | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/portfolio/projects`,
        );

        if (!response.ok) {
          setProjects([]);
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        const sortedProjects = data.projects.sort(
          (a: ProjectProps, b: ProjectProps) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        data.projects = sortedProjects;
        setProjects(data.projects);
      } catch (error) {
        setProjects([]);
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjects();
  }, []);

  useGSAP(
    () => {
      if (!projects || projects.length === 0) return;

      gsap.from(".project-item", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    {
      scope: projectsRef,
      dependencies: [projects],
    },
  );

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="max-w-2xl px-8 mt-[25vh] mb-[10vh]">
        <div className="fixed top-0 left-0 w-full h-[16vh] bg-linear-to-b from-[#FAF9F6] to-[#FAF9F6]/20 z-10 pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 w-full h-[16vh] bg-linear-to-t from-[#FAF9F6] to-[#FAF9F6]/0 z-10 pointer-events-none"></div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 text-pretty">
            <p>Hi,</p>
            <p>
              I'm Luciano, a Computer Science student based in Lima-Peru, with a
              strong interest in Web Development. I enjoy building interactive,
              engaging experiences that blend creativity with technology.
            </p>
            <p>
              Before diving fully into software development, I led a 3D art team
              at a game company, collaborating with developers on optimized
              content for live events. More recently, I've been a teaching
              assistant at my university, guiding students through VR
              application development and UI/UX principles.
            </p>
            <p>
              I'm always learning, experimenting, and building new things.
              Mostly for fun, sometimes for something bigger.
            </p>
            <p>
              @{" "}
              <a
                className="underline"
                href="https://github.com/lajesfen"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              ,{" "}
              <a
                className="underline"
                href="https://linkedin.com/in/luciano-aguirre-jesfen"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{" "}
              or{" "}
              <a
                className="underline"
                href="mailto:lajesfen@gmail.com"
                target="_blank"
              >
                Email
              </a>
              .
            </p>
          </div>
          <div ref={projectsRef} className="flex flex-col gap-3">
            <p>My recent work...</p>
            {projects && projects.length > 0
              ? projects.map((project, i) => (
                  <div key={i} className="project-item">
                    <Project
                      title={project.title}
                      description={project.description}
                      imageUrl={project.imageUrl}
                      url={project.url}
                      date={project.date}
                    />
                  </div>
                ))
              : projects && <p>🐌 -Nothing here... yet</p>}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
