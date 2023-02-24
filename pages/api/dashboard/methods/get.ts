import { readFile } from "fs/promises";
import { NextApiRequest } from "next";
import { join } from "path";
import { objectToQuery } from "../../../../utilities/object-to-query";

interface ModelRequestGet {
  q?: string;
  page?: number;
  limit?: number;
}
export interface ModelResponseGet {
  results: {
    name: string;
    id: number;
    sprites: {
      back: string;
      backShiny: string;
      front: string;
      frontShiny: string;
    };
    types: string[];
  }[];
  count: number;
  page: number;
  limit: number;
}

export const handlerGet = async (
  req: NextApiRequest
): Promise<ModelResponseGet> => {
  const { q, page = 0, limit = 40 }: ModelRequestGet = req.query;
  const offset = page * limit;
  // if (process.env.NODE_ENV === "development") {
  //   return JSON.parse(
  //     await readFile(
  //       join(process.cwd(), "/public/static/mocks/dashboard.json"),
  //       "utf-8"
  //     )
  //   );
  // }
  let { results }: { results: { name: string; url: string }[] } = (await fetch(
    `${process.env.BASEURL_POKEAPI}/pokemon${objectToQuery({ offset, limit })}`
  ).then((res) => res.json())) as any;
  if (q) {
    results = results.filter(({ name }) => name.indexOf(q) > -1);
  }
  const newResults = await Promise.all(
    results.map(async ({ url }) => {
      const {
        name,
        id,
        sprites: {
          back_default: back,
          back_shiny: backShiny,
          front_default: front,
          front_shiny: frontShiny,
        },
        types,
      } = (await fetch(`${url}`).then((res) => res.json())) as any;
      return {
        name,
        id,
        sprites: {
          back,
          backShiny,
          front,
          frontShiny,
        },
        types: types.map(({ type: { name } }: any) => name),
      };
    })
  );
  return {
    count: newResults.length,
    results: newResults,
    page,
    limit,
  };
};
