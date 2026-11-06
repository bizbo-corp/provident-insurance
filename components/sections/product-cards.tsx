import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/layout/reveal";
import type { ProductCard } from "@/content/types";

export function ProductCards({ title, products }: { title: string; products: ProductCard[] }) {
  return (
    <Container className="my-12 md:my-24">
      <Reveal>
        <h2 className="section-heading pb-0 sm:pb-8">{title}</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {products.map((product) => (
            <a key={product.title} href={product.href} className="rounded-card no-underline shadow-md">
              <figure>
                <Image src={product.image} alt="" width={600} height={300} className="w-full" />
              </figure>
              <div className="p-8">
                <h2 className="pb-4 text-lg font-bold md:text-2xl">{product.title}</h2>
                <p>{product.body}</p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
