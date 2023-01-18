import { readFile } from "fs/promises";
import { join } from "path";

export interface ModelResponseGet {
  results: {
    name: string;
    colors: { primary: string; secondary: string };
    icon: string;
  }[];
}

export const handlerGet = async (): Promise<ModelResponseGet> => {
  const typesStructure: any = JSON.parse(
    await readFile(join(process.cwd(), "/public/static/types.json"), "utf-8")
  );
  return {
    results: typesStructure,
  };
};
