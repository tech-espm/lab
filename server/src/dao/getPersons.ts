import { DAO } from "../utils";

export const getPersons = async () => {
  const selectRes: any = await DAO.query(
    `
      SELECT * FROM lab.person
      ;
      `,
    []
  );

  if (selectRes[0][0]?.name) return selectRes[0];
  throw "Error creating company";
};
