import React, { useState, useContext } from "react";
import appContext from "../context/app/appContext";

const Formulario = () => {
  const [tienePassword, setTienePassword] = useState(false);

  // Context de la app
  const AppContext = useContext(appContext);
  const { agregarPassword, agregarDescargas } = AppContext;

  return (
    <div className="w-full mt-20">
      <div>
        <label className="text-lg text-gray-800">Eliminar después de:</label>
        <select
          className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
          onChange={(e) => agregarDescargas(parseInt(e.target.value))}
        >
          <option devalue="">-- Seleccione --</option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800 mr-2">
            Proteger con contraseña
          </label>
          <input
            type="checkbox"
            className="mr-2 mt-1"
            onChange={() => setTienePassword(!tienePassword)}
          />
        </div>
        {tienePassword ? (
          <input
            type="password"
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
            placeholder="Escriba la contraseña"
            onChange={(e) => agregarPassword(e.target.value)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Formulario;
