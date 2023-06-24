import { Field } from "react-hook-form";
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
  field: Field;
  mentor: Mentor;
  images: string[];
};
