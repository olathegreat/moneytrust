import { Button } from "./ui/button";

import { liveMarketDataArray } from "../helpers/Data";

const FooterNav = () => {
  return (
    <div className="fixed shadow shadow-gray-100 flex gap-8 text-black/80 bottom-0 w-full bg-white">
      <Button className="text-white flex  items-center h-30 rounded-none bg-black/80 hover:bg-black/60 transition-all duration-300">Live Market</Button>

      <div className="flex h-fit gap-12 w-fit overflow-x-scroll custom-scrollbar  text-black/80">
        {liveMarketDataArray.map((data, index) => (
          <div key={index} className="flex text-[13px] my-2 flex-col items-start">
            <div className="flex text-nowrap">
              {data.name} {data.code}
            </div>
            <div className="text-black/80">{data.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterNav;
