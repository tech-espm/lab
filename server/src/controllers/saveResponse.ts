import * as dao from "../dao";
import { NewCompany, NewPerson } from "../models";

export const saveResponse = async (
  person: NewPerson,
  company: NewCompany,
  className: string
) => {
  const companyId = await dao.createCompany(company);
  return await dao.createPerson({
    ...person,
    companyId: companyId || undefined,
    className,
  });
};
