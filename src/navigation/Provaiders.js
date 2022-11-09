import { AuthProvider } from "./AuthProvider";
import { Routes } from "./Routes";

export const Provaiders = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
