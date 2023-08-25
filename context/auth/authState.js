import React, { useReducer } from "react";
import authContext from "./authContext";

const AuthState = ({ children }) => {
  // Definir un state inicial
  const initialState = {
    token: "",
    auth: null,
    user: null,
    message: null,
  };

  // Definir el reducer
  const [state, dispatch] = useReducer(() => {}, initialState);

  // Funciones
  return (
    <authContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user: state.user,
        message: state.message,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
