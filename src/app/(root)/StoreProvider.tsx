"use client";
// import { increment } from "@/lib/store/features/counter/countSlice";
import { makeStore, AppStore } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // storeRef.current.dispatch(increment());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
