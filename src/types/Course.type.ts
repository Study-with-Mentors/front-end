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
  intendedLearner: string;
  field: GetField;
  mentor: Mentor;
  image: Image;
};
