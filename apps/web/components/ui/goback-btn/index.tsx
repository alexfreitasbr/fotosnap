"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loading } from "../loading";
import { useNavigationStore } from "@/stores/navegation.store";

export default function GoBackBtn() {
  const router = useRouter();

  const hasHydrated = useNavigationStore((state) => state.hasHydrated);
  const previousRoute = useNavigationStore((state) => state.previousRoute);

  if (!hasHydrated) {
    return <Loading text="Verificando..." />;
  }

  const handleClick = () => {
    if (previousRoute) {
      const url = previousRoute.search
        ? `${previousRoute.pathname}?${previousRoute.search}`
        : previousRoute.pathname;

      router.push(url);
    } else {
      router.push("/");
    }
  };

  return (
    <Button onClick={handleClick}>
      {previousRoute
        ? "Voltar para a página anterior"
        : "Ir para a página inicial"}
    </Button>
  );
}