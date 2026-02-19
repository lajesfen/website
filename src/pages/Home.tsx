import { useGSAP } from "@gsap/react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { useRef } from "react";
import { InlineLink } from "../components/InlineLink";
import { ProjectItem } from "../components/ProjectItem";
import { fetchProjects } from "../utils/api";

export function Home() {
  const projectsRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      return fetchProjects();
    },
  });

  useGSAP(
    () => {
      if (!data || data.length === 0) return;

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
            <p>Hello,</p>
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
              <InlineLink href={"mailto:lajesfen@gmail.com"}>Email</InlineLink>.
            </p>
          </div>
          <div ref={projectsRef} className="flex flex-col gap-3">
            <h2 className="font-medium">My recent work...</h2>
            {data && data.length > 0
              ? data.map((project, i) => (
                  <div key={i} className="project-item">
                    <ProjectItem
                      title={project.title}
                      path={project.path}
                      description={project.description}
                      description_large={project.description_large}
                      image_url={project.image_url}
                      url_demo={project.url_demo}
                      url_repo={project.url_repo}
                      date={project.date}
                    />
                  </div>
                ))
              : data && <p>🐌 -Nothing here... yet</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
