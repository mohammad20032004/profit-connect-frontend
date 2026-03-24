"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/features/store";
import AuthBootstrap from "@/components/AuthBootstrap";

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      {children}
    </Provider>
  );
}
