import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface GrabbableObjectProps {
  label?: string;
  url?: string;
  defaultPosition?: { x: number, y: number };
  defaultRotation?: number;
  children?: React.ReactNode;
}

let topZIndex = 1;
export const GrabbableObject = ({
  label,
  url,
  defaultPosition = { x: 0.5, y: 0.5 },
  defaultRotation = 0,
  children,
}: GrabbableObjectProps) => {
  const object = useRef<HTMLDivElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: defaultPosition.x, y: defaultPosition.y });
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [zIndex, setZIndex] = useState(0);
  const navigate = useNavigate();

  useGSAP(
    () => {
      gsap.to(object.current, {
        scale: isDragging ? 1.1 : 1,
        y: isDragging ? -12 : 0,
        duration: isDragging ? 0.15 : 0.3,
        ease: "power2.out",
      });
    },
    { scope: object, dependencies: [isDragging] },
  );

  useGSAP(
    () => {
      const tiltOffset =
        dragDirection === "right" ? 12 : dragDirection === "left" ? -12 : 0;

      gsap.to(object.current, {
        rotation: defaultRotation + tiltOffset,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { scope: object, dependencies: [dragDirection] },
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

  const bringToFront = () => {
    topZIndex += 1;
    setZIndex(topZIndex);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = position;
    let lastX = e.clientX;
    let hasMoved = false;
    let direction: "left" | "right" | null = null;
    setIsDragging(true);
    bringToFront();

    const handleMouseMove = (e: MouseEvent) => {
      hasMoved = true;

      const deltaX = e.clientX - lastX;
      if (deltaX !== 0) {
        const newDirection = deltaX > 0 ? "right" : "left";
        if (newDirection !== direction) {
          direction = newDirection;
          setDragDirection(direction);
        }
      }
      lastX = e.clientX;

      setPosition({
        x: startPos.x + (e.clientX - startX),
        y: startPos.y + (e.clientY - startY),
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (!hasMoved && url) {
        url.startsWith("http") || url.startsWith("mailto:")
          ? window.open(url, "_blank")
          : navigate(url);
      }
      setIsDragging(false);
      setDragDirection(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="fixed select-none animate-in"
      style={{
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        width: "max-content",
        height: "max-content",
        zIndex: zIndex,
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
          filter: isDragging
            ? "drop-shadow(0 6px 6px rgba(0,0,0,0.25))"
            : "drop-shadow(0 2px 3px rgba(0,0,0,0.25))",
          width: "max-content",
          height: "max-content",
        }}
      >
        <div style={{ pointerEvents: "none" }}>{children}</div>
      </div>
    </div>
  );
};
