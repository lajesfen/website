import ReactMarkdown from "react-markdown";
import { getToday } from "../utils/date";
import { randomOrderNum } from "../utils/random";
import { JaggedBottomSvg } from "./JaggedBottomSvg";
import { JaggedTopSvg } from "./JaggedTopSvg";
import { MarkdownImage } from "./MarkdownImage";

export function ProjectReceipt({ description }: { description: string }) {
  return (
    <article className="w-full font-mono bg-white px-6 p-8 drop-shadow-md relative">
      <JaggedTopSvg />
      <div className="text-center mb-4 border-b border-dashed border-[#aaa] pb-4">
        <div className="text-xs text-[#666] mt-1">{getToday()}</div>
        <div className="text-xs text-[#666]">ORDER #{randomOrderNum()}</div>
      </div>

      <div className="text-xs prose-sm wrap-break-word">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <div className="font-bold uppercase border-t border-dashed border-[#ccc] pt-3">
                {children}
              </div>
            ),
            h2: ({ children }) => (
              <div className="font-bold uppercase">{children}</div>
            ),
            strong: ({ children }) => (
              <span className="font-bold">{children}</span>
            ),
            hr: () => <div className="border-t border-dashed border-[#aaa]" />,
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#007acc]"
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => <MarkdownImage src={src} alt={alt} />,
          }}
        >
          {description}
        </ReactMarkdown>
      </div>

      <div className="border-t border-dashed border-[#aaa] mt-6 pt-4 text-center">
        <div className="text-xs text-[#888] tracking-wider">
          *** THANK YOU ***
        </div>
        <div className="text-xs text-[#aaa] my-2">{"|".repeat(42)}</div>
      </div>
      <JaggedBottomSvg />
    </article>
  );
}
