import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/" legacyBehavior>
        <img src="/img/logo.svg" className="w-64 mb-8 md:mb-0" />
      </Link>

      <div>
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
      </div>
    </header>
  );
};

export default Header;
