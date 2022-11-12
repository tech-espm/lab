import { NewPerson } from "../models";
import { DAO } from "../utils";

export const createPerson = async (
  person: NewPerson & { className?: string; companyId?: number }
): Promise<number | null> => {
  try {
    const upsertRes: any = await DAO.query(
      `
      INSERT INTO lab.person
      (
      name,
      lastName,
      birthDate,
      email,
      studentId,
      grade,
      salary,
      classId,
      companyId
      )
      VALUES
      (
      :name,
      :lastName,
      :birthDate,
      :email,
      :studentId,
      :grade,
      :salary,
      (SELECT classId from lab.class WHERE className = :className),
      :companyId
      ) ON DUPLICATE KEY UPDATE 
      name = :name,
      lastName = :lastName,
      birthDate = :birthDate,
      studentId = :studentId,
      grade = :grade,
      salary = :salary,
      classId = (SELECT classId from lab.class WHERE className = :className),
      companyId = :companyId
      ;
      `,
      person
    );
    console.log({ person: upsertRes[0] });

    if (upsertRes[0]?.insertId) return upsertRes[0].insertId;

    const selectRes: any = await DAO.query(
      `
      SELECT * FROM lab.person
      WHERE email = :email
      ;
      `,
      person
    );

    console.log({ selectRes });
    if (selectRes[0][0]?.name) return selectRes[0][0].personId;
    return null;
  } catch (error) {
    console.error(String(error));
    return null;
  }
};
