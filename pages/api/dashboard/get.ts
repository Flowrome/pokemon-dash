import { NextApiRequest } from "next";
import { objectToQuery } from "../../../utilities/object-to-query";

interface ModelRequestGet {
  q?: string;
  page?: number;
  limit?: number;
}
export interface ModelResponseGet {
  results: {
    name: string;
    height: number;
    weight: number;
    id: number;
    sprites: {
      back: string;
      backShiny: string;
      front: string;
      frontShiny: string;
    };
    stats: { base: number; effort: number; name: string }[];
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
        height,
        weight,
        id,
        sprites: {
          back_default: back,
          back_shiny: backShiny,
          front_default: front,
          front_shiny: frontShiny,
        },
        stats,
        types,
      } = (await fetch(`${url}`).then((res) => res.json())) as any;
      return {
        name,
        height,
        weight,
        id,
        sprites: {
          back,
          backShiny,
          front,
          frontShiny,
        },
        stats: stats.map(({ base, effort, stat: { name } }: any) => ({
          base,
          effort,
          name,
        })),
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
