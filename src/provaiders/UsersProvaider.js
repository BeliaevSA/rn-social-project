import { createContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const UsersContext = createContext();

export const UsersProvaider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UsersContext.Provider
      value={{
        userData,
        setUserData,
        getUser: async userId => {
          try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const response = docSnap.data();
              setUserData(response);
              return response;
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.log(`getUser: ${error}`);
          }
        },
      }}>
      {children}
    </UsersContext.Provider>
  );
};
