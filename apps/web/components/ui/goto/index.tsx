import Link from "next/link";
import { Button } from "../button";

type GotoProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function GoTo({ href, children, className }: GotoProps) {
  return (
    <Button
      type="button"
      variant="link"
      className={`h-auto p-0 hover:no-underline ${className}`}
      aria-expanded="false" 
    >
      <Link
        href={href}
        className="hover:opacity-70 transition-colors duration-300"
      >
        {children}
      </Link>
    </Button>
  );
}
