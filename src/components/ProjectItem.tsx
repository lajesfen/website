import { Link } from "react-router-dom";
import type { ProjectProps } from "../types/Project";
import { formatDate } from "../utils/date";

export function ProjectItem({
  title,
  description,
  description_large,
  image_url,
  url_repo,
  url_demo,
  date,
  path,
}: ProjectProps) {
  const stringDate = formatDate(date);

  return (
    <Link
      to={description_large ? `/projects/${path}` : (url_demo || url_repo)!}
      className="flex flex-row gap-4 p-1 items-center hover:opacity-60 group cursor-pointer transition-opacity duration-100"
    >
      <div className="size-10 shrink-0 aspect-square">
        <img
          src={image_url}
          className="drop-shadow-[0px_3px_2px_rgba(0,0,0,0.15)] -rotate-8 group-hover:rotate-4 object-cover group-hover:scale-110 transition-transform duration-300"
          alt={title}
        />
      </div>
      <div className="flex flex-col w-full">
        <p>{title} ↗</p>
        <p className="text-sm text-[#A0A0A0] -mt-0.5">{description}</p>
      </div>
      <p className="text-sm text-right whitespace-nowrap">{stringDate}</p>
    </Link>
  );
}
