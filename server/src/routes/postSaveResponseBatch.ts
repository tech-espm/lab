import { Request, Response } from "express";
import { ResponseBuilder } from "../utils";
import streamifier from "streamifier";
import csv from "csv-parser";
import { NewCompany, NewPerson } from "../models";

import * as controller from "../controllers";

export const postSaveResponseBatch = async (req: Request, res: Response) => {
  try {
    const { file } = req as any;
    const filetypes = /csv/;
    if (!file) {
      return ResponseBuilder.badRequest(res, "Missing File");
    }
    if (!filetypes.test(file.mimetype)) {
      return ResponseBuilder.badRequest(res, "Invalid Format");
    }

    const insertSuccess: Promise<number>[] = [];

    streamifier
      .createReadStream(file.buffer)
      .pipe(
        csv({ mapHeaders: ({ header }) => header, separator: ";", raw: false })
      )
      .on("data", async (row: any) => {
        insertSuccess.push(
          new Promise((resolve, reject) => {
            const person: NewPerson = {
              name: row.nome,
              lastName: row.sobrenome,
              email: row.email,
              studentId: Number(row.ra),
              grade: Number(row.semestre),
              salary: Number(row.salario),
              birthDate: new Date(row.aniversario),
            };
            const company: NewCompany = {
              name: row.empresa,
              size: row.tamanhoEmpresa,
            };
            const className: string = row.curso;

            const personId = controller
              .saveResponse(person, company, className)
              .then((prospect) => resolve(prospect))
              .catch((error) => reject({ error, row }));
          })
        );
      })
      .on("end", () => {
        Promise.allSettled(insertSuccess).then((results) => {
          const rejections = results
            .filter(
              (
                input: PromiseSettledResult<unknown>
              ): input is PromiseRejectedResult => input.status === "rejected"
            )
            .map((rejection) => {
              const { error, row } = rejection.reason;
              return {
                error: error.toString().split("at")[0],
                row,
              };
            });
          if (rejections.length)
            return ResponseBuilder.multiStatus(res, rejections);
          return ResponseBuilder.created(res);
        });
      });
  } catch (error) {
    console.log("deu ruim");

    return ResponseBuilder.internalServerError(res);
  }
};
