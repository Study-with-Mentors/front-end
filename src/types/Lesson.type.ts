export type GetLessonResult = {
  id: string;
  version: number;
  lessonNum: number;
  startTime: Date;
  endTime: Date;
  location: string;
  clazzId: string;
  sessionId: string;
};
