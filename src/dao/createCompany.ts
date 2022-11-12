import { NewCompany } from "../models";
import { DAO } from "../utils";

export const createCompany = async (
  company: NewCompany
): Promise<number | null> => {
  try {
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

    console.log({ upsertRes });

    if (upsertRes[0]?.insertId) return upsertRes[0].insertId;

    const selectRes: any = await DAO.query(
      `
      SELECT * FROM lab.company
      WHERE name = :name
      ;
      `,
      company
    );

    console.log({ selectRes });
    if (selectRes[0][0]?.name) return selectRes[0][0].companyId;
    return null;
  } catch (error) {
    console.error(String(error));
    return null;
  }
};
