import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

import {
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
} from "../../types";

import clienteAxios from "../../config/axios";

const AuthState = ({ children }) => {
  // Definir un state inicial
  const initialState = {
    token:
      typeof window !== "undefined" ? localStorage.getItem("rns-token") : "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  // Definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Registrar nuevos usuarios
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      console.log(respuesta);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }

    // Limpia la alerta despues de 3 segundos
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  // Autenticar Usuarios
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token,
      });

      console.log(respuesta);
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });

      // Limpia la alerta despues de 3 segundos
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALERTA,
        });
      }, 3000);
    }
  };

  // Usuario autenticado
  const usuarioAutenticado = (nombre) => {
    dispatch({
      type: USUARIO_AUTENTICADO,
      payload: nombre,
    });
  };

  // Funciones
  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        usuarioAutenticado,
        iniciarSesion,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
