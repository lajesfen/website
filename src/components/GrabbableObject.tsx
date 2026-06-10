import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GrabbableObject = ({
  label,
  url,
  defaultX = 0.5,
  defaultY = 0.5,
  defaultRotation = 0,
  children,
}: {
  label?: string;
  url?: string;
  defaultX?: number;
  defaultY?: number;
  defaultRotation?: number;
  children?: React.ReactNode;
}) => {
  const object = useRef<HTMLDivElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: defaultY, left: defaultX });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

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

  useGSAP(
    () => {
      gsap.killTweensOf(tooltip.current);
      gsap.to(
        tooltip.current,
        isHovered && !isDragging
          ? { scale: 1, opacity: 1, y: 0, duration: 0.2 }
          : { scale: 0.8, opacity: 0, y: 6, duration: 0.15 },
      );
    },
    { dependencies: [isHovered, isDragging] },
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startTop = position.top;
    const startLeft = position.left;
    let hasMoved = false;

    setIsDragging(true);

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
        if (url.startsWith("http") || url.startsWith("mailto:")) {
          window.open(url, "_blank");
        } else {
          navigate(url);
        }
      }
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="fixed select-none"
      style={{
        top: `${position.top * 100}%`,
        left: `${position.left * 100}%`,
        translate: "-50% -50%",
        cursor: isDragging ? "grabbing" : "grab",
        width: "max-content",
        height: "max-content",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragStart={(e) => e.preventDefault()}
    >
      {label && (
        <div
          ref={tooltip}
          className="absolute -top-9 left-1/2 -translate-x-1/2 pointer-events-none select-none px-2 py-1 rounded-full bg-white/70 border border-white text-xs shadow-lg whitespace-nowrap opacity-0"
        >
          {label}
        </div>
      )}
      <div
        ref={object}
        onMouseDown={handleMouseDown}
        style={{
          transform: `rotate(${defaultRotation}deg)`,
          filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.25))",
          width: "max-content",
          height: "max-content",
        }}
      >
        <div style={{ pointerEvents: "none" }}>{children}</div>
      </div>
    </div>
  );
};
