export type GetLessonResult = {
  id: string;
  version: number;
  lessonNum: number;
  startTime: Date;
  endTime: Date;
  location: string;
  courseName: string;
  sessionName: string;
  clazzId: string;
  sessionId: string;
};
