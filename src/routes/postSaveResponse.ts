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
    console.log(req.body);

    const { person, company, className } = req.body;
    console.log({ person, company, className });

    const personId = await controller.saveResponse(person, company, className);

    return personId
      ? ResponseBuilder.ok(res, personId)
      : ResponseBuilder.internalServerError(res);
  } catch (error) {
    console.log(error);

    return ResponseBuilder.serviceUnavailable(res);
  }
};
