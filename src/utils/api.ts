import type { ProjectProps } from "../types/Project";

export async function fetchProjects(): Promise<ProjectProps[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/portfolio/projects`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await response.json();

  return data.projects.sort(
    (a: ProjectProps, b: ProjectProps) =>
      new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function fetchProjectByPath(path: string): Promise<ProjectProps> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/portfolio/projects/${path}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const data = await response.json();
  return data.project;
}
