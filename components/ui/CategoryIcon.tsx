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
        <Link 
            href={`/order/${category.slug}`} 
            className={`${params.category === category.slug ? "bg-amber-400 text-white" : ""} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="w-16 h-16 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt="Category Image"
                />
            </div>
            <div className="text-xl font-bold">{category.name}</div>
        </Link>
    )
}
