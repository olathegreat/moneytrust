import { Button } from "./ui/button";

const SubTabs = ({ subTab, setSubTab }: any) => {
  return (
    <div className="flex gap-4 items-center">
      <div
        className={`border-none  font-medium shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  text-black/80`}
      >
        Product
      </div>

      <Button
        onClick={() => setSubTab("All")}
        className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${
          subTab === "All"
            ? "bg-[#d71e0e] text-white"
            : "bg-gray-100/50 text-black/80"
        }`}
      >
        All
      </Button>

      <Button
        onClick={() => setSubTab("SMAZ")}
        className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${
          subTab === "SMAZ"
            ? "bg-[#d71e0e] text-white"
            : "bg-gray-100/50 text-black/80"
        }`}
      >
        SMAZ
      </Button>

      <Button
        onClick={() => setSubTab("SBBS")}
        className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${
          subTab === "SBBS"
            ? "bg-[#d71e0e] text-white"
            : "bg-gray-100/50 text-black/80"
        }`}
      >
        SBBS
      </Button>

      <Button
        onClick={() => setSubTab("SPRL")}
        className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${
          subTab === "SPRL"
            ? "bg-[#d71e0e] text-white"
            : "bg-gray-100/50 text-black/80"
        }`}
      >
        SPRL
      </Button>

      <Button
        onClick={() => setSubTab("SGNG")}
        className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${
          subTab === "SGNG"
            ? "bg-[#d71e0e] text-white"
            : "bg-gray-100/50 text-black/80"
        }`}
      >
        SGNG
      </Button>

      <Button
        onClick={() => setSubTab("SSGM")}
        className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${
          subTab === "SSGM"
            ? "bg-[#d71e0e] text-white"
            : "bg-gray-100/50 text-black/80"
        }`}
      >
        SSGM
      </Button>

      <Button
        onClick={() => setSubTab("FETC")}
        className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${
          subTab === "FETC"
            ? "bg-[#d71e0e] text-white"
            : "bg-gray-100/50 text-black/80"
        }`}
      >
        FETC
      </Button>

      <Button
        onClick={() => setSubTab("SCOC")}
        className={`border-none focus:bg-[#d71e0e] shadow-none hover:opacity-85 duration-300 transition-all rounded-full ease-linear  ${
          subTab === "SCOC"
            ? "bg-[#d71e0e] text-white"
            : "bg-gray-100/50 text-black/80"
        }`}
      >
        SCOC
      </Button>
    </div>
  );
};

export default SubTabs;
