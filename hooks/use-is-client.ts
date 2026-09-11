import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const useIsClient = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
