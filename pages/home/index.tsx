import classNames from "classnames";
import { Roboto } from "@next/font/google";
import { GetServerSidePropsContext } from "next";

import Pokedex from "./../../components/pokedex/pokedex";
import { ModelResponseGet as ModelDashboard } from "../api/dashboard/methods/get";
// import { ModelResponseGet as ModelDashboard } from "../api/dashboard/get";
import 'bootstrap/dist/css/bootstrap.css';

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const baseUrl = (req.headers.referer || "").split("/").splice(0, 3).join("/");
  const data = await fetch(
    `${baseUrl || process.env.BASEURL_API}/api/dashboard`
  ).then((res) => res.json());
  return {
    props: {
      apiDashboardData: data,
    },
  };
};

interface HomeModel {
  apiDashboardData: ModelDashboard;
}

export default function Home({ apiDashboardData }: HomeModel) {
  console.log(apiDashboardData);
  return (
    <div className={classNames({ [roboto.className]: true })}>
      <Pokedex results={apiDashboardData.results} />
    </div>
  );
}
