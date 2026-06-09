import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export const LabeledObject = ({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) => {
  const tooltip = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(
    () => {
      gsap.killTweensOf(tooltip.current);
      gsap.to(
        tooltip.current,
        isHovered
          ? { scale: 1, opacity: 1, y: 0, duration: 0.2 }
          : { scale: 0.8, opacity: 0, y: 6, duration: 0.15 },
      );
    },
    { dependencies: [isHovered] },
  );

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label && (
        <div
          ref={tooltip}
          className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none px-2 py-1 rounded-full bg-white/70 border border-white text-xs shadow-lg whitespace-nowrap opacity-0"
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
};
