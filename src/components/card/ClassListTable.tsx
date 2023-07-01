import React, { useMemo } from "react";
import { Space, Spin, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UseQueryResult, useQuery } from "react-query";
import { GetClassResult } from "../../types/Class.type";
import { ClassAPI } from "../../api/ClassAPI";
import { useCreateEnrollment } from "../../hooks/useCreateEnrollmentHook";
import { useNavigate } from "react-router-dom";

interface ClassListTableItem {
  key: string;
  startDate: Date;
  endDate: Date;
  enrollmentEndDate: Date;
  status: string;
  price: number;
}

export type ClassListTableProps = {
  courseId: string;
};

const checkEnrolledClasses = (
  classItem: ClassListTableItem,
  enrolledClasses: GetClassResult[]
): boolean => {
  var check = false;
  enrolledClasses.forEach((item) => {
    if (classItem.key == item.id) {
      check = true;
      return;
    }
  });
  return check;
};

var dataItem: ClassListTableItem[] = [];

const ClassListTable = ({ courseId }: ClassListTableProps) => {
  const navigate = useNavigate();

  const { data, isLoading }: UseQueryResult<GetClassResult[], Error> = useQuery(
    ["classes", courseId],
    async () =>
      await ClassAPI.getClassByCourseId(courseId).then((classes) => {
        dataItem = classes.map((item: GetClassResult) => {
          return {
            ...item,
            key: item.id,
          };
        });
      })
  );

  const {
    data: enrolledClass,
    isLoading: isLoadingEnrolledClass,
  }: UseQueryResult<GetClassResult[], Error> = useQuery(
    ["classes-by-token"],
    async () => await ClassAPI.getClassByUserToken()
  );

  const {
    data: createEnrollmentData,
    error,
    isLoading: isCreateEnrollmentLoading,
    mutate: createEnrollment,
  } = useCreateEnrollment();

  const columns: ColumnsType<ClassListTableItem> = useMemo(() => {
    return [
      {
        title: "Start date",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
      },
      {
        title: "Enrollment end date",
        dataIndex: "enrollmentEndDate",
        key: "enrollmentEndDate",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
        render: (_, { status }) => (
          <>
            <Tag color={status.length > 5 ? "geekblue" : "green"} key={status}>
              {status.toUpperCase()}
            </Tag>
          </>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => {
          var checkEnrolled: boolean = checkEnrolledClasses(
            record,
            enrolledClass ?? []
          );
          return (
            <Space size="middle">
              <Button
                loading={isCreateEnrollmentLoading}
                disabled={checkEnrolled}
                onClick={() => {
                  createEnrollment(
                    {
                      classId: record.key,
                      paymentType: "VNPAY",
                      studentId: localStorage.getItem("userID") ?? "",
                    },
                    {
                      onSuccess(data, variables, context) {
                        window.open(data.object, "VNPAY");
                        navigate(`/home/course`);
                      },
                      onError(error, variables, context) {
                        console.log(error);
                      },
                    }
                  );
                }}
              >
                {checkEnrolled ? "Enrolled" : "Enroll this"}
              </Button>
            </Space>
          );
        },
      },
    ];
  }, [isCreateEnrollmentLoading, enrolledClass]);

  return (
    <Spin spinning={isLoading || isLoadingEnrolledClass}>
      <Table columns={columns} dataSource={dataItem} pagination={false} />
    </Spin>
  );
};

export default ClassListTable;
