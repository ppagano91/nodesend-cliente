import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import React, { useState, useContext } from "react";
import appContext from "../../context/app/appContext";
import Alerta from "../../components/Alerta";

export async function getServerSideProps({ params }) {
  try {
    const { enlace } = params;
    const response = await clienteAxios.get(`/api/enlaces/${enlace}`);
    
    return {
      props: {
        enlace: response.data,
        error: null
      },
    };
  } catch (error) {

    return {
      props: {
        enlace: null,
        error: {
          statusCode: error.response?.status || 500,
          message: error.response?.data?.msg || "Error al obtener el enlace"
        }
      },
    };
  }
}

export async function getServerSidePaths() {
  const enlaces = await clienteAxios.get("/api/enlaces");

  return {
    paths: enlaces.data.enlaces.map((enlace) => ({
      params: { enlace: enlace.url },
    })),
    fallback: false,
  };
}

export default function Enlace({ enlace, error }) {

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-10">
          <h1 className="text-4xl text-center text-red-500 mb-4">
            ¡Error {error.statusCode}!
          </h1>
          <p className="text-center text-gray-700 mb-6">
            {error.message}
          </p>
          <a 
            href="/"
            className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer hover:bg-red-600"
          >
            Volver al inicio
          </a>
        </div>
      </Layout>
    );
  }

  const [tienePassword, setTienePassword] = useState(enlace.password);
  const [password, setPassword] = useState("");

  // Context de la app
  const AppContext = useContext(appContext);
  const { mostrarAlerta, mensaje_archivo } = AppContext;

  const verificarPassword = async (e) => {
    e.preventDefault();

    const data = {
      password,
    };

    try {
      const resultado = await clienteAxios.post(
        `/api/enlaces/${enlace.enlace}`,
        data
      );
      setTienePassword(resultado.data.password);
    } catch (error) {
      mostrarAlerta(error.response.data.msg);
    }
  };

  // console.log(enlace);
  return (
    <Layout>
      {tienePassword ? (
        <>
          <p className="text-center">
            Este enlace está protegido por un password, colócalo a continuación
          </p>
          {mensaje_archivo && <Alerta />}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verificarPassword(e)}
              >
                <div className="mb-4">
                  <label
                    className="block text-black text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="Password del enlace"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                  value="Validar Password"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo:
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
}
