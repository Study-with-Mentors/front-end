import { GetCourse, GetCourseResult, INTENDEDLEARNER } from "../types/Course.type";
import { EDUCATION, GetUserResult } from "../types/User.type";

export const deepEqual = (x: any, y: any): boolean => {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === "object" && tx === ty
    ? ok(x).length === ok(y).length &&
    ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
};

export const sortCourseByPriority = (items: GetCourse | undefined, priority: GetUserResult | undefined): GetCourse | undefined => {
  if (items === undefined || priority === undefined) {
    return items
  }
  const coursesArr = items.result;
  const sortedItems = coursesArr.sort((a, b) => {
    if (priority.student.education === EDUCATION.HIGH_SCHOOL) {
      if (a.intendedLearner === INTENDEDLEARNER.STUDENT && b.intendedLearner !== INTENDEDLEARNER.STUDENT) {
        return -1; // Put a first
      } else if (a.intendedLearner !== INTENDEDLEARNER.STUDENT && b.intendedLearner === INTENDEDLEARNER.STUDENT) {
        return 1; // Put b first
      } else if (a.intendedLearner !== b.intendedLearner) {
        return a.intendedLearner.localeCompare(b.intendedLearner);
      } else {
        return a.fullName.localeCompare(b.fullName);
      }
    } else {
      if (a.intendedLearner !== b.intendedLearner) {
        return a.intendedLearner.localeCompare(b.intendedLearner);
      } else {
        return a.fullName.localeCompare(b.fullName);
      }
    }
  });
  const sortedResult: GetCourse = {
    totalElements: items.totalElements,
    totalPages: items.totalPages,
    result: sortedItems
  }
  return sortedResult;
}
