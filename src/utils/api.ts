import projects from "../data/projects.json";
import type { ProjectProps } from "../types/Project";

export function fetchProjects(): ProjectProps[] {
  return projects
    .map((project) => ({
      ...project,
      url_demo: project.url_demo ?? undefined,
      url_repo: project.url_repo ?? undefined,
      date: new Date(project.date),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function fetchProjectByPath(path: string): ProjectProps {
  const project = projects.find((p) => p.path === path);

  if (!project) {
    throw new Error("Project not found");
  }

  return {
    ...project,
    url_demo: project.url_demo ?? undefined,
    url_repo: project.url_repo ?? undefined,
    date: new Date(project.date),
  };
}
