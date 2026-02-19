import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProjectPage } from "./pages/ProjectPage";

gsap.registerPlugin(useGSAP);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projectPath" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
