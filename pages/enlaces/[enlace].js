import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";

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
  console.log(enlace);
  return (
    <Layout>
      <h1>Desde [url].js</h1>
    </Layout>
  );
}
