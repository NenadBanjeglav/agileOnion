import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost";

type ButtonProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button"; variant?: ButtonVariant })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string; variant?: ButtonVariant });

export function Button({ variant = "primary", as = "button", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200",
    ghost:
      "border border-black/10 bg-transparent text-black hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10",
  };

  const Component = as === "a" ? "a" : "button";

  return <Component className={`${base} ${variants[variant]} ${className}`} {...(props as any)} />;
}
