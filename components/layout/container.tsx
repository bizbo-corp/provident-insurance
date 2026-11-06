import { cn } from "@/lib/utils";

/** The site-wide content width. Use this rather than repeating `container mx-auto`. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("container mx-auto", className)} {...props} />;
}
