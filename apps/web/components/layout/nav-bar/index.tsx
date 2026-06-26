"use client";

import { LoginLogout } from "@/components/layout/login-logout";
import { Button } from "@/components/ui/button";
import { GoTo } from "@/components/ui/goto";
import { NAVIGATION_ITEMS } from "@/core/navigation/navigation";
import { useLanguageStore } from "@/stores/language.store";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useNavigationStore } from "@/stores/navegation.store";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguageStore();
  const pathname = usePathname();
  const user = useAuthSession();
  const currentRoute = useNavigationStore((state) => state.currentRoute);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Inicializa com undefined para evitar incompatibilidade entre SSR (servidor) e Client
  const [windowWidth, setWindowWidth] = useState<number>(700);

  useEffect(() => {
    // Função que atualiza o estado com a largura atual
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Define o tamanho inicial assim que o componente monta no cliente
    handleResize();

    // Adiciona o listener para o evento de resize
    window.addEventListener("resize", handleResize);

    // Limpa o listener quando o componente sai da tela
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItemsRender = NAVIGATION_ITEMS.map((item) => {
    if (item.disabled && !user) {
      return null;
    }
    return(
    <GoTo
      key={item.id}
      className={`flex items-center justify-center rounded-md  bg-transparent ${isMenuOpen || windowWidth <= 640 ? "aspect-square bg-white" : "bg-transparent"} ${currentRoute?.pathname === item.href ? "text-blue-500" : ""}`}
      href={item.href}
      aria-label={language.navigation[item.id]}
      test-id={item.id}
    >
      <li
        className={`font-semibold ${isMenuOpen || windowWidth <= 640 ? " text-2xl" : "text-lg whitespace-nowrap"}`}
      >
        {language.navigation[item.id]}
      </li>
    </GoTo>
  )});

  return (
    <>
      <nav
        className="flex w-full pr-14 gap-4 justify-between items-center "
        aria-label="Menu Principal"
        test-id="navbar"
      >
        <Button
          variant="ghost"
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
        {!isMenuOpen || windowWidth > 640 ? (
          <ul className="hidden w-full gap-4 sm:flex">{menuItemsRender}</ul>
        ) : (
          <ul className="grid grid-cols-2 gap-4 p-4 sm:hidden bg-gray-500 fixed top-[68px] left-0 right-0 bottom-0 content-start overflow-y-auto z-10">
            {menuItemsRender}
          </ul>
        )}
        <LoginLogout />
      </nav>  
    </>
  );
}
