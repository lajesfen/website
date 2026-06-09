import Project from "../assets/Project.png";

export const Toolbar = () => {
  return (
    <div
      className="fixed flex flex-col gap-3 p-2 z-20 bg-[#EDEDED] border border-[#DCDCDC] rounded-xl"
      style={{
        top: "50%",
        right: "0",
        transform: "translate(0, -50%)",
        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)",
      }}
    >
      <img src={Project} alt="Project" className="w-12 h-12 drop-shadow-md cursor-pointer" />
      <img src={Project} alt="Project" className="w-12 h-12 drop-shadow-md cursor-pointer" />
      <img src={Project} alt="Project" className="w-12 h-12 drop-shadow-md cursor-pointer" />
    </div>
  );
};
