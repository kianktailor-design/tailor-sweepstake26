import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Minimal stand-in for shadcn/ui Button: keeps the same API (variant + className)
// the app already uses, without pulling in the full shadcn toolchain.
export function Button({ className, variant = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  return <button className={cn(base, className)} {...props} />;
}
