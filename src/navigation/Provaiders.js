import { AuthProvider } from "../provaiders/AuthProvider";
import { UsersProvaider } from "../provaiders/UsersProvaider";
import { Routes } from "./Routes";

export const Provaiders = () => {
  return (
    <AuthProvider>
      <UsersProvaider>
        <Routes />
      </UsersProvaider>
    </AuthProvider>
  );
};
