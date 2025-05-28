import { OrderWithProducts } from "@/src/types"
import { formatCurrency } from '../../src/utils/index';
import { completeOrder } from "@/actions/complete-order-action";
import { useState } from "react";
import { toast } from "react-toastify";


type OrderCardProps = {
    order: OrderWithProducts
}
export default function OrderCard({ order }: OrderCardProps) {
    const [isOrderCompleted, setIsOrderCompleted] = useState(false)
    return (
        <section
            aria-labelledby="summary-heading"
            className={(isOrderCompleted && "hidden") + " flex flex-col justify-between mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4" }
        >
            <div>
                <p className='text-2xl font-medium text-gray-900'>Cliente: {order.name} </p>
                <p className='text-lg font-medium text-gray-900'>Productos Ordenados:</p>
                <dl className="mt-3 space-y-4">
                    {order.orderProducts.map(product => (
                        <div key={product.id} className="flex items-center gap-2 border-t border-gray-200 pt-4">
                            <dt className="flex items-center text-sm text-gray-600"> 
                                <span className="font-black">({product.quantity}) {" "}</span>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">{product.product.name}</dd>
                        </div>
                    ))} 
                </dl>
            </div>
            <div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
                </div>
                <form action={completeOrder}>
                    <input 
                        type="hidden"
                        value={order.id}
                        name="order_id"
                        />
                    <input
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-800 cursor-pointer  text-white w-full mt-5 p-3 uppercase font-bold"
                        value="Marcar Orden Completada"
                        onClick={()=>{
                            setIsOrderCompleted(true)
                            toast.success("Orden completada")
                        } }
                    />
                </form>
            </div>
        </section>
    )
}