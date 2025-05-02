import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import ProductsPagination from '../../../components/products/ProductsPagination';
import { redirect } from "next/navigation";

async function productCount() {
    return await prisma.product.count()
}


async function getProducts (page: number, pageSize: number) {
    const skip = (page - 1) * pageSize

    const products = await prisma.product.findMany({
        take: pageSize,
        skip,
        include: {
            category: true
            }
        })
    return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams}: {  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) {
    const { page = "1" } = await searchParams;
    const currentPage = parseInt(page as string, 10) || 1;
    const pageSize = 10

    if (currentPage < 1) redirect("/admin/products")
    
    const productsData = getProducts( currentPage, pageSize )
    const totalProductsData = productCount()
    const [ products, totalProducts ] = await Promise.all([productsData, totalProductsData])
    const totalPages = Math.ceil(totalProducts / 10)
    
    if (currentPage > totalPages) redirect("/admin/products")
    
    return (
        <>
            <Heading>Administrar Productos</Heading>
            <ProductTable 
                products={products}
            />
            <ProductsPagination 
                page={currentPage}
                totalPages={totalPages}
            />             
        </>
    )
}
