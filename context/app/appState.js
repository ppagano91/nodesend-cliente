import React, { useReducer } from "react";
import {
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
} from "../../types";

import appContext from "./appContext";

import appReducer from "./appReducer";

import clienteAxios from "../../config/axios";

const AppState = ({ children }) => {
  return <appContext.Provider value={{}}>{children}</appContext.Provider>;
};

export default AppState;
