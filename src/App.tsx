import Project, { type ProjectProps } from "./components/Project";

const data: ProjectProps[] = [];

function App() {
  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="max-w-2xl px-8 mt-[25vh] mb-[10vh]">
        <div className="fixed top-0 left-0 w-full h-[16vh] bg-linear-to-b from-[#FAF9F6] to-[#FAF9F6]/20 z-10 pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 w-full h-[16vh] bg-linear-to-t from-[#FAF9F6] to-[#FAF9F6]/0 z-10 pointer-events-none"></div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 text-pretty">
            <p>Hi,</p>
            <p>
              I'm Luciano, a Computer Science student based in Lima-Peru, with a
              strong interest in Web Development. I enjoy building interactive,
              engaging experiences that blend creativity with technology.
            </p>
            <p>
              Before focusing fully on software, I worked as a 3D Art Lead at a
              game company, where I led a small team and collaborated closely
              with developers on in-game content for live events. More recently,
              I worked as a teaching assistant at my university, helping
              students build VR applications.
            </p>
            <p>
              I'm always learning, building, and experimenting with new ideas.
              Mostly for fun, sometimes for something bigger.
            </p>
            <p>
              @{" "}
              <a
                className="underline"
                href="https://github.com/lajesfen"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              ,{" "}
              <a
                className="underline"
                href="https://linkedin.com/in/luciano-aguirre-jesfen"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{" "}
              or{" "}
              <a
                className="underline"
                href="mailto:lajesfen@gmail.com"
                target="_blank"
              >
                Email
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p>My recent work...</p>
            {data.length > 0 ? (
              Array.from(data).map((project, i) => (
                <Project
                  key={i}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  url={project.url}
                  date={project.date}
                />
              ))
            ) : (
              <p>🐌 -Nothing here... yet</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
