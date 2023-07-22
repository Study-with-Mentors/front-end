import React, { useMemo } from "react";
import { Space, Spin, Table, Tag, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UseQueryResult, useQuery } from "react-query";
import { GetClassResult } from "../../types/Class.type";
import { ClassAPI } from "../../api/ClassAPI";
import { useCreateEnrollment } from "../../hooks/useCreateEnrollmentHook";
import { useNavigate } from "react-router-dom";
import { JwtPayload } from "../../types/Jwt.type";
import { decode } from "../../utils/jwt";

interface ClassListTableItem {
  key: string;
  startDate: Date;
  endDate: Date;
  enrollmentEndDate: Date;
  status: string;
  price: number;
}

export enum ClassListTableType {
  EDIT = "EDIT",
  DETAIL = "DETAIL",
}

export type ClassListTableProps = {
  courseId: string;
  type: ClassListTableType;
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

const ClassListTable = ({ courseId, type }: ClassListTableProps) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading }: UseQueryResult<GetClassResult[], Error> = useQuery(
    ["classes", courseId],
    async () =>
      await ClassAPI.getClassByCourseIdWithToken(courseId).then((classes) => {
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
          switch (type) {
            case ClassListTableType.DETAIL:
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
                      const access_token = localStorage.getItem("access_token");
                      var decoded: JwtPayload = decode(access_token!);
                      createEnrollment(
                        {
                          classId: record.key,
                          paymentType: "VNPAY",
                          studentId: decoded.uid,
                        },
                        {
                          onSuccess(data, variables, context) {
                            window.open(data.object, "VNPAY");
                            navigate(`/home/course`);
                          },
                          onError(error: any, variables, context) {
                            messageApi.open({
                              type: "error",
                              duration: 3,
                              content:
                                error?.response?.data?.message?.slice(0, 50) +
                                "...",
                            });
                          },
                        }
                      );
                    }}
                  >
                    {checkEnrolled ? "Enrolled" : "Enroll this"}
                  </Button>
                </Space>
              );
            case ClassListTableType.EDIT:
              return (
                <Button
                  onClick={() => {
                    navigate(`/home/class/edit/${record.key}`);
                  }}
                >
                  Show detail
                </Button>
              );
            default:
              return;
          }
        },
      },
    ];
  }, [isCreateEnrollmentLoading, enrolledClass]);

  return (
    <Spin spinning={isLoading || isLoadingEnrolledClass}>
      {contextHolder}
      <Table columns={columns} dataSource={dataItem} pagination={false} />
    </Spin>
  );
};

export default ClassListTable;
