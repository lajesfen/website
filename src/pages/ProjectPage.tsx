import { useGSAP } from "@gsap/react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
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

  useGSAP(
    () => {
      if (!data) return;

      gsap
        .from(".receipt", {
          y: -72,
          duration: 1.2,
          ease: "power2.out",
        })
        .then(() => {
          gsap.to(".receipt-shadow", {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        });
    },
    {
      dependencies: [data],
    },
  );

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
        <div className="flex flex-col gap-8 relative">
          <Link
            to="/"
            className="cursor-pointer w-fit opacity-60 hover:opacity-100 transition-opacity duration-100"
          >
            ↩
          </Link>
          <div className="receipt-shadow absolute top-14 left-0 z-20 w-full h-16 bg-[#FAF9F6]">
            <div className="absolute top-14 left-0 z-20 w-full h-2 bg-[#FAF9F6] shadow-md" />
          </div>
          <div className="flex flex-col gap-8 text-pretty w-full">
            <div className="flex flex-col z-20">
              <div className="flex flex-row justify-between items-center">
                <h1 className="font-medium">{data.title}</h1>
                <p className="text-sm">{formatDate(data.date)}</p>
              </div>
              <div className="flex flex-row gap-2 text-sm">
                {data.url_repo && (
                  <InlineLink href={data.url_repo}>GitHub</InlineLink>
                )}
                {data.url_demo && (
                  <InlineLink href={data.url_demo}>Demo</InlineLink>
                )}
              </div>
            </div>
            <div className="px-1">
              <ProjectReceipt
                description={data.description_large || data.description}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
