import { AbilityProvider } from "@/features/auth";
import { ComposeChildren } from "@/shared/lib/react";
import { Confirmations } from "@/widgets/confirmations";
import { Provider } from "react-redux";
import { store } from "@/shared/lib/redux";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <Provider store={store} children={null} />
      <Confirmations />
      <AbilityProvider />
      {children}
    </ComposeChildren>
  );
}
