export interface WorkProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  url?: string;
}

function Work({ title, description, imageUrl, url, date }: WorkProps) {
  return (
    <div
      className="flex flex-row gap-3 p-1 items-center hover:opacity-60 cursor-pointer transition-opacity duration-200"
      onClick={() => url && window.open(url, "_blank")}
    >
      <img
        src={imageUrl}
        className="aspect-square rounded-lg outline-2 outline-white drop-shadow-lg -rotate-8"
        width={36}
        height={36}
      />
      <div className="flex flex-col w-full">
        <p>{title}</p>
        <p className="text-sm text-[#A0A0A0] -mt-0.5">{description}</p>
      </div>
      <p className="text-sm text-right whitespace-nowrap">{date}</p>
    </div>
  );
}

export default Work;
