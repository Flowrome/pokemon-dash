import classNames from "classnames";
import { Roboto } from "@next/font/google";
import { GetServerSidePropsContext } from "next";

import Pokedex from "./../../components/pokedex/pokedex";
import { ModelResponseGet as ModelDashboard } from "../api/dashboard/methods/get";
// import { ModelResponseGet as ModelDashboard } from "../api/dashboard/get";
import 'bootstrap/dist/css/bootstrap.css';
import { ModelResponseGet as ModelTypes} from "../api/types/methods/get";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const baseUrl = (req.headers.referer || "").split("/").splice(0, 3).join("/");
  const [dashboardRes, typesRes] = await Promise.all([
    fetch(`${baseUrl || process.env.BASEURL_API}/api/dashboard`), 
    fetch(`${baseUrl || process.env.BASEURL_API}/api/types`), 
  ]);
  const [dashboard, types] = await Promise.all([
    dashboardRes.json(), 
    typesRes.json()
  ]);
  return { props: { dashboard, types } };
};

export const getServerSideTypes = async ({
  req,
}: GetServerSidePropsContext) => {
  const baseUrl = (req.headers.referer || "").split("/").splice(0, 3).join("/");
  const data = await fetch(`/api/types`).then((res) => res.json());
  return {
    props: {
      apiTypesData: data,
    },
  };
};

interface HomeModel {
  dashboard: ModelDashboard;
  types: ModelTypes;
}

export default function Home({ dashboard, types }: HomeModel) {
  return (
    <div className={classNames({ [roboto.className]: true })}>
      <Pokedex results={dashboard.results} types={types} />
    </div>
  );
}
