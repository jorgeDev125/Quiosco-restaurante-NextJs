import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(seacrhTerm: string) {
    const products = await prisma.product.findMany({
        where: {
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

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) {
    const { search } = await searchParams
    const products = await searchProducts(search as string)
    return (
        <>
            <Heading>Resultados de la busqueda: {search}</Heading>
            <GoBackButton />
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
                <ProductSearchForm />
            </div>
            {products.length ? (
                <ProductTable
                    products={products}
                />
            ) : <p className="text-center text-lg">No hay resultados</p>}
        </>
    )
}
