import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Dropdown, Space, Table } from "antd";
import { UseQueryResult, useQuery } from "react-query";
import { ClassAPI } from "../../api/ClassAPI";
import { GetClassResult } from "../../types/Class.type";
import { LessionAPI } from "../../api/LessonAPI";
import { GetLessonResult } from "../../types/Lesson.type";
import { useParams } from "react-router-dom";

export type ClassDetailPageProps = {};

interface DataType {
  key: React.Key;
  lesson_name: string;
  lesson_num: number;
  start_time: string;
  end_time: string;
  location: string;
  resourse: string;
}

interface ExpandedDataType {
  key: React.Key;
  title: string;
  description: string;
}

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

var data: DataType[] = [];

const ClassDetailPage = ({}: ClassDetailPageProps) => {
  const params = useParams();

  const {
    data: class_data,
    isLoading: isClassLoading,
    error: isClassError,
  }: UseQueryResult<GetClassResult, Error> = useQuery(
    ["class", params?.id],
    async () => await ClassAPI.getClassByClassId(params?.id!)
  );

  const {
    data: lesson_data,
    isLoading: isLessonLoading,
    error: isLessonError,
  }: UseQueryResult<GetLessonResult[], Error> = useQuery(
    ["lessons", params?.id],
    async () =>
      await LessionAPI.getLessonByClassId(params?.id ?? "").then((items) => {
        data = items.map((item: GetLessonResult) => {
          return {
            key: item.id,
            lesson_name: item.sessionName,
            lesson_num: item.lessonNum,
            start_time: item.startTime,
            end_time: item.endTime,
            location: item.location,
            resourse: "resourse",
          };
        });
      })
  );

  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Activity Name", dataIndex: "title", key: "title" },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        title: "title",
        description: "description",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Lesson name", dataIndex: "name", key: "name" },
    { title: "Lesson number", dataIndex: "lesson_num", key: "lesson_num" },
    { title: "Start time", dataIndex: "start_time", key: "start_time" },
    { title: "End time", dataIndex: "end_time", key: "end_time" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Resourse", dataIndex: "resourse", key: "resourse" },
  ];

  return (
    <>
      <Table
        loading={isLessonLoading}
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};

export default ClassDetailPage;
