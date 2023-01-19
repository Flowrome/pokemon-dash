import { readFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";

export interface ModelResponseGet {
  results: {
    name: string;
    colors: { primary: string; secondary: string };
    icon: string;
  }[];
}

export const handlerGet = async (req: NextApiRequest, res: NextApiResponse): Promise<ModelResponseGet> => {
  if (req?.headers?.authorization !== process.env.SECRET_SERVER_KEY) {
    res.status(401).send('NOT_AUTHORIZED')
  }
  const typesStructure: any = JSON.parse(
    await readFile(join(process.cwd(), "/public/static/types.json"), "utf-8")
  );
  return {
    results: typesStructure,
  };
};
