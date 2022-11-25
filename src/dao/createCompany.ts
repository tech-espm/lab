import { NewCompany } from "../models";
import { DAO } from "../utils";

export const createCompany = async (company: NewCompany): Promise<number> => {
  const upsertRes: any = await DAO.query(
    `
      INSERT INTO lab.company
      (
      name,
      size)
      VALUES
      (
      :name,
      :size
      ) ON DUPLICATE KEY UPDATE 
      size = :size
      ;
      `,
    company
  );

  if (upsertRes[0]?.insertId) return upsertRes[0].insertId;

  const selectRes: any = await DAO.query(
    `
      SELECT * FROM lab.company
      WHERE name = :name
      ;
      `,
    company
  );

  if (selectRes[0][0]?.name) return selectRes[0][0].companyId;
  throw "Error creating company";
};
