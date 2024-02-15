import { FC } from "react"
import TransactionForm from "../components/TransactionForm"


const Transactions:FC = () => {
  return (<>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
            {/* add form */}
            <div className="grid col-span-2">
              <TransactionForm/>
            </div>


            {/* statictic */}
            <div className="rounded-md bg-slate-800 p-3">
                <div className="grid grid-cols-2 gap-3">
                  <div >
                    <p className="uppercase text-md text-center font-bold" >Total income: </p>
                    <p className="bg-green-600 p-1 rounded-sm text-center"> 1000$</p>
                  </div>
                  <div >
                    <p className="uppercase text-md text-center font-bold" >Total expense: </p>
                    <p className="bg-red-600 p-1 rounded-sm text-center"> 1000$</p>
                  </div>
                </div>
                <div className="">график</div>
            </div>
      </div>

      {/* table */}
      <h1 className="my-5">table</h1>
  </>
  )
}

export default Transactions