import { CourseTableDetail } from "../../../types/User.type";
import type { ColumnsType } from "antd/es/table";
import { Table, Space } from "antd";
import styled from "./AdminCourse.module.scss";

const fakeUserDetailData: CourseTableDetail[] = [
  {
    id: "1",
    name: "Hello_",
    user: "its_me",
    field: "Physics",
    level: "ADVANCE",
  },
  {
    id: "2",
    name: "Hello_",
    user: "its_me",
    field: "Physics",
    level: "ADVANCE",
  },
  {
    id: "3",
    name: "Hello_",
    user: "its_me",
    field: "Physics",
    level: "ADVANCE",
  },
  {
    id: "4",
    name: "Hello_",
    user: "its_me",
    field: "Physics",
    level: "ADVANCE",
  },
  {
    id: "5",
    name: "Hello_",
    user: "its_me",
    field: "Physics",
    level: "ADVANCE",
  },
  {
    id: "6",
    name: "Hello_",
    user: "its_me",
    field: "Physics",
    level: "ADVANCE",
  },
  {
    id: "7",
    name: "Hello_",
    user: "its_me",
    field: "Physics",
    level: "ADVANCE",
  },
  {
    id: "8",
    name: "Hello_",
    user: "its_me",
    field: "Physics",
    level: "ADVANCE",
  },
];

const columns: ColumnsType<CourseTableDetail> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Field",
    dataIndex: "field",
    key: "field",
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a style={{ color: "blue" }}>Detail</a>
      </Space>
    ),
  },
];

const CourseTable = () => {
  return (
    <div className={styled["container"]}>
      <Table
        className={styled["table"]}
        columns={columns}
        dataSource={fakeUserDetailData}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
};

export default CourseTable;
