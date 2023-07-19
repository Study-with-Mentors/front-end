import { UseQueryResult, useQueries, useQuery } from "react-query";
import { GetClassResult, GetSearchClass } from "../types/Class.type";
import { ClassAPI } from "../api/ClassAPI";
import { decode } from "../utils/jwt";
import dayjs from "dayjs";
import {
  CalculateDifferencesValues,
  calculateMultipleDifferences,
} from "../utils/calculateStaticValue";
import { CourseAPI } from "../api/CourseAPI";
import { UserAPI } from "../api/UserAPI";

export const useGetClassStaticValueHook = () => {
  const { uid: mentorId } = decode(localStorage.getItem("access_token")!);

  const [currentQuery, pastQuery, secondPastQuery] = useQueries([
    {
      queryKey: "search-current-classes",
      queryFn: async () => {
        return await ClassAPI.searchClass({
          mentorId,
          lowerStartDate: dayjs().startOf("month").format("YYYY-MM-DD"),
          upperStartDate: dayjs().endOf("month").format("YYYY-MM-DD"),
        });
      },
    },
    {
      queryKey: "search-past-classes",
      queryFn: async () => {
        return await ClassAPI.searchClass({
          mentorId,
          lowerStartDate: dayjs()
            .subtract(1, "month")
            .startOf("month")
            .format("YYYY-MM-DD"),
          upperStartDate: dayjs()
            .subtract(1, "month")
            .endOf("month")
            .format("YYYY-MM-DD"),
        });
      },
    },
    {
      queryKey: "search-second-past-classes",
      queryFn: async () => {
        return await ClassAPI.searchClass({
          mentorId,
          lowerStartDate: dayjs()
            .subtract(2, "month")
            .startOf("month")
            .format("YYYY-MM-DD"),
          upperStartDate: dayjs()
            .subtract(2, "month")
            .endOf("month")
            .format("YYYY-MM-DD"),
        });
      },
    },
  ]);

  var returnValue: CalculateDifferencesValues = calculateMultipleDifferences(
    secondPastQuery?.data?.totalElements ?? 0,
    pastQuery?.data?.totalElements ?? 0,
    currentQuery?.data?.totalElements ?? 0
  );

  return {
    data: {
      numberOfClasses: currentQuery.data?.totalElements,
      staticValue: returnValue,
    },
    isLoading:
      currentQuery.isLoading ||
      pastQuery.isLoading ||
      secondPastQuery.isLoading,
  };
};

export const useGetReportIncomeStaticValueHook = () => {
  const [currentQuery, pastQuery, secondPastQuery] = useQueries([
    {
      queryKey: "search-current-income",
      queryFn: async () => {
        return await UserAPI.getMentorIncome({
          startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
          endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
        });
      },
    },
    {
      queryKey: "search-past-income",
      queryFn: async () => {
        return await UserAPI.getMentorIncome({
          startDate: dayjs()
            .subtract(1, "month")
            .startOf("month")
            .format("YYYY-MM-DD"),
          endDate: dayjs()
            .subtract(1, "month")
            .endOf("month")
            .format("YYYY-MM-DD"),
        });
      },
    },
    {
      queryKey: "search-second-past-income",
      queryFn: async () => {
        return await UserAPI.getMentorIncome({
          startDate: dayjs()
            .subtract(2, "month")
            .startOf("month")
            .format("YYYY-MM-DD"),
          endDate: dayjs()
            .subtract(2, "month")
            .endOf("month")
            .format("YYYY-MM-DD"),
        });
      },
    },
  ]);

  var returnEarningValue: CalculateDifferencesValues =
    calculateMultipleDifferences(
      secondPastQuery?.data?.totalEarning ?? 0,
      pastQuery?.data?.totalEarning ?? 0,
      currentQuery?.data?.totalEarning ?? 0
    );

  var returnEnrollmentValue: CalculateDifferencesValues =
    calculateMultipleDifferences(
      secondPastQuery?.data?.numOfEnrollments ?? 0,
      pastQuery?.data?.numOfEnrollments ?? 0,
      currentQuery?.data?.numOfEnrollments ?? 0
    );

  return {
    data: {
      totalCurrentEarning: currentQuery.data?.totalEarning,
      totalCurrentEnrollment: currentQuery.data?.numOfEnrollments,
      earningStaticValue: returnEarningValue,
      enrollmentStaticValue: returnEnrollmentValue,
    },
    isLoading:
      currentQuery.isLoading ||
      pastQuery.isLoading ||
      secondPastQuery.isLoading,
  };
};
