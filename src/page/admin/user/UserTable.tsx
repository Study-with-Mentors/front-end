import { UserDetail } from "../../../types/User.type";
import type { ColumnsType } from "antd/es/table";
import { Table, Space } from "antd";
import styled from "./AdminUser.module.scss";

const fakeUserDetailData: UserDetail[] = [
  {
    userId: "1",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
  },
  {
    userId: "2",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
  },
  {
    userId: "3",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
  },
  {
    userId: "4",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
  },
  {
    userId: "5",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
  },
  {
    userId: "6",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
  },
  {
    userId: "7",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
  },
];

const columns: ColumnsType<UserDetail> = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Firstname",
    dataIndex: "firstname",
    key: "firstname",
  },
  {
    title: "Lastname",
    dataIndex: "lastname",
    key: "lastname",
  },
  {
    title: "Birthdate",
    dataIndex: "birthdate",
    key: "birthdate",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a style={{ color: "red" }}>Delete</a>
      </Space>
    ),
  },
];

const UserTable = () => {
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

export default UserTable;
