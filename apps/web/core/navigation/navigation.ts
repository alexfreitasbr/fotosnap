// do not forget to update locales 
export const NAVIGATION_ITEMS = [
  {
    href: "/",
    id: "home",
    disabled: false,
  },
  {
    href: "/about",
    id: "about",
    disabled: false,
  },
  {
    href: "/contact",
    id: "contact",
    disabled: false,
  },
  {
    href: "/dashboard",
    id: "dashboard",
    disabled: true,
  },
  {
    href: "/gallery",
    id: "gallery",
    disabled: true,
  },
] as const;

export type NavigationItemId = (typeof NAVIGATION_ITEMS)[number]["id"];