import React, { useEffect, useContext } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";

const Header = () => {
  // Extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/" legacyBehavior>
        <img src="/img/logo.svg" className="w-64 mb-8 md:mb-0" />
      </Link>

      <div>
        {usuario ? (
          <div className="flex items-center">
            <p className="mr-2">
              Hola <strong>{usuario.nombre}!</strong>
            </p>
            <button
              type="button"
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
              onClick={() => cerrarSesion()}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <Link href="/" legacyBehavior>
              <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase m-1">
                Home
              </a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase m-1">
                Login
              </a>
            </Link>
            <Link href="/create-account" legacyBehavior>
              <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase m-1">
                Crear Cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
