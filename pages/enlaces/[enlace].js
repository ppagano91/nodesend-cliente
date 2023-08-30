import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import React, { useState } from "react";

export async function getServerSideProps({ params }) {
  const { enlace } = params;

  console.log("enlace: ", enlace);

  const enlaces = await clienteAxios.get(`/api/enlaces/${enlace}`);

  return {
    props: {
      enlace: enlaces.data,
    },
  };
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

export default function Enlace({ enlace }) {
  const [tienePassword, setTienePassword] = useState(enlace.password);

  console.log("tienePassword: ", tienePassword);

  const verificarPassword = async (e) => {
    e.preventDefault();
    // const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, {
    //   password: e.target.password.value,
    // });

    console.log("Verificando...");
  };

  // console.log(enlace);
  return (
    <Layout>
      {tienePassword ? (
        <>
          <p className="text-center">
            Este enlace está protegido por un password, colócalo a continuación
          </p>
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
