import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useTooltip } from "../../hooks/useTooltip";
import { Tooltip } from "./Tooltip";

export const GrabbableObject = ({
  label,
  defaults,
  url,
  children,
}: {
  label?: string;
  defaults?: { x: number; y: number; rotation: number };
  url?: string;
  children?: React.ReactNode;
}) => {
  const object = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    top: defaults?.y ?? 0.5,
    left: defaults?.x ?? 0.5,
  });
  const [objectHeight, setObjectHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { tooltipRef, handleMouseEnter, handleMouseLeave } =
    useTooltip(isDragging);

  useEffect(() => {
    if (object.current) setObjectHeight(object.current.offsetHeight);
  }, []);

  useGSAP(
    () => {
      gsap.to(
        object.current,
        isDragging
          ? { scale: 1.2, y: -12, duration: 0.1 }
          : { scale: 1, y: 0, duration: 0.2 },
      );
    },
    { scope: object, dependencies: [isDragging] },
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startTop = position.top;
    const startLeft = position.left;

    setIsDragging(true);

    let hasMoved = false;
    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;

      hasMoved = true;
      setPosition({
        top: Math.min(Math.max(startTop + deltaY / window.innerHeight, 0), 1),
        left: Math.min(
          Math.max(startLeft + (e.clientX - startX) / window.innerWidth, 0),
          1,
        ),
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      if (!hasMoved && url) {
        console.log(`Opening ${url}`);
      }

      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div>
      {label && (
        <Tooltip
          label={label}
          position={position}
          objectHeight={objectHeight}
          tooltipRef={tooltipRef}
        />
      )}
      <div
        ref={object}
        className="fixed select-none"
        style={{
          top: `${position.top * 100}%`,
          left: `${position.left * 100}%`,
          transform: `translate(-50%, -50%) rotate(${defaults?.rotation ?? 0}deg)`,
          cursor: isDragging ? "grabbing" : "grab",
          filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.25))",
          width: "max-content",
          height: "max-content",
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragStart={(e) => e.preventDefault()}
      >
        {children}
      </div>
    </div>
  );
};
