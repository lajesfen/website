import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export const useTooltip = (isDragging: boolean) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(
    () => {
      gsap.to(
        tooltipRef.current,
        show && !isDragging
          ? { scale: 1, opacity: 1, y: 0, duration: 0.2 }
          : { scale: 0.2, opacity: 0, y: 6, duration: 0.15 },
      );
    },
    { dependencies: [show, isDragging] },
  );

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => setShow(true), 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setShow(false);
  };

  return { tooltipRef, handleMouseEnter, handleMouseLeave };
};
