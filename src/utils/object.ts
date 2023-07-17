import { GetCourseResult } from "../types/Course.type";
import { GetUserResult } from "../types/User.type";

export const deepEqual = (x: any, y: any): boolean => {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === "object" && tx === ty
    ? ok(x).length === ok(y).length &&
    ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
};

export const sortCourseByPriority = (items: [GetCourseResult], priority: GetUserResult): [GetCourseResult] => {
  const sortedItems = items.sort((a, b) => {
    if (a.intendedLearner === priority.student.education && b.intendedLearner !== priority.student.education) {
      return -1; // Put a first
    } else if (a.intendedLearner !== priority.student.education && b.intendedLearner === priority.student.education) {
      return 1; // Put b first
    } else {
      if (a.intendedLearner !== b.intendedLearner) {
        return a.intendedLearner.localeCompare(b.intendedLearner);
      } else {
        return a.fullName.localeCompare(b.fullName);
      }
    }
  });
  return sortedItems;
}
