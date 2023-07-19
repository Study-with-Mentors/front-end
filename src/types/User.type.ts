import { GetField } from "./Field.type";

export type UserDetail = {
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  gender: string;
  role: string;
};

export type Mentor = {
  id: string;
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  profileImage: GetProfileImage;
  gender: string;
};

export type GetUserResult = {
  id: string;
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  profileImage: GetProfileImage;
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

export type GetProfileImage = {
  id: string;
  version: number;
  url: string | "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg";
};

export type GetMentorResult = {
  totalPages: number;
  totalElements: number;
  result: GetUserResult[];
};

export type GetIncomeResult = {
  numOfEnrollments: number;
  totalEarning: number;
};

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