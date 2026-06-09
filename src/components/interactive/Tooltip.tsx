export const Tooltip = ({
  label,
  position,
  objectHeight,
  tooltipRef,
}: {
  label: string;
  position: { top: number; left: number };
  objectHeight: number;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
}) => (
  <div
    ref={tooltipRef}
    className="fixed z-10 opacity-0 bg-white/70 border border-white text-xs shadow-lg px-3 py-1 rounded-full whitespace-nowrap select-none pointer-events-none"
    style={{
      top: `calc(${position.top * 100}% - ${objectHeight / 2 + 32}px)`,
      left: `${position.left * 100}%`,
      transform: "translateX(-50%)",
    }}
  >
    {label}
  </div>
);
