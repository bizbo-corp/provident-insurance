import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Hero as HeroData } from "@/content/types";

export function Hero({ hero }: { hero: HeroData }) {
  return (
    <div className="relative">
      <Image src={hero.image} alt="" width={1440} height={680} priority className="w-full" />
      <div className="relative w-full lg:absolute lg:inset-0 lg:z-20 lg:flex lg:items-center">
        <div className="mx-0 lg:container lg:mx-auto lg:p-8">
          <div className="mb-4 w-auto rounded-br-hero bg-primary p-8 lg:max-w-xl">
            <h1 className="text-2xl font-bold text-white md:text-5xl">{hero.title}</h1>
            <div className="mt-4 whitespace-pre-wrap text-white">{hero.subtitle}</div>
            <div className="mt-8">
              <Button asChild variant="white" size="wide" className="sm:mr-2">
                <Link href={hero.ctaHref}>{hero.ctaLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
