// do not forget to update locales 
export const NAVIGATION_ITEMS = [
  {
    href: "/",
    id: "home",
  },
  {
    href: "/about",
    id: "about",
  },
  {
    href: "/contact",
    id: "contact",
  },
] as const;

export type NavigationItemId = (typeof NAVIGATION_ITEMS)[number]["id"];