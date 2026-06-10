import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import GitHubButton from "../assets/github-button.webp";
import LeftButton from "../assets/left-button.webp";
import OpenButton from "../assets/open-button.webp";
import { Button } from "../components/Button";
import { LabeledObject } from "../components/LabeledObject";
import projects from "../data/projects.json";
import { formatDate } from "../utils/date";

export function Project() {
  const navigate = useNavigate();

  const imgRef = useRef<HTMLImageElement>(null);
  const { project } = useParams();
  const data = projects.find((p) => p.path === project);

  if (!data) {
    return (
      <div className="w-full max-w-2xl h-screen flex flex-col items-center justify-center p-6">
        <h2 className="mb-4">Project Not Found</h2>
        <LabeledObject label="Go Back">
          <button
            className="cursor-pointer select-none rounded-md p-1 items-center justify-center flex bg-[#F0EEEC] hover:bg-[#e1e1e1] border border-[#DCDCDC] transition-colors duration-150"
            style={{
              width: "32px",
              height: "32px",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)",
            }}
            onClick={() => navigate("/")}
          >
            <img src={LeftButton} alt="Go Back" className="w-full h-full" />
          </button>
        </LabeledObject>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col gap-6 mb-10">
        <img
          src={"../assets/" + data.image_url}
          alt={data.title}
          className="w-24 h-24 select-none shrink-0 rounded-2xl border-4 border-white"
          style={{
            filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.25))",
          }}
        />
        <div className="flex flex-col w-full gap-1">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-3 items-center">
              <LabeledObject label="Go Back">
                <button
                  className="cursor-pointer select-none rounded-md p-1 items-center justify-center flex bg-[#F0EEEC] hover:bg-[#e1e1e1] border border-[#DCDCDC] transition-colors duration-150"
                  style={{
                    width: "32px",
                    height: "32px",
                    boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)",
                  }}
                  onClick={() => navigate("/")}
                >
                  <img
                    src={LeftButton}
                    alt="Go Back"
                    className="w-full h-full"
                  />
                </button>
              </LabeledObject>
              <h1 className="text-2xl font-medium">{data.title}</h1>
            </div>
            <div className="flex flex-row gap-1 items-center">
              {data.url_repo && (
                <Button url={data.url_repo} label="GitHub">
                  <img
                    src={GitHubButton}
                    alt="GitHub"
                    className="w-full h-full"
                  />
                </Button>
              )}
              {data.url_demo && (
                <Button url={data.url_demo} label="Open">
                  <img src={OpenButton} alt="Open" className="w-full h-full" />
                </Button>
              )}
            </div>
          </div>
          <p className="text-sm">{formatDate(new Date(data.date))}</p>
        </div>

        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children }) => (
              <div className="font-medium uppercase border-t border-[#ccc] pt-3">
                {children}
              </div>
            ),
            h2: ({ children }) => (
              <div className="font-medium uppercase">{children}</div>
            ),
            strong: ({ children }) => (
              <span className="font-medium">{children}</span>
            ),
            hr: () => <div className="border-t border-[#aaa]" />,
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="mx-auto my-6 rounded-md opacity-0"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  const isVertical = img.naturalHeight > img.naturalWidth;
                  img.classList.remove("opacity-0");
                  img.classList.add(isVertical ? "max-w-1/2" : "w-full");
                }}
              />
            ),
            video: ({ src }) => (
              <video
                controls={false}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full my-6 rounded-md"
              />
            ),
          }}
        >
          {data.description}
        </ReactMarkdown>
      </div>
    </div>
  );
}
