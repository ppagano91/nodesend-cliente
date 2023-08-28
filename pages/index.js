import React, { useEffect, useContext } from "react";
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";
import Link from "next/link";
import Dropzone from "../components/Dropzone";

export default function Home() {
  // Extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          <Dropzone />
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <p className="text-4xl font-bold font-sans text-gray-800">
              Compartir archivos de forma sencilla y privada
            </p>
            <p className="text-lg mt-5 leading-loose">
              <span className="text-red-500 font-bold">ReactNodeSend</span> te
              permite compartir archivos con cifrado de extremo a extremo y un
              archivo que es eliminado despues de ser descargado. Asi que puedes
              mantener lo que compartes en privado y asegurarte de que tus cosas
              no permanezcan en linea para siempre.
            </p>
            <Link href="/crearcuenta" legacyBehavior>
              <a className="text-red-500 font-bold text-lg hover:text-red-700">
                Crea una cuenta para mayores beneficios
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
