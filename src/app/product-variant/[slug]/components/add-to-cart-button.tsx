"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

interface addToCartProductProps {
    productVariantId: string,
    quantity: number,
}

const AddToCartButton = ({ productVariantId, quantity }: addToCartProductProps) => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["addProductToCart", productVariantId, quantity],
        mutationFn: () => addProductToCart({
            productVariantId,
            quantity,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        }
    })
    return (

        <Button
            onClick={() => mutate()}
            variant="outline" disabled={isPending} className="rounded-full" size="lg">
            {isPending && (
                <Loader2 className="animate-spin" />
            )}
            Adicionar á Sacola
        </Button>
    );
}

export default AddToCartButton;