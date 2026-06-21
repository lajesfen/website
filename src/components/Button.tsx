import { useNavigate } from "react-router-dom";
import { LabeledObject } from "./LabeledObject";

interface ButtonProps {
  url: string;
  label?: string;
  children: React.ReactNode;
}

export const Button = ({ url, label, children }: ButtonProps) => {
  const navigate = useNavigate();

  return (
    <LabeledObject label={label}>
      <button
        className="cursor-pointer select-none rounded-md p-1 items-center justify-center flex shadow-inset-highlight bg-[#F0EEEC] hover:bg-[#e1e1e1] border border-[#DCDCDC] transition-colors duration-150"
        onClick={() => {
          if (url.startsWith("http") || url.startsWith("mailto:")) {
            window.open(url, "_blank");
          } else {
            navigate(url);
          }
        }}
      >
        {children}
      </button>
    </LabeledObject>
  );
};
