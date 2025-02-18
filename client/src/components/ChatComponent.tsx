import { IoChatbubbleEllipsesOutline } from "react-icons/io5";


const ChatComponent = () => {
  return (
    <div className="fixed flex top-[80vh] group  right-2 sm:right-10 w-fit group p-4 gap-4">
     

      <div className=" relative hidden transition-all duration-300 group-hover:flex  flex-col bg-none border-2 border-[#D71e0e] bg-white cursor-pointer text-black/80 p-2 sm:p-4 rounded-lg max-w-xs text-[10px] sm:text-sm">
        <p className="font-medium ">Hi, I'm Amanda</p>
        <p >How may I help you?</p>
        <div className="absolute -right-[6px] sm:-right-[8px] top-[10px] sm:top-[20px] rotate-45 w-2 h-2 sm:w-3 sm:h-3 bg-white border-r-2 border-t-2 border-[#D71e0e]"></div>
      </div>
      <div className="bg-[#D71E0E] h-12 w-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white">
        <IoChatbubbleEllipsesOutline className="text-3xl sm:text-5xl" />
      </div>

      {/* <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <div className="bg-[#D71E0E] w-16 h-16 rounded-full flex items-center justify-center text-white">
              <IoChatbubbleEllipsesOutline className="text-3xl" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="relative border-2 border-[#D71e0e] text-black/80 p-4 rounded-lg max-w-xs">
              <p className="font-medium text-sm">Hi, I'm Amanda</p>
              <p className="text-sm">How may I help you?</p>
              <div className="absolute right-0 top-1/2 translate-x-1 w-4 h-2 bg-white border-r-2 border-t-2 border-[#D71e0e]"></div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> */}
    </div>
  );
};

export default ChatComponent;
