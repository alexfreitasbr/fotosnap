import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NavigationItem = {
  pathname: string;
  search: string;
  timestamp: number;
};

type NavigationStore = {
  history: NavigationItem[];
  currentRoute: NavigationItem | null;
  previousRoute: NavigationItem | null;

  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;

  addRoute: (route: Omit<NavigationItem, "timestamp">) => void;
  clearHistory: () => void;
};

const MAX_HISTORY = 20;

export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set) => ({
      history: [],
      currentRoute: null,
      previousRoute: null,

      hasHydrated: false,

      setHasHydrated: (value) =>
        set({
          hasHydrated: value,
        }),

      addRoute: (route) =>
        set((state) => {
          const current: NavigationItem = {
            ...route,
            timestamp: Date.now(),
          };

          // Evita registrar a mesma rota consecutivamente
          if (
            state.currentRoute?.pathname === current.pathname &&
            state.currentRoute?.search === current.search
          ) {
            return state;
          }

          const history = [...state.history, current].slice(-MAX_HISTORY);

          return {
            history,
            currentRoute: current,
            previousRoute: history.at(-2) ?? null,
          };
        }),

      clearHistory: () =>
        set({
          history: [],
          currentRoute: null,
          previousRoute: null,
        }),
    }),
    {
      name: "navigation-history",

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);