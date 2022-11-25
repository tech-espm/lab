import { Request, Response } from "express";
import { ResponseBuilder } from "../utils";

import * as controller from "../controllers";
import { NewCompany, NewPerson } from "../models";

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
  console.log("here");

  try {
    const { body } = req;
    const person: NewPerson = {
      name: body.user_name,
      lastName: body.user_last_name,
      email: body.user_email,
      studentId: Number(body.user_student_id),
      grade: Number(body.user_grade),
      salary: Number(body.user_salary),
      birthDate: new Date(body.user_birthday),
    };
    const company: NewCompany = {
      name: body.company_name,
      size: body.company_size,
    };
    const className: string = body.user_class;

    console.log({ person, company, className });

    const personId = await controller.saveResponse(person, company, className);

    return personId
      ? ResponseBuilder.ok(res, personId)
      : ResponseBuilder.internalServerError(res);
  } catch (error) {
    return ResponseBuilder.serviceUnavailable(res);
  }
};
