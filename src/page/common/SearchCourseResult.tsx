import React, { useEffect, useMemo, useState, useContext } from "react";
import styled from "./SearchCourseResult.module.scss";
import { Form, SelectProps, Divider, Button, Pagination, Empty } from "antd";
import EditAndUpdateForm from "../../components/form/EditAndUpdateFrom";
import { EDIT_FIELD_TYPES } from "../../components/form/EditAndUpdateFrom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./SearchCourseResult.css";
import CourseCardHorizontal from "../../components/card/CourseCardHorizontal";
import { UseQueryResult, useQuery } from "react-query";
import { CourseAPI, SearchCourseParams } from "../../api/CourseAPI";
import { GetCourse } from "../../types/Course.type";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { EnumAPI } from "../../api/EnumAPI";
import { FieldAPI, GetField } from "../../api/FieldAPI";
import { useForm, useWatch } from "antd/lib/form/Form";
import { ActionEnum, DataContext } from "../../App";

export type SearchCourseResultProps = {};

let options: SelectProps["options"] = [];
let fieldOptions: SelectProps["options"] = [];
let coursesData: GetCourse = { totalElements: 0, totalPages: 0, result: [] };

const enum ACTIVE_BUTTON_TYPES {
  NEWEST,
  OLDEST,
  POPULAR,
}

const onFinish = (values: any) => {
  console.log(values);
};

const SearchCourseResult = ({}: SearchCourseResultProps) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(DataContext);

  const [form] = useForm();
  const level: string[] = useWatch("level", form);
  const field: string[] = useWatch("fields", form);

  const [activeButton, setActiveButton] = useState<ACTIVE_BUTTON_TYPES>(
    ACTIVE_BUTTON_TYPES.NEWEST
  );

  const {
    data: courses,
    isLoading: isCoursesLoading,
    refetch,
    isFetching,
  }: UseQueryResult<GetCourse, Error> = useQuery(
    ["courses", state?.data, level, field],
    async () => {
      const params: SearchCourseParams = {
        ...(state?.data && { name: state?.data }),
        ...(level?.[0] && { level: level?.[0]! }),
        ...(field && { field }),
      };
      return await CourseAPI.getAll(params);
    }
  );

  const {
    data: levels,
    isLoading: isLevelLoading,
  }: UseQueryResult<string[], Error> = useQuery(
    ["levels"],
    async () =>
      await EnumAPI.getCourseLevel()
        .then((levels) => {
          options = levels.map((level: string) => {
            return {
              value: level,
              label: level,
              style: {
                marginTop: "12px",
                color: "#5F6980",
              },
            };
          });
        })
        .catch()
  );

  const {
    data: fields,
    isLoading: isFieldsLoading,
  }: UseQueryResult<GetField[], Error> = useQuery(
    ["fields"],
    async () =>
      await FieldAPI.getAll().then((fields) => {
        fieldOptions = fields.map((field: GetField) => {
          return {
            value: field.code,
            label: field.name,
            style: {
              marginTop: "12px",
              color: "#5F6980",
            },
          };
        });
      })
  );

  const search_filter_fields = useMemo(() => {
    return [
      {
        type: EDIT_FIELD_TYPES.SELECT,
        fieldProps: {
          placeholder: "Fields",
          name: "fields",
          options: fieldOptions,

          label: (
            <p
              style={{
                fontWeight: 700,
                fontSize: "24px",
                color: "#262626",
                margin: 0,
              }}
            >
              Field
            </p>
          ),
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
            marginBottom: "20px",
            fontWeight: 700,
            fontSize: "20px",
          },
          onChange: (value: any) => {},
        },
        cols: 12,
      },
      {
        type: EDIT_FIELD_TYPES.SELECT,
        fieldProps: {
          name: "level",
          options: options,
          label: (
            <p
              style={{
                fontWeight: 700,
                fontSize: "24px",
                color: "#262626",
                margin: 0,
              }}
            >
              Level
            </p>
          ),
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
            marginBottom: "20px",
            fontWeight: 700,
            fontSize: "20px",
          },
          onChange: (value: any) => {},
        },
        cols: 12,
      },
    ];
  }, [options, fieldOptions]);

  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <p className={styled["sub-title"]}>Filter By</p>
        <div className={styled["sort-container"]}>
          <p className={styled["title"]}>Sort By</p>
          <Button
            className={
              styled["button"] +
              " " +
              (activeButton == ACTIVE_BUTTON_TYPES.NEWEST
                ? styled["active"]
                : "")
            }
            onClick={() => setActiveButton(ACTIVE_BUTTON_TYPES.NEWEST)}
          >
            Newest
          </Button>
          <Button
            className={
              styled["button"] +
              " " +
              (activeButton == ACTIVE_BUTTON_TYPES.OLDEST
                ? styled["active"]
                : "")
            }
            onClick={() => setActiveButton(ACTIVE_BUTTON_TYPES.OLDEST)}
          >
            Oldest
          </Button>
          <Button
            className={
              styled["button"] +
              " " +
              (activeButton == ACTIVE_BUTTON_TYPES.POPULAR
                ? styled["active"]
                : "")
            }
            onClick={() => setActiveButton(ACTIVE_BUTTON_TYPES.POPULAR)}
          >
            Popular
          </Button>
        </div>
        <Button
          loading={isFetching}
          onClick={() => {
            dispatch({ type: ActionEnum.SET, payload: { value: "" } });
            refetch();
          }}
        >
          Show all
        </Button>
      </div>
      <div className={styled["body-container"]}>
        <div className={styled["filter-wrapper"]}>
          <Form
            name="search_filter"
            wrapperCol={{ span: 16 }}
            initialValues={{}}
            layout="vertical"
            onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            form={form}
            autoComplete="off"
          >
            <EditAndUpdateForm fields={search_filter_fields} />
          </Form>
        </div>

        <div className={styled["course-container"]}>
          {isCoursesLoading || isFetching ? (
            <LoadingSkeleton />
          ) : courses == undefined || courses?.result.length == 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            courses?.result.map((course) => (
              <CourseCardHorizontal key={course.id} {...course} />
            ))
          )}
        </div>
      </div>
      <Pagination
        style={{
          marginLeft: "auto",
          marginBottom: "200px",
        }}
        defaultCurrent={1}
        total={50}
      />
    </div>
  );
};

export default SearchCourseResult;
