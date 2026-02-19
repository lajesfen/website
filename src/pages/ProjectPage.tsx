import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, Navigate, useParams } from "react-router-dom";
import type { ProjectProps } from "../types/Project";
import { formatDate } from "../utils/date";

export default function ProjectPage() {
  const { projectPath } = useParams<{ projectPath: string }>();
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/portfolio/projects/${projectPath}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }

        const data = await response.json();
        setProject(data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectPath]);

  if (loading) {
    return (
      <main className="w-full min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!project) {
    return <Navigate to="/" />;
  }

  const jaggedClipPath = `polygon(
    0% 8px, 8px 0%, 16px 8px, 24px 0%, 32px 8px, 40px 0%, 48px 8px,
    56px 0%, 64px 8px, 72px 0%, 80px 8px, 88px 0%, 96px 8px, 104px 0%,
    112px 8px, 120px 0%, 128px 8px, 136px 0%, 144px 8px, 152px 0%,
    160px 8px, 168px 0%, 176px 8px, 184px 0%, 192px 8px, 200px 0%,
    208px 8px, 216px 0%, 224px 8px, 232px 0%, 240px 8px, 248px 0%,
    256px 8px, 264px 0%, 272px 8px, 280px 0%, 288px 8px, 296px 0%,
    304px 8px, 312px 0%, 320px 8px, 328px 0%, 336px 8px, 344px 0%,
    352px 8px, 360px 0%, 368px 8px, 376px 0%, 100% 8px,
    100% calc(100% - 8px), calc(100% - 8px) 100%, calc(100% - 16px) calc(100% - 8px),
    calc(100% - 24px) 100%, calc(100% - 32px) calc(100% - 8px),
    calc(100% - 40px) 100%, calc(100% - 48px) calc(100% - 8px),
    calc(100% - 56px) 100%, calc(100% - 64px) calc(100% - 8px),
    calc(100% - 72px) 100%, calc(100% - 80px) calc(100% - 8px),
    calc(100% - 88px) 100%, calc(100% - 96px) calc(100% - 8px),
    calc(100% - 104px) 100%, calc(100% - 112px) calc(100% - 8px),
    calc(100% - 120px) 100%, calc(100% - 128px) calc(100% - 8px),
    calc(100% - 136px) 100%, calc(100% - 144px) calc(100% - 8px),
    calc(100% - 152px) 100%, calc(100% - 160px) calc(100% - 8px),
    calc(100% - 168px) 100%, calc(100% - 176px) calc(100% - 8px),
    calc(100% - 184px) 100%, calc(100% - 192px) calc(100% - 8px),
    calc(100% - 200px) 100%, calc(100% - 208px) calc(100% - 8px),
    calc(100% - 216px) 100%, calc(100% - 224px) calc(100% - 8px),
    calc(100% - 232px) 100%, calc(100% - 240px) calc(100% - 8px),
    calc(100% - 248px) 100%, calc(100% - 256px) calc(100% - 8px),
    calc(100% - 264px) 100%, calc(100% - 272px) calc(100% - 8px),
    calc(100% - 280px) 100%, calc(100% - 288px) calc(100% - 8px),
    calc(100% - 296px) 100%, calc(100% - 304px) calc(100% - 8px),
    calc(100% - 312px) 100%, calc(100% - 320px) calc(100% - 8px),
    calc(100% - 328px) 100%, calc(100% - 336px) calc(100% - 8px),
    calc(100% - 344px) 100%, calc(100% - 352px) calc(100% - 8px),
    calc(100% - 360px) 100%, calc(100% - 368px) calc(100% - 8px),
    calc(100% - 376px) 100%, 0% calc(100% - 8px)
  )`;

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="w-2xl px-8 mt-[25vh] mb-[10vh]">
        <div className="fixed top-0 left-0 w-full h-[16vh] bg-linear-to-b from-[#FAF9F6] to-[#FAF9F6]/20 z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-full h-[16vh] bg-linear-to-t from-[#FAF9F6] to-[#FAF9F6]/0 z-10 pointer-events-none" />
        <div className="flex flex-col gap-8">
          <Link
            to="/"
            className="cursor-pointer w-fit hover:opacity-60 transition-opacity duration-200"
          >
            ↩
          </Link>
          <div className="flex flex-col gap-8 text-pretty w-full">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <h1 className="font-medium">{project.title}</h1>
                <p className="text-sm">{formatDate(project.date)}</p>
              </div>
              <div className="flex flex-row gap-2">
                {project.url_repo && (
                  <a
                    className="w-fit text-sm text-[#A0A0A0] -mt-0.5 underline"
                    href={project.url_repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {project.url_demo && (
                  <a
                    className="w-fit text-sm text-[#A0A0A0] underline"
                    href={project.url_demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>

            <div
              className="w-full"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
            >
              <article
                className="w-full font-mono bg-white px-6 p-8 drop-shadow-2xl"
                style={{ clipPath: jaggedClipPath }}
              >
                <div className="text-center mb-4 border-b border-dashed border-[#aaa] pb-4">
                  <div className="text-xs text-[#666] mt-1">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-xs text-[#666]">
                    ORDER #{Math.floor(Math.random() * 90000) + 10000}
                  </div>
                </div>

                <div className="text-xs prose-sm">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <div className="font-bold uppercase border-t border-dashed border-[#ccc] pt-3">
                          {children}
                        </div>
                      ),
                      h2: ({ children }) => (
                        <div className="font-bold uppercase">{children}</div>
                      ),
                      strong: ({ children }) => (
                        <span className="font-bold">{children}</span>
                      ),
                      hr: () => (
                        <div className="border-t border-dashed border-[#aaa]" />
                      ),
                    }}
                  >
                    {project.description_large}
                  </ReactMarkdown>
                </div>

                <div className="border-t border-dashed border-[#aaa] mt-6 pt-4 text-center">
                  <div className="text-[0.65rem] text-[#888] tracking-wider">
                    *** THANK YOU ***
                  </div>
                  <div className="text-[0.6rem] text-[#aaa] my-2">
                    {"|".repeat(42)}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
