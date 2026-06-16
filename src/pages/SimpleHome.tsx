import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import EmailButton from "../assets/icons/email-button.webp";
import GitHubButton from "../assets/icons/github-button.webp";
import LinkedInButton from "../assets/icons/linkedin-button.webp";
import { Button } from "../components/Button";
import projects from "../data/projects.json";
import { formatDate } from "../utils/date";

export function SimpleHome() {
  const containerRef = useRef<HTMLDivElement>(null);

  const getRotation = () => Math.random() * 20 - 10;
  const navigate = useNavigate();

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

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl flex flex-col items-center justify-center p-6 mt-[24vh] mb-[12vh]"
    >
      <div className="flex flex-col gap-4 mb-10">
        <p className="animate-in">
          Experienced in Full-Stack Development, with a strong interest in
          Computer Graphics and Human-Computer Interaction. Proficient in Mixed
          Reality technologies and UX principles applied to interactive
          environments.
        </p>
        <div className="flex flex-row gap-1 animate-in">
          <Button
            url="https://www.linkedin.com/in/luciano-aguirre-jesfen/"
            label="LinkedIn"
          >
            <img
              src={LinkedInButton}
              alt="LinkedIn"
              className="w-full h-full"
            />
          </Button>
          <Button url="https://github.com/lajesfen" label="GitHub">
            <img src={GitHubButton} alt="GitHub" className="w-full h-full" />
          </Button>
          <Button url="mailto:lajesfen@gmail.com" label="Email">
            <img src={EmailButton} alt="Email" className="w-full h-full" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-3">
        <h2 className="font-medium text-base animate-in">Projects</h2>
        <div className="flex flex-col gap-1 overflow-auto pb-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer flex flex-row gap-3 items-center p-2 pr-4 rounded-lg animate-in"
              onClick={() => navigate(project.path)}
            >
              <img
                src={"../assets/icons/" + project.image_url}
                alt={project.title}
                className="w-11 h-11 select-none shadow-md shrink-0 rounded-lg border-2 border-white group-hover:translate-x-1 transition-transform duration-200"
                style={{
                  transform: `rotate(${getRotation()}deg)`,
                }}
              />
              <div className="w-full justify-between flex items-center">
                <h2 className="font-medium text-base group-hover:translate-x-1 transition-transform duration-200">
                  {project.title}
                </h2>
                <p className="text-xs">{formatDate(new Date(project.date))}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
