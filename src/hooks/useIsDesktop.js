import { useSyncExternalStore } from "react";

// نفس نقطة الكسر lg في Tailwind (1024px)
const query = "(min-width: 1024px)";

const subscribe = (callback) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export const useIsDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true,
  );
