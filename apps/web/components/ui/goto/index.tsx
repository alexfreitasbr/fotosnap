import Link from "next/link";

type GotoProps = {
    href: string;
    children: React.ReactNode;
}

export function GoTo({ href, children }: GotoProps) {
  return (
    <Link href={href} className="text-primary hover:text-primary/70 transition-colors duration-300">
      {children}
    </Link>
  );
}