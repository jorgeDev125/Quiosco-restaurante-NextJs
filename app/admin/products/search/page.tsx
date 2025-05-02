import ProductSearch from "@/components/products/ProductSearch";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts (seacrhTerm: string) {
    const products = await prisma.product.findMany({
        where:{
            name: {
                contains: seacrhTerm,
                mode: "insensitive"
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({searchParams} : {  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) {
    const { search } = await searchParams
    const products = await searchProducts(search as string)
  return (
    <>
        <Heading>Resultados de la busqueda: {search}</Heading>
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
            <ProductSearch />
        </div>
        {products.length ? (
            <ProductTable 
                products={products}
            />
        ) : <p className="text-center text-lg">No hay resultados</p>}
    </>
  )
}
