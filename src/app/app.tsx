import { AppLoader } from "./app-loader";
import { AppRouter } from "./app-router";
import { AppProvider } from "./app-provider";

export function App() {
  return (
    <AppProvider>
      <AppLoader>
        <AppRouter />
      </AppLoader>
    </AppProvider>
  );
}
