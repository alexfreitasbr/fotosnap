import { Loader2 } from "lucide-react";

type LoadingProps = {
    text: string;
}

export function Loading({ text }: LoadingProps) {
  return (
    <span className="flex items-center gap-2">
      <Loader2 className="animate-spin" />
      <span>{text}</span>
    </span>
  );
}