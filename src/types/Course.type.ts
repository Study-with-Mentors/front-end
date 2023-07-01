import { GetField } from "./Field.type";
<<<<<<< HEAD
=======
import { Image } from "./Image.type";
>>>>>>> main-layout
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
  image: GetCourseImage;
<<<<<<< HEAD
=======
};

export type GetCourseImage = {
  id: string;
  version: 0;
  url: string;
>>>>>>> main-layout
};

export type GetCourseImage = {
  id: string;
  version: 0;
  url: string;
};