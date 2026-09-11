import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True only after client hydration; avoids SSR/client markup mismatches. */
export const useIsClient = () =>
  useSyncExternalStore(emptySubscribe, () => true, () => false);
