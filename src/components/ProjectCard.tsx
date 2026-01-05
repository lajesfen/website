import type { RefObject } from "react";
import TextIconURL from "./TextIconURL";

function ProjectCard({
  title,
  description,
  url,
  source,
  ref,
}: {
  title: string;
  description: string;
  url?: string;
  source?: string;
  ref: RefObject<null>;
}) {
  return (
    <div className="flex flex-col mx-auto gap-2 text-center z-10" ref={ref}>
      <h1 className="text-[#1E4BF5] font-[Akira] text-lg">{title}</h1>
      <p className="text-left text-pretty text-xs">{description}</p>
      <div className="flex flex-row gap-2 justify-center text-[#1E4BF5] font-[Akira] text-[0.60rem] text-center">
        {url && <TextIconURL text="Visit" href={url} icon="arrow" />}
        {source && <TextIconURL text="Source" href={source} icon="source" />}
      </div>
    </div>
  );
}

export default ProjectCard;
