import React, { useReducer } from "react";
import {
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS,
} from "../../types";

import appContext from "./appContext";

import appReducer from "./appReducer";

import clienteAxios from "../../config/axios";

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: null,
    nombre: "",
    nombre_original: "",
    cargando: null,
    descargas: 1,
    password: "",
    autor: null,
    url: "",
  };

  // Crear dispatch y state
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Mostrar una alerta
  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  // Sube los archivos al servidor
  const subirArchivo = async (formData, nombreArchivo) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });

    try {
      const resultado = await clienteAxios.post("/api/archivos", formData);
      console.log(resultado.data);
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Crear enlace
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };

    console.log(data);

    try {
      const resultado = await clienteAxios.post("/api/enlaces", data);
      console.log(resultado.data.msg);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE,
    });
  };

  // Agragar password
  const agregarPassword = (password) => {
    console.log(password);
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password,
    });
  };

  // Agregar un número de descargas
  const agregarDescargas = (descargas) => {
    dispatch({
      type: AGREGAR_DESCARGAS,
      payload: descargas,
    });
  };

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
        agregarPassword,
        agregarDescargas,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
