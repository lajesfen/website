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
      <img
        src={image_url}
        className="drop-shadow-sm -rotate-8 group-hover:-rotate-25 transition-transform duration-300"
        width={36}
        height={36}
        alt={title}
      />
      <div className="flex flex-col w-full">
        <p>{title}</p>
        <p className="text-sm text-[#A0A0A0] -mt-0.5">{description}</p>
      </div>
      <p className="text-sm text-right whitespace-nowrap">{stringDate}</p>
    </Link>
  );
}

export default Project;
