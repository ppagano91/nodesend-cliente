import React from "react";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>React NodeSend</title>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <img src="/img/logo.svg" className="w-64 mb-8 mx-auto" />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <main className="mt-20">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
