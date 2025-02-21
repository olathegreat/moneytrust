

const TradeLog = ({ infoArray}:any) => {
  return (
    <div className="bg-white  w-fit lg:w-full  h-[352px] flex flex-col  overflow-y-hidden ">

<div className=" px-4 py-5 border-b-gray-100 border-b flex h-[40px]  tracking-wide text-gray-500  text-[13px] items-center">
    TRADING LOGS
    </div>
        <div className=" px-4 border-b-gray-100 border-b flex h-[40px] justify-between tracking-wide text-gray-500 py-6 items-center">
            <div className="w-[150px] text-[13px]">
               Product
            </div>

            <div className="
        flex justify-center
             w-[60px] text-[13px]
            ">
                Board
            </div>

            <div className="w-[80px] flex justify-center text-[13px]">
                Order Type
            </div>

            <div className="w-[90px] flex justify-center text-[13px]">
                Matched Price
            </div>

            <div className="w-[60px]   flex justify-center text-[13px]">
                Quantity
            </div>

            <div className="w-[80px] flex justify-center text-[13px]">
                Date
            </div>

            <div className="w-[80px]  flex justify-center text-[13px]">
                Time
            </div>


        </div>

        <div className="flex  flex-col overflow-y-scroll custom-scrollbar  flex-grow">

        
        {
            infoArray.map((product:any)=>(
                <div className=" px-2 border-b-gray-100 border-b flex justify-between tracking-wide text-gray-500 py-1 items-center">
                    <div className="flex px-2 py-4 hover:bg-gray-200 cursor-pointer justify-between w-full text-gray-800 font-medium">
                <div className="w-[150px] text-[13px] ">
                   {product.product + "(" + product.code + ")" }
                </div>
    
                <div className="
            flex justify-center
                 w-[60px] text-[13px]
                ">
                    {product.board}
                </div>
    
                <div className="w-[80px] flex justify-center text-[13px]">
                    {product.orderType}
                </div>
    
                <div className="w-[90px] flex justify-center  text-[13px]">
                    {product.price}
                </div>
    
                <div className="w-[60px] flex justify-center text-[13px]">
                 {product.quantity}
                </div>
    
                <div className="w-[100px]  flex justify-center text-[13px]">
                    {product.date}
                </div>
    
                <div className="w-[80px] flex justify-center text-[13px]">
                    {product.time}
                </div>
    
    </div>
            </div>
            ))
        }

</div>

    </div>
  )
}

export default TradeLog