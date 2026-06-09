import Project from "../assets/Project.png";

export const Toolbar = () => {
  return (
    <div
      className="fixed top-1/2 right-3 transform -translate-y-1/2 flex flex-col gap-3 p-2 z-20 bg-[#EDEDED] border border-[#DCDCDC] rounded-xl"
      style={{
        boxShadow: "inset 0 2px 4px rgba(255,255,255,0.5)",
      }}
    >
      <img
        src={Project}
        alt="Project"
        className="w-12 h-12 drop-shadow-md cursor-pointer"
      />
      <img
        src={Project}
        alt="Project"
        className="w-12 h-12 drop-shadow-md cursor-pointer"
      />
      <img
        src={Project}
        alt="Project"
        className="w-12 h-12 drop-shadow-md cursor-pointer"
      />
    </div>
  );
};
