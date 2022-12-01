import { Request, Response } from "express";
import { ResponseBuilder } from "../utils";

import * as dao from "../dao";

export const postDeletePersons = async (req: Request, res: Response) => {
  try {
    const { personId } = req.params;
    if (!personId) return ResponseBuilder.badRequest(res, "Missing params");
    await dao.deletePersons(Number(personId));

    ResponseBuilder.noContent(res);
  } catch (error) {
    return ResponseBuilder.serviceUnavailable(res);
  }
};
