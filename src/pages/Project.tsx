import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import GitHubButton from "../assets/icons/github-button.webp";
import LeftButton from "../assets/icons/left-button.webp";
import OpenButton from "../assets/icons/open-button.webp";
import { Button } from "../components/Button";
import { LabeledObject } from "../components/LabeledObject";
import projects from "../data/projects.json";
import { formatDate } from "../utils/date";

export function Project() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const navigate = useNavigate();

  const { project } = useParams();
  const data = projects.find((p) => p.path === project);

  useGSAP(
    () => {
      gsap.from(".animate-in", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
      });
    },
    { scope: containerRef },
  );

  if (!data) {
    return (
      <div className="w-full max-w-2xl min-h-screen flex flex-col items-center justify-center p-6">
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
    <div
      ref={containerRef}
      className="w-full max-w-2xl flex flex-col items-center px-6 mt-[24vh] mb-[12vh]"
    >
      <div className="flex flex-col gap-6">
        <img
          src={"../assets/icons/" + data.image_url}
          alt={data.title}
          className="w-24 h-24 select-none shrink-0 rounded-2xl border-4 border-white animate-in"
          style={{
            filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.25))",
          }}
        />
        <div className="flex flex-col w-full gap-1 animate-in">
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
            p: ({ children }) => (
              <p className="text-base leading-relaxed animate-in">{children}</p>
            ),
            h1: ({ children }) => (
              <div className="font-medium uppercase border-t border-[#ccc] pt-3 animate-in">
                {children}
              </div>
            ),
            h2: ({ children }) => (
              <div className="font-medium uppercase animate-in">{children}</div>
            ),
            strong: ({ children }) => (
              <span className="font-medium">{children}</span>
            ),
            hr: () => <div className="border-t border-[#aaa] animate-in" />,
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-dotted"
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="w-full mx-auto my-4 rounded-lg animate-in"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  const isVertical = img.naturalHeight > img.naturalWidth;
                  img.classList.add(isVertical ? "max-w-2/5" : "");
                }}
              />
            ),
            video: ({ src }) => (
              <video
                controls={true}
                src={src}
                autoPlay
                loop
                playsInline
                className="w-full mx-auto my-4 rounded-lg animate-in"
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
