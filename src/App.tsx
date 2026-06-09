import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { InteractiveHome } from "./pages/InteractiveHome";
import { Project } from "./pages/Project";
import { SimpleHome } from "./pages/SimpleHome";
import { useUIStore } from "./store/uiStore";

gsap.registerPlugin(useGSAP);

export function App() {
  const interactiveMode = useUIStore((s) => s.interactiveMode);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={interactiveMode ? <InteractiveHome /> : <SimpleHome />}
          />
          <Route path="/:project" element={<Project />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
