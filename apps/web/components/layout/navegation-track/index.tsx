"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useNavigationStore } from "@/stores/navegation.store";

export function NavigationTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addRoute = useNavigationStore((state) => state.addRoute);

  useEffect(() => {
    addRoute({
      pathname,
      search: searchParams.toString(),
    });
  }, [pathname, searchParams, addRoute]);

  return null;
}