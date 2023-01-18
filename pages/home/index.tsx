import classNames from "classnames";
import { Roboto } from "@next/font/google";
import { GetServerSidePropsContext } from "next";

import Pokedex from "./../../components/pokedex/pokedex";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext) => {
  const baseUrl = (req.headers.referer || "").split("/").splice(0, 3).join("/");
  const data = await fetch(`${baseUrl}/api/dashboard`).then((res) =>
    res.json()
  );
  return {
    props: {
      apiDashboardData: data,
    },
  };
};

interface HomeModel {
  apiDashboardData: any[];
}

export default function Home({ apiDashboardData }: HomeModel) {
  console.log(apiDashboardData);
  return (
    <div className={classNames({ [roboto.className]: true })}>
      Welcome to pokemon dash
      <Pokedex></Pokedex>
    </div>
  );
}
