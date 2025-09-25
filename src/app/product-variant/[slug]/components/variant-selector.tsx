"use client"
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
    selectedVariant: string;

    variants: (typeof productVariantTable.$inferSelect)[]
}


const VariantSelector = ({ variants }: VariantSelectorProps) => {
    const { slug } = useParams();
    return (
        <div className="flex items-center gap-4">
            {variants.map((variant) => (
                <Link prefetch={true} href={`/product-variant/${variant.slug}`} key={variant.id}
                    className={slug === variant.slug ? "border-primary border-2 rounded-xl" : ""}
                >
                    <Image
                        quality={100}
                        src={variant.imageUrl}
                        alt={variant.name}
                        width={68}
                        height={68}
                        className="rounded-xl"
                    />
                </Link>
            ))}

        </div>

    );
}

export default VariantSelector;