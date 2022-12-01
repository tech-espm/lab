import { DAO } from "../utils";

export const deletePersons = async (personId: number) => {
  console.log(personId);

  const res: any = await DAO.query(
    `
      DELETE FROM lab.person where personId = :personId
      ;
      `,
    { personId }
  );
  if (res[0].affectedRows) return;

  throw "Error deleting person";
};
