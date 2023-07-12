import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Dropdown, Space, Table, Spin } from "antd";
import { UseQueryResult, useQuery } from "react-query";
import { ClassAPI } from "../../api/ClassAPI";
import { GetClassResult } from "../../types/Class.type";
import { LessionAPI } from "../../api/LessonAPI";
import { GetLessonResult } from "../../types/Lesson.type";
import { useParams } from "react-router-dom";
import { GetActivityResult } from "../../types/Activity.type";
import { ActivityAPI } from "../../api/ActivityAPI";
import styled from "./ClassDetailPage.module.scss";

export type ClassDetailPageProps = {};

interface DataType {
  key: React.Key;
  lesson_name: string;
  lesson_num: number;
  start_time: string;
  end_time: string;
  location: string;
  resourse: string;
  sessionId: string;
}

interface ExpandedDataType {
  key: React.Key;
  title: string;
  description: string;
}

type ExpandedDataProps = {
  sessionId: string;
};

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
            sessionId: item.sessionId,
          };
        });
      })
  );

  const expandedRowRender = (values: object) => {
    console.log(values);

    const props = values as DataType;
    return <ExpandedRowRender sessionId={props.sessionId}></ExpandedRowRender>;
  };

  const ExpandedRowRender = (props: { sessionId: string }) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Activity Name", dataIndex: "title", key: "title" },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
    ];

    const {
      data,
      isLoading,
      error,
    }: UseQueryResult<ExpandedDataType[], Error> = useQuery(
      ["activities", props.sessionId],
      async () =>
        await ActivityAPI.getActivityBySessionId({
          sessionId: props.sessionId,
        }).then((items) => {
          return items.map((item: GetActivityResult): ExpandedDataType => {
            return {
              key: item.id,
              title: item.title,
              description: item.description,
            };
          });
        })
    );

    return (
      <Spin spinning={isLoading}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Spin>
    );
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Lesson name", dataIndex: "lesson_name", key: "lesson_name" },
    {
      title: "Lesson number",
      dataIndex: "lesson_num",
      key: "lesson_num",
      defaultSortOrder: "ascend",
      sorter: (a: any, b: any) => a?.lesson_num - b?.lesson_num,
    },
    { title: "Start time", dataIndex: "start_time", key: "start_time" },
    { title: "End time", dataIndex: "end_time", key: "end_time" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Resourse", dataIndex: "resourse", key: "resourse" },
  ];

  return (
    <div className={styled["container"]}>
      <Table
        loading={isLessonLoading}
        columns={columns}
        bordered={true}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default ClassDetailPage;
