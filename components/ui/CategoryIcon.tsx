"use client"
import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"


type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {
    const params = useParams<{category: string}>()
    return (
        <div className={`${params.category === category.slug ? "bg-amber-600 text-white" : ""} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}>

            <div className="w-16 h-16 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt="Category Image"
                />
            </div>
            <Link 
                className="text-xl font-bold"
                href={`/order/${category.slug}`}
            >{category.name}</Link>
        </div>
    )
}
