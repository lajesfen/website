import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export const GrabbableObject = ({
  tooltip,
  defaults,
  children,
}: {
  tooltip?: string;
  defaults?: { x: number; y: number; rotation: number };
  children?: React.ReactNode;
}) => {
  const object = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    top: defaults?.y ?? 0.5,
    left: defaults?.x ?? 0.5,
  });
  const [isDragging, setIsDragging] = useState(false);
  const lastRotation = useRef(defaults?.rotation ?? 0);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(
    () => {
      gsap.set(object.current, { rotation: lastRotation.current });
    },
    { scope: object, dependencies: [] },
  );

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
      gsap.to(
        tooltipRef.current,
        showTooltip && !isDragging
          ? { scale: 1, opacity: 1, y: 0, duration: 0.2 }
          : { scale: 0.2, opacity: 0, y: 6, duration: 0.15 },
      );
    },
    { scope: object, dependencies: [showTooltip, isDragging] },
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startTop = position.top;
    const startLeft = position.left;

    setIsDragging(true);

    let lastX = startX;
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - startY;

      lastRotation.current += deltaX * 0.1;
      lastX = e.clientX;

      gsap.set(object.current, { rotation: lastRotation.current });

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

      setIsDragging(false);
      lastRotation.current +=
        Math.atan2(e.clientY - startY, e.clientX - startX) * (180 / Math.PI);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setShowTooltip(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setShowTooltip(false);
  };

  return (
    <div>
      {tooltip && (
        <div
          ref={tooltipRef}
          className="fixed opacity-0 bg-white/80 text-xs shadow-lg px-3 py-1 rounded-full whitespace-nowrap select-none pointer-events-none"
          style={{
            top: `calc(${position.top * 100}% - 64px)`,
            left: `${position.left * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {tooltip}
        </div>
      )}
      <div
        ref={object}
        className="fixed select-none"
        style={{
          top: `${position.top * 100}%`,
          left: `${position.left * 100}%`,
          transform: "translate(-50%, -50%)",
          cursor: isDragging ? "grabbing" : "grab",
          filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.25))",
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      >
        {children}
      </div>
    </div>
  );
};
