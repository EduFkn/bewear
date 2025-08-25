"use client";


import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";

import { getCart } from "@/actions/get-carts";
import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";

import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";


export const Cart = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: cart, isPending: cartIsLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">

          <div className="flex h-full max-w-full flex-col overflow-hidden">
            <ScrollArea className="h-full" >
              <div className="flex h-full flex-col gap-8">
                {cart?.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productName={item.productVariant.product.name}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          {cart?.items && cart?.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />

              <div className="flex items-center justify-between text-sm font-medium">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceCents ?? 0)}</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm font-medium">
                <p>Entrega</p>
                <p>Grátis</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm font-medium">
                <p>Total</p>
                <p>{formatCentsToBRL(cart?.totalPriceCents ?? 0)}</p>
              </div>

              <Button className="rounded-full mt-5">Finalizar Compra</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

