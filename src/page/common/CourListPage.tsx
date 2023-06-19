import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space, TabsProps, Tabs } from "antd";
import React, { useMemo } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { CourseAPI } from "../../api/CourseAPI";
import { GetCourse, GetCourseResult } from "../../types/Course.type";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import styled from "./CourseListPage.module.scss";
import CourseCardHorizontal from "../../components/card/CourseCardHorizontal";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const onChange = (key: string) => {
  console.log(key);
};

type renderListCourseProps = {
  listCourse: GetCourseResult[];
};

// const renderListCourse = ({ listCourse }: renderListCourseProps) => {
//   const data = listCourse?.map((course) => ({
//     id: course.id,
//     title: course.shortName,
//     avatar: course.mentor.profileImage,
//     description: course.courseLevel,
//     content: course.description,
//     image: course.images[0],
//   }));

//   return (
//     <List
//       itemLayout="vertical"
//       size="large"
//       //   pagination={{
//       //     onChange: (page) => {
//       //       console.log(page);
//       //     },
//       //     pageSize: 3,
//       //   }}
//       dataSource={data}
//       renderItem={(item) => (
//         <List.Item
//           key={item.id}
//           actions={[
//             <IconText
//               icon={StarOutlined}
//               text="156"
//               key="list-vertical-star-o"
//             />,
//             <IconText
//               icon={LikeOutlined}
//               text="156"
//               key="list-vertical-like-o"
//             />,
//             <IconText
//               icon={MessageOutlined}
//               text="2"
//               key="list-vertical-message"
//             />,
//           ]}
//           extra={
//             <img
//               width={260}
//               alt="logo"
//               src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//             />
//           }
//         >
//           <List.Item.Meta
//             avatar={<Avatar src={item.avatar} />}
//             title={<a>{item.title}</a>}
//             description={`Level : ${item.description}`}
//           />
//           {item.content}
//         </List.Item>
//       )}
//     />
//   );
// };

const renderListCourse = ({ listCourse }: renderListCourseProps) => {
  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      {listCourse.map((course) => (
        <CourseCardHorizontal key={course.id} {...course} type="edit" />
      ))}
    </div>
  );
  // return <CourseCardHorizontal />;
};
const CourseListPage: React.FC = () => {
  const mentorID = localStorage.getItem("userID");

  const { data: courses, isLoading }: UseQueryResult<GetCourse, Error> =
    useQuery(
      ["courses", mentorID],
      async () => await CourseAPI.getAll({ mentorId: mentorID ?? "" }),
      {
        enabled: Boolean(mentorID),
      }
    );

  console.log(courses);

  const TabData: TabsProps["items"] = useMemo(() => {
    return [
      {
        key: "1",
        label: `Your courses`,
        children: renderListCourse({ listCourse: courses?.result ?? [] }),
      },
      {
        key: "2",
        label: `Enrolled courses`,
        children: `Content of Tab Pane 2`,
      },
    ];
  }, [courses]);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className={styled["container"]}>
      <Tabs defaultActiveKey="1" items={TabData} onChange={onChange} />
    </div>
  );
};

export default CourseListPage;
