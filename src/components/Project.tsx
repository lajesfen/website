import { Link } from "react-router-dom";
import type { ProjectProps } from "../types/Project";
import { formatDate } from "../utils/date";

function Project({
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
      className="flex flex-row gap-3 p-1 items-center hover:opacity-60 group cursor-pointer transition-opacity duration-200"
    >
      <div className="w-10 h-10 shrink-0">
        <img
          src={image_url}
          className="drop-shadow-md -rotate-8 group-hover:rotate-4 transition-transform duration-300"
          width={38}
          height={38}
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

export default Project;
