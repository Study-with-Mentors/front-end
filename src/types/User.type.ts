import { GetField } from "./Field.type";

export type UserDetail = {
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: string;
  role?: "USER" | "ADMIN";
};

export type Mentor = {
  id: string;
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  profileImage: string;
  gender: string;
};

export type GetUserResult = {
  id: string;
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  profileImage: string;
  gender: GENDER;
  mentor: {
    bio: string;
    degree: string;
    field: GetField;
  };
  student: {
    year: number;
    bio: string;
    experience: string;
    education: EDUCATION;
  };
};

export type CourseTableDetail = {
  id: string;
  name: string;
  user: string;
  field: string;
  level: string;
};

export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER"
}

export enum GENDER {
  NONE = "NONE",
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum EDUCATION {
  NONE = "NONE",
  HIGH_SCHOOL = "HIGH_SCHOOL",
  COLLEGE = "COLLEGE",
  BACHELOR = "BACHELOR",
  MASTER = "MASTER",
  PROFESSOR = "PROFESSOR",
}
