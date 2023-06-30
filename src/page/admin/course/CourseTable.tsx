import { Table, Space, Button } from "antd";
import styled from "./AdminCourse.module.scss";
import LoadingSkeleton from "../../../components/skeleton/LoadingSkeleton";
import { UseQueryResult, useQuery } from "react-query";
import { GetCourse, GetCourseResult } from "../../../types/Course.type";
import { CourseAPI } from "../../../api/CourseAPI";
import { Dispatch, SetStateAction, useState } from "react";
import { ColumnsType } from "antd/es/table";
import SearchIcon from "@mui/icons-material/Search";
import Input from "antd/lib/input";

type TableType = {
  id: string,
  name: string,
  mentor: string,
  field: string,
  level: string,
  status: string,
}

interface PropsOption {
  setId: Dispatch<SetStateAction<string>>,
  setDetail: Dispatch<SetStateAction<boolean>>
}

const CourseTable = ({ setId, setDetail }: PropsOption) => {

  const [newTableData, setNewTableData] = useState<TableType[]>([]);
  const [inputData, setInputData] = useState<string>('')

  const toDetailPage = (id: string) => {
    setId(id)
    setDetail(true)
  }

  const columns: ColumnsType<TableType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mentor",
      dataIndex: "mentor",
      key: "mentor",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, value) => (
        <Space size="middle">
          <Button type="primary" onClick={() => toDetailPage(value.id)}>Detail</Button>
        </Space>
      ),
    },
  ];

  const {
    data: courses,
    isLoading,
    isFetching,
    refetch
  }: UseQueryResult<GetCourse, Error> = useQuery(
    ["courses"],
    async () => await CourseAPI.getAll({})
      .then((courses) => {
        let filteredList = courses.result.filter((course: GetCourseResult) => course.shortName.toLowerCase().includes(inputData))
        setNewTableData(
          filteredList.map((course: GetCourseResult): TableType => {
            return {
              id: course.id,
              name: course.shortName,
              mentor: course.mentor.firstName,
              field: course.field.name,
              level: course.courseLevel,
              status: course.status
            };
          })
        )
      })
  );

  if (isLoading) return <LoadingSkeleton />;

  console.log(courses?.result);
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
          placeholder="Search course name"
          bordered={false}
        />
      </div>
      <Table
        loading={isFetching}
        className={styled["table"]}
        columns={columns}
        dataSource={newTableData}
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
