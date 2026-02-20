import { useState } from "react";

export function MarkdownImage({ src, alt }: { src?: string; alt?: string }) {
  const [isVertical, setIsVertical] = useState<boolean | null>(null);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={(e) => {
        const img = e.currentTarget;
        setIsVertical(img.naturalHeight > img.naturalWidth);
      }}
      className={`mx-auto my-6 rounded-md ${
        isVertical === null
          ? "opacity-0"
          : isVertical
            ? "max-w-1/2 md:max-w-1/3 opacity-100"
            : "w-full opacity-100"
      }`}
    />
  );
}
