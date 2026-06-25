import Link from "next/link";

type GotoProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function GoTo({ href, children, className }: GotoProps) {
  return (
      <Link
        href={href}
        className={`hover:opacity-70 transition-colors duration-300 ${className}`}
      >
        {children}
      </Link>
  );
}
