import { GetActivityResult } from "./Activity.type";

export type GetSessionResult = {
  id: string;
  version: number;
  sessionNum: number;
  sessionName: string;
  type: string;
  description: string;
  resource: string;
  courseId: string;
  activities: GetActivityResult[];
};
