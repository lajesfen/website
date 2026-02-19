import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import { InlineLink } from "../components/InlineLink";
import { ProjectReceipt } from "../components/ProjectReceipt";
import { fetchProjectByPath } from "../utils/api";
import { formatDate } from "../utils/date";

export function ProjectPage() {
  const { projectPath } = useParams<{ projectPath: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectPath],
    queryFn: async () => {
      return fetchProjectByPath(projectPath!);
    },
  });

  if (isLoading) {
    return (
      <main className="w-full min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!data || isError) {
    return <Navigate to="/" />;
  }

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="max-w-2xl w-full px-8 mt-[25vh] mb-[10vh]">
        <div className="fixed top-0 left-0 w-full h-[16vh] bg-linear-to-b from-[#FAF9F6] to-[#FAF9F6]/20 z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-full h-[16vh] bg-linear-to-t from-[#FAF9F6] to-[#FAF9F6]/0 z-10 pointer-events-none" />
        <div className="flex flex-col gap-8">
          <Link
            to="/"
            className="cursor-pointer w-fit hover:opacity-60 transition-opacity duration-100"
          >
            ↩
          </Link>
          <div className="flex flex-col gap-8 text-pretty w-full">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <h1 className="font-medium">{data.title}</h1>
                <p className="text-sm">{formatDate(data.date)}</p>
              </div>
              <div className="flex flex-row gap-2 text-sm text-[#A0A0A0]">
                {data.url_repo && (
                  <InlineLink href={data.url_repo}>GitHub</InlineLink>
                )}
                {data.url_demo && (
                  <InlineLink href={data.url_demo}>Demo</InlineLink>
                )}
              </div>
            </div>

            <ProjectReceipt
              description={data.description_large || data.description}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
