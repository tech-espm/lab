import { Request, Response } from "express";
import { ResponseBuilder } from "../utils";

import * as dao from "../dao";

export const getPersons = async (req: Request, res: Response) => {
  try {
    const people = await dao.getPersons();

    ResponseBuilder.ok(res, people);
  } catch (error) {
    return ResponseBuilder.serviceUnavailable(res);
  }
};
