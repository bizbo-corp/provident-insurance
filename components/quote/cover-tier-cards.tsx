import { CheckCircle2 } from "lucide-react";
import { QuoteButton } from "@/components/quote/quote-question";
import { coverTiers, type CoverTierId } from "@/content/quote";
import { cn } from "@/lib/utils";

export function CoverTierCards({
  selected,
  onSelect,
}: {
  selected: CoverTierId;
  onSelect: (tier: CoverTierId) => void;
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {coverTiers.map((tier) => {
        const isSelected = tier.id === selected;
        return (
          <div
            key={tier.id}
            className={cn(
              "relative flex flex-col rounded-xl border p-4",
              isSelected ? "border-2 border-quote-accent bg-quote-notice" : "border-black/15"
            )}
          >
            {tier.popular && (
              <span className="absolute -top-2.5 left-4 rounded-full bg-quote-accent px-3 py-0.5 text-xs font-bold text-white">
                Most Popular
              </span>
            )}
            <h3 className="min-h-13 text-lg leading-tight font-bold">{tier.name}</h3>
            <p className="text-sm text-quote-muted">{tier.tagline}</p>
            <p className="mt-6">
              <span className="text-2xl font-bold">{tier.dollars}</span>
              <span className="font-bold">{tier.cents}</span>
              <span className="text-sm text-quote-muted"> / year</span>
            </p>
            <p className="text-sm text-quote-muted">{tier.instalments}</p>
            <p className="mt-3 text-sm text-quote-muted">{tier.description}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {tier.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2">
                  <CheckCircle2 className="size-5 shrink-0 text-quote-success" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
            {tier.footnote && <p className="mt-3 text-sm text-quote-muted italic">{tier.footnote}</p>}
            <div className="mt-auto pt-4">
              <QuoteButton
                variant={isSelected ? "selected" : "select"}
                aria-pressed={isSelected}
                onClick={() => onSelect(tier.id)}
              >
                {isSelected ? "Selected" : "Select this cover"}
              </QuoteButton>
            </div>
          </div>
        );
      })}
    </div>
  );
}
