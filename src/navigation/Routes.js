import { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import { AuthContext } from "../provaiders/AuthProvider";

import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";

export const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  // const auth = getAuth();

  const onAuthStateChangedValue = user => {
    setUser(user);
    if (initializing) setInitializing(false);
    return initializing;
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(
      auth,
      onAuthStateChangedValue
    );
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
