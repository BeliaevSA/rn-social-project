import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (auth, email, password) => {
          try {
            await signInWithEmailAndPassword(
              auth,
              email,
              password
            ).then(userCredential => {
              setUser(userCredential.user);
            });
          } catch (error) {
            console.log(`login: ${error}`);
          }
        },
        register: async (auth, email, password) => {
          try {
            await createUserWithEmailAndPassword(
              auth,
              email,
              password
            ).then(userCredential => {
              setUser(userCredential.user);
            });
          } catch (error) {
            console.log(`register: ${error}`);
          }
        },
        logout: async auth => {
          try {
            await signOut(auth).then(() => {
              setUser(null);
            });
          } catch (error) {
            console.log(`logout: ${error}`);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
