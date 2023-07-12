import React from "react";
import { UserDetail } from "../../../types/User.type";
import type { ColumnsType } from "antd/es/table";
import { Table, Space, Pagination } from "antd";
import styled from "./Index.module.scss";

const fakeUserDetailData: UserDetail[] = [
  {
    userId: "1",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
    role: "USER",
  },
  {
    userId: "2",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
    role: "USER",
  },
  {
    userId: "3",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
    role: "USER",
  },
  {
    userId: "4",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
    role: "USER",
  },
  {
    userId: "5",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
    role: "USER",
  },
  {
    userId: "6",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
    role: "USER",
  },
  {
    userId: "7",
    firstname: "Hello_",
    lastname: "its_me",
    birthdate: "2002/08/30",
    email: "animal_zzz@fpt.edu.vn",
    gender: "Male",
    role: "USER",
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
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  //   {
  //     title: "Tags",
  //     key: "tags",
  //     dataIndex: "tags",
  //     render: (_, { tags }) => (
  //       <>
  //         {tags.map((tag) => {
  //           let color = tag.length > 5 ? "geekblue" : "green";
  //           if (tag === "loser") {
  //             color = "volcano";
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.firstname}</a>
        <a style={{ color: "red" }}>Delete</a>
      </Space>
    ),
  },
];

const UserList = () => {
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

export default UserList;
