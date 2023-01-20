import { readFile } from "fs/promises";
import { NextApiRequest } from "next";
import { join } from "path";

export interface ModelResponseGet {
  result: {
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
    abilities: string[];
    evolutions: {
      name: string;
      sprites: {
        back: string;
        backShiny: string;
        front: string;
        frontShiny: string;
      };
      types: string[];
    }[];
  };
}

const parseEvolution = async (
  initialObject: any = [],
  arrayToStore: any[] = []
) => {
  let { sprites, types, name, id } = (await fetch(
    `${initialObject.species.url.replace("pokemon-species", "pokemon")}`
  ).then((res) => res.json())) as any;
  arrayToStore = [
    ...arrayToStore,
    {
      name,
      sprites: {
        back: sprites.back_default,
        backShiny: sprites.back_shiny,
        front: sprites.front_default,
        frontShiny: sprites.front_shiny,
      },
      types: types.map(({ type: { name } }: any) => name),
      id,
    },
    ...((initialObject?.evolves_to?.length &&
      (await parseEvolution(initialObject?.evolves_to[0], arrayToStore))) ||
      []),
  ];
  return arrayToStore;
};

export const handlerGet = async (
  req: NextApiRequest
): Promise<ModelResponseGet> => {
  const { id } = req.query;
  if (process.env.NODE_ENV === "development") {
    return JSON.parse(
      await readFile(
        join(process.cwd(), "/public/static/mocks/detail.json"),
        "utf-8"
      )
    );
  }
  let { abilities, height, weight, sprites, stats, types, name } = (await fetch(
    `${process.env.BASEURL_POKEAPI}/pokemon/${id}`
  ).then((res) => res.json())) as any;
  let { chain } = (await fetch(
    `${process.env.BASEURL_POKEAPI}/evolution-chain/${id}`
  ).then((res) => res.json())) as any;
  let evolutions = [];
  if (chain?.evolves_to.length) {
    evolutions = await parseEvolution(chain, []);
  }
  return {
    result: {
      id: Number(id),
      abilities: abilities.map(({ ability: { name } }: any) => name),
      height,
      weight,
      sprites: {
        back: sprites.back_default,
        backShiny: sprites.back_shiny,
        front: sprites.front_default,
        frontShiny: sprites.front_shiny,
      },
      stats: stats.map(({ stat: { name }, base_stat }: any) => ({
        name,
        base_stat,
      })),
      types: types.map(({ type: { name } }: any) => name),
      name,
      evolutions,
    },
  };
};
