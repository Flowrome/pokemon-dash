import { NextApiRequest, NextApiResponse } from "next";
import { handlerGet, ModelResponseGet } from "./methods/get";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ModelResponseGet>
) => {
  switch (req.method) {
    case "GET":
      res.status(200).json({ ...(await handlerGet()) });
      break;
    default:
      res.status(405);
      break;
  }
};

export default handler;
