import { Check } from "lucide-react";
import { HelpLink } from "@/components/quote/quote-question";
import { addOns, coverTiers, type AddOnId, type CoverTierId } from "@/content/quote";
import { cn } from "@/lib/utils";

export function AddOnCards({
  tier,
  selected,
  onToggle,
}: {
  tier: CoverTierId;
  selected: AddOnId[];
  onToggle: (id: AddOnId) => void;
}) {
  const tierName = coverTiers.find(({ id }) => id === tier)?.name;
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {addOns.map((addOn) => {
        const available = addOn.tiers.includes(tier);
        const isSelected = available && selected.includes(addOn.id);
        return (
          <div
            key={addOn.id}
            className={cn(
              "rounded-xl border p-4",
              isSelected ? "border-quote-accent" : "border-black/15",
              !available && "opacity-60"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base font-bold">{addOn.name}</h3>
              <button
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                aria-label={addOn.name}
                disabled={!available}
                className={cn(
                  "mt-1 flex size-5 shrink-0 items-center justify-center rounded-sm border-2",
                  isSelected ? "border-quote-accent bg-quote-accent text-white" : "border-quote-muted"
                )}
                onClick={() => onToggle(addOn.id)}
              >
                {isSelected && <Check className="size-4" strokeWidth={3} aria-hidden="true" />}
              </button>
            </div>
            <div className="mt-2"><HelpLink label="More details" /></div>
            <p className="mt-2">
              {available ? (
                <>
                  <span className="font-bold">{addOn.price}</span>
                  <span className="text-sm text-quote-muted"> / year</span>
                </>
              ) : (
                <span className="text-sm text-quote-muted">Not available with {tierName} cover</span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
