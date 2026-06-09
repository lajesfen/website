import { LabeledObject } from "./LabeledObject";

export const Button = ({
  url,
  label,
  size = 32,
  children,
}: {
  url: string;
  label?: string;
  size?: number;
  children: React.ReactNode;
}) => {
  return (
    <LabeledObject label={label}>
      <button
        className="cursor-pointer select-none rounded-md p-1 items-center justify-center flex bg-[#F0EEEC] hover:bg-[#e1e1e1] border border-[#DCDCDC] transition-colors duration-150"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)",
        }}
        onClick={() => window.open(url, "_blank")}
      >
        {children}
      </button>
    </LabeledObject>
  );
};
