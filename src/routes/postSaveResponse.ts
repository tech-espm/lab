import { Request, Response } from "express";
import { ResponseBuilder } from "../utils";

import * as controller from "../controllers";

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * @example 
 * {
	"person": {
		"name": "gabriel",
		"lastName": "zsigmond",
		"email": "teste@gmail.com",
		"studentId": 114633,
		"grade": 7,
		"salary": 1500
	},
	"company": {
		"name": "empresa",
		"size": "1-10"
	},
	"className": "TECH"
}
 */

export const postSaveResponse = async (req: Request, res: Response) => {
  try {
    const { person, company, className } = req.body;

    const personId = await controller.saveResponse(person, company, className);

    return personId
      ? ResponseBuilder.ok(res, personId)
      : ResponseBuilder.internalServerError(res);
  } catch (error) {
    return ResponseBuilder.serviceUnavailable(res);
  }
};
