import { Button } from "./ui/button"

const BuyContainer = ({buyFunction, productArray}:any) => {
  return (
    <div className="bg-white  flex-1  h-[352px] flex flex-col  overflow-y-hidden ">


        <div className=" px-4 border-b-gray-100 border-b flex h-[40px]  tracking-wide text-gray-500 justify-between items-center">
            <div className="w-[180px] text-[13px]">
               Product
            </div>

            <div className="
        
             w-[120px] text-[13px]
            ">
                Quantity
            </div>

            <div className=" text-[13px]">
                Bid price
            </div>

            <div className="w-[120px] h-[13px]">

            </div>


        </div>

        <div className="flex  flex-col overflow-y-scroll custom-scrollbar overflow-x-scroll sm:overflow-x-hidden flex-grow">

        
        {
            productArray.map((product:any)=>(
                <div key={product.id} className=" py-1 flex text-gray-800  cursor-pointer  items-center border-b-[1px] border-gray-100">
                    <div className="flex w-full justify-between items-center hover:bg-gray-100 p-1 px-4 ">

            <div className="w-[180px] tracking-wide font-medium text-[14px]">
               {product.product + "(" + product.code + ")" }
            </div>

            <div className="
            text-gray-800 tracking-wide
             w-[120px] font-medium text-[14px]
            ">
                {product.quantity}
            </div>

            <div className="text-green-700 tracking-wide font-medium text-[14px] w-[80px]">
                {product.price}
            </div>

            <Button onClick={buyFunction} className="ml-5 bg-transparent active:bg-none active:text-green-400 hover:bg-transparent hover:text-green-400 transition-all duration-300 text-[14px] shadow-none border border-green-700 text-green-700">
                Buy 
            </Button>


        </div> 
        </div>
            ))
        }

</div>

    </div>
  )
}

export default BuyContainer