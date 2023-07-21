import { GetUser, GetUserResult } from "../../../types/User.type";
import type { ColumnsType } from "antd/es/table";
import { Table, Space } from "antd";
import styled from "./AdminUser.module.scss";
import { useState } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { UserAPI } from "../../../api/UserAPI";
import Input from "antd/lib/input";
import SearchIcon from "@mui/icons-material/Search";
import LoadingSkeleton from "../../../components/skeleton/LoadingSkeleton";

type TableType = {
  userId: string,
  firstName: string,
  lastName: string,
  birthdate: Date,
  email: string,
  gender: string
}

const UserTable = () => {

  const [newTableData, setNewTableData] = useState<TableType[]>([]);
  const [inputData, setInputData] = useState<string>('')

  const columns: ColumnsType<TableType> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
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
  ];

  const {
    data: users,
    isLoading,
    isFetching,
    refetch
  }: UseQueryResult<GetUser, Error> = useQuery(
    ["courses"],
    async () => await UserAPI.getAll({})
      .then((users) => {
        let filteredList = users.result.filter((course: GetUserResult) => course.firstName.toLowerCase().includes(inputData))
        setNewTableData(
          filteredList.map((user: GetUserResult): TableType => {
            return {
              userId: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              birthdate: user.birthdate,
              email: user.email,
              gender: user.gender
            };
          })
        )
      })
  );

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className={styled["container"]}>
      <div className={styled["searchbar"]}>
        <Input
          className={styled["input"]}
          size="large"
          prefix={
            <div className={styled["search-container"]}>
              <SearchIcon className={styled["search-icon"]} />
            </div>
          }
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          onPressEnter={() => refetch()}
          placeholder="Search user first name"
          bordered={false}
        />
      </div>
      <Table
        loading={isFetching}
        className={styled["table"]}
        columns={columns}
        dataSource={newTableData}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "8", "10"],
        }}
      />
    </div>
  );
};

export default UserTable;
