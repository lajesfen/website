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

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="w-2xl px-8 mt-[25vh] mb-[10vh]">
        <div className="fixed top-0 left-0 w-full h-[16vh] bg-linear-to-b from-[#FAF9F6] to-[#FAF9F6]/20 z-10 pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 w-full h-[16vh] bg-linear-to-t from-[#FAF9F6] to-[#FAF9F6]/0 z-10 pointer-events-none"></div>
        <div className="flex flex-col gap-8">
          <Link to={`/`} className="underline cursor-pointer w-fit">
            Back
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
                    className="w-fit text-sm text-[#A0A0A0] -mt-0.5 underline"
                    href={project.url_demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
            <article className="prose">
              <ReactMarkdown>{project.description_large}</ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
