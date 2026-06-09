import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

gsap.registerPlugin(useGSAP);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/:project" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
}
