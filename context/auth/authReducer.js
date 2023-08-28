import {
  USUARIO_AUTENTICADO,
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LOGIN_EXITOSO:
      localStorage.setItem("rns-token", action.payload);
      return {
        ...state,
        autenticado: true,
      };

    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
      };
    case CERRAR_SESION:
      localStorage.removeItem("rns-token");
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: null,
      };

    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };

    default:
      return state;
  }
};
