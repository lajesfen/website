import Desk from "./scenes/Desk";

function App() {
  return (
    <main className="relative">
      <section className="w-full h-screen">
        <Desk />
      </section>
      <footer className="absolute left-1/2 transform -translate-x-1/2 bottom-10 p-4">
        <ul className="flex flex-row gap-3">
          <a
            href="mailto:lajesfen@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./assets/icons/email.svg" width={32} />
          </a>
          <a
            href="https://github.com/lajesfen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./assets/icons/github.svg" width={32} />
          </a>
          <a
            href="https://www.linkedin.com/in/luciano-aguirre-jesfen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./assets/icons/linkedin.svg" width={32} />
          </a>
        </ul>
      </footer>
    </main>
  );
}

export default App;
