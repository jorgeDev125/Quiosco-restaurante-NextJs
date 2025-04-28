import { formatCurrency } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"

type ProductCardProps = {
    product: Product
}


export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className=" bg-white">
                <Image
                    width={458}
                    height={500}
                    src={`/products/${product.image}.jpg`}
                    alt={`Imagen producto ${product.name}`}
                />
            
            <div className="p-5">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-600">{formatCurrency(product.price)}</p>
                <button 
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    type="button"
                >Agregar</button>
            </div>
        </div>
    )
}
