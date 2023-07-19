import { GetField } from "./Field.type";
import { Image } from "./Image.type";
import { Mentor } from "./User.type";

export type GetCourse = {
  totalPages: number;
  totalElements: number;
  result: GetCourseResult[];
};

export type GetCourseResult = {
  id: string;
  version: number;
  shortName: string;
  fullName: string;
  description: string;
  learningOutcome: string;
  status: string;
  courseLevel: string;
  intendedLearner: INTENDEDLEARNER;
  field: GetField;
  mentor: Mentor;
  image: GetCourseImage;
};

export type GetCourseImage = {
  id: string;
  version: 0;
  url: string | "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg";
};

export enum INTENDEDLEARNER {
  STUDENT = "STUDENT",
  FULLTIME = "FULLTIME",
  PARTTIMEIME = "PARTTIME",
  COLLEGE = "COLLEGE"
}