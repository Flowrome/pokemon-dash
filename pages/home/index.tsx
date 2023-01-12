import classNames from "classnames";
import { Roboto } from "@next/font/google";
import { InferGetStaticPropsType } from "next";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={classNames({ [roboto.className]: true })}>
      Welcome to pokemon dash
    </div>
  );
}
