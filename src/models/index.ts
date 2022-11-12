export interface NewPerson {
  name: string;
  lastName: string;
  birthDate?: Date;
  email: string;
  studentId: number;
  grade: number;
  salary: number;
}

export interface Person extends NewPerson {
  personId: number;
}

export interface NewCompany {
  name: string;
  size: string;
}

export interface Company extends NewCompany {
  companyId: number;
}
