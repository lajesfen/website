import { useNavigate } from "react-router-dom";
import EmailButton from "../assets/email-button.webp";
import GitHubButton from "../assets/github-button.webp";
import LinkedInButton from "../assets/linkedin-button.webp";
import { Button } from "../components/Button";
import projects from "../data/projects.json";
import { formatDate } from "../utils/date";

export function SimpleHome() {
  const getRotation = () => Math.random() * 20 - 10;
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl h-screen flex flex-col items-center justify-center p-6">
      <div className="flex flex-col gap-4 mb-10">
        <p>
          Experienced in Full-Stack Development, with a strong interest in
          Computer Graphics and Human-Computer Interaction. Proficient in Mixed
          Reality technologies and UX principles applied to interactive
          environments.
        </p>
        <div className="flex flex-row gap-1">
          <Button url="https://linkedin.com" label="LinkedIn">
            <img
              src={LinkedInButton}
              alt="LinkedIn"
              className="w-full h-full"
            />
          </Button>
          <Button url="https://github.com" label="GitHub">
            <img src={GitHubButton} alt="GitHub" className="w-full h-full" />
          </Button>
          <Button url="https://linkedin.com" label="Email">
            <img src={EmailButton} alt="Email" className="w-full h-full" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full gap-3">
        <h2 className="font-medium text-base">Projects</h2>
        <div className="flex flex-col gap-1 overflow-auto pb-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer flex flex-row gap-3 items-center p-2 pr-4 rounded-lg"
              onClick={() => navigate(project.path)}
            >
              <img
                src={"../assets/" + project.image_url}
                alt={project.title}
                className="w-11 h-11 select-none shrink-0 rounded-lg border-2 border-white group-hover:translate-x-1 transition-transform duration-200"
                style={{
                  transform: `rotate(${getRotation()}deg)`,
                  filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.25))",
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
