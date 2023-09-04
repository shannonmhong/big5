import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type HttpMethod =
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | "OPTIONS";

export const routeByMethod =
  (
    httpMethodToHandlerMap: Partial<{ [method in HttpMethod]: NextApiHandler }>
  ) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const handler = httpMethodToHandlerMap[req.method as HttpMethod];
    if (!req.method || !handler) {
      res.status(404).json({ statusCode: 404, message: "API route not found" });
      return;
    }
    handler(req, res);
  };
