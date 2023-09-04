import { NextApiRequest } from "next";

export interface ValidatedNextApiRequest<T> extends NextApiRequest {
  body: T;
}
