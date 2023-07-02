import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useReducer,
} from "react";
import styled from "./EditCoursePage.module.scss";
import type { InputRef, TableColumnsType, TabsProps } from "antd";
import {
  Form,
  Input,
  Popconfirm,
  Table,
  Button,
  Spin,
  Tabs,
  message,
} from "antd";
import type { FormInstance } from "antd/es/form";
import { useNavigate, useParams } from "react-router-dom";
import { UseQueryResult, useQuery } from "react-query";
import { GetSessionResult } from "../../types/Session.type";
import {
  CreateSessionParams,
  SessionAPI,
  UpdateSessionParams,
} from "../../api/SessionAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { GetActivityResult } from "../../types/Activity.type";
import { useCreateSession } from "../../hooks/useCreateSessionHook";
import { SessionType } from "../../types/Enum.type";
import { useUpdateSession } from "../../hooks/useUpdateSessionHook";
import { useCreateActivity } from "../../hooks/useCreateActivityHook";
import { UpdateActivityParams } from "../../api/ActivityAPI";
import { useUpdateActivity } from "../../hooks/useUpdateActivityHook";
import { useDeleteActivity } from "../../hooks/useDeleteActivityHook";
import { useDeleteSession } from "../../hooks/useDeleteSessionHook";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { deepEqual } from "../../utils/object";
import CourseDetailPage from "./CourseDetailPage";

//main table props
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  sessionNumber: string;
  type: string;
  description: string;
  resourse: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  sessionNumber: number;
  type: string;
  description: string;
  resourse: string;
  version: number;
  activityList: GetActivityResult[];
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

////////////////////////////////////

//Expanded table props

interface EditableExpandedRowProps {
  index: number;
}

interface EditableExpandCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof ExpandedDataType;
  record: ExpandedDataType;
  handlesavesub: (record: ExpandedDataType) => void;
}

const EditableExpandedCell: React.FC<EditableExpandCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handlesavesub,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handlesavesub({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditableExpandedRow: React.FC<EditableExpandedRowProps> = ({
  index,
  ...props
}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface ExpandedDataType {
  key: React.Key;
  description: string;
  title: string;
  sessionId: string;
}

type ExpandedDataProps = {
  activityList: ExpandedDataType[];
  sessionId: string;
};

///////////////////////////////////

const EditCoursePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    data: sessions,
    isLoading,
    refetch,
    isFetching,
  }: UseQueryResult<GetSessionResult[], Error> = useQuery(
    ["sessions", params?.id],
    async () => await SessionAPI.getSessionByCourseID(params?.id ?? "0"),
    {
      enabled: Boolean(params?.id),
    }
  );

  const {
    mutate: createSession,
    isLoading: isCreateSessionLoading,
    error,
    // data,
  } = useCreateSession();
  const {
    mutate: createActivity,
    isLoading: isCreateActivityLoading,
    error: errorCreateActivity,
    // data,
  } = useCreateActivity();

  const {
    mutate: updateSession,
    isLoading: isUpdateSessionLoading,
    error: isUpdateSessionError,
    // data,
  } = useUpdateSession();

  const {
    mutate: updateActivity,
    isLoading: isUpdateActivityLoading,
    error: isUpdateActivityError,
    // data,
  } = useUpdateActivity();
  const {
    mutate: deleteActivity,
    isLoading: isDeletectivityLoading,
    error: isDeleteActivityError,
    // data,
  } = useDeleteActivity();

  const {
    mutate: deleteSession,
    isLoading: isDeleteSessionLoading,
    error: isDeleteSessionError,
    // data,
  } = useDeleteSession();

  const [count, setCount] = useState(0);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    var data = sessions?.map((session): DataType => {
      return {
        key: session.id,
        description: session.description,
        name: session.sessionName,
        sessionNumber: session.sessionNum,
        resourse: session.resource,
        type: session.type,
        activityList: session.activities,
        version: session.version,
      };
    });

    setDataSource(data ?? []);

    return () => {};
  }, [sessions]);

  const handleDelete = (key: React.Key) => {
    deleteSession(key.toString(), {
      onSuccess(data, variables, context) {
        refetch();
      },
      onError(error, variables, context) {
        console.log(error);
        messageApi.open({
          type: "error",
          content: "Unable to modify this course!",
        });
      },
    });
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Session Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Session number",
      dataIndex: "sessionNumber",
      editable: true,
      key: "sessionNumber",
      // defaultSortOrder: "ascend",
      // sorter: (a: any, b: any) => a?.sessionNumber - b?.sessionNumber,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
      editable: true,
    },
    {
      title: "Resourse",
      dataIndex: "resourse",
      key: "Resourse",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: (_, record: { key?: React.Key }) =>
        dataSource.length >= 1 ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <Button
              loading={isCreateActivityLoading}
              style={{
                marginRight: "4px",
                flex: "1",
              }}
              type="primary"
              icon={<AddIcon />}
              onClick={() => {
                createActivity(
                  {
                    sessionId: record.key?.toString() ?? "",
                    description: "description",
                    title: "title",
                  },
                  {
                    onSuccess(data, variables, context) {
                      refetch();
                    },
                    onError(error, variables, context) {
                      console.log(error);
                      messageApi.open({
                        type: "error",
                        content: "Unable to modify this course!",
                      });
                    },
                  }
                );
              }}
            ></Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key ?? "")}
            >
              <Button
                style={{
                  flex: "1",
                }}
                type="primary"
                danger
                loading={isDeleteSessionLoading}
                icon={<DeleteIcon />}
              ></Button>
            </Popconfirm>
          </div>
        ) : (
          <></>
        ),
    },
  ];

  const handleAdd = async () => {
    const newData: CreateSessionParams = {
      courseId: params?.id!,
      sessionName: "new session name",
      activities: [],
      resource: "new resourse",
      sessionNum: 0,
      type: SessionType.NONE,
      description: "new description",
    };

    await createSession(newData, {
      onSuccess(data, variables, context) {
        refetch();
      },
      onError(error, variables, context) {
        console.log(error, variables, context);
        messageApi.open({
          type: "error",
          content: "Unable to modify this course!",
        });
      },
    });
    // setDataSource([...dataSource, newData]);
    // setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    var checkEqual: boolean = deepEqual(
      row,
      dataSource.find((x) => x.key == row.key)
    );
    if (!checkEqual) {
      var updateParams: UpdateSessionParams = {
        id: row.key.toString(),
        activities: row.activityList,
        courseId: params?.id!,
        description: row.description,
        resource: row.resourse,
        sessionName: row.name,
        sessionNum: row.sessionNumber,
        type: SessionType.NONE,
        version: row.version,
      };

      updateSession(updateParams, {
        onSuccess(data, variables, context) {
          refetch();
        },
        onError(error, variables, context) {
          console.log(error);
          messageApi.open({
            type: "error",
            content: "Unable to modify this course!",
          });
        },
      });
    } else {
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const ExpandedRowRender = ({
    activityList,
    sessionId,
  }: ExpandedDataProps) => {
    const [expandedDataSource, setExpandedDataSource] =
      useState<ExpandedDataType[]>(activityList);

    const handlesavesub = async (row: ExpandedDataType) => {
      var checkEqual: boolean = deepEqual(
        row,
        activityList.find((x) => x.key == row.key)
      );
      if (!checkEqual) {
        const params: UpdateActivityParams = {
          id: row.key.toString(),
          description: row.description,
          title: row.title,
          version: 0,
          sessionId: row.sessionId,
        };
        await updateActivity(params, {
          onSuccess(data, variables, context) {
            refetch();
          },
          onError(error, variables, context) {
            console.log(error);
            messageApi.open({
              type: "error",
              content: "Unable to modify this course!",
            });
          },
        });
      } else {
      }
    };

    const handleDeleteSub = (key: React.Key) => {
      deleteActivity(key.toString(), {
        onSuccess(data, variables, context) {
          refetch();
        },
        onError(error, variables, context) {
          console.log(error);
          messageApi.open({
            type: "error",
            content: "Unable to modify this course!",
          });
        },
      });
    };

    const expandComponents = {
      body: {
        row: EditableExpandedRow,
        cell: EditableExpandedCell,
      },
    };

    const defaultExpandedcolumns: (ColumnTypes[number] & {
      editable?: boolean;
      dataIndex: string;
    })[] = [
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        editable: true,
      },
      {
        title: "Title",
        key: "title",
        dataIndex: "title",
        editable: true,
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: (_, record: { key?: React.Key }) =>
          expandedDataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeleteSub(record.key ? record.key : 0)}
            >
              <Button
                type="primary"
                danger
                loading={isDeletectivityLoading}
                icon={<DeleteIcon />}
              ></Button>
            </Popconfirm>
          ) : (
            <></>
          ),
      },
    ];

    const expandedcolumns = defaultExpandedcolumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: ExpandedDataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handlesavesub,
        }),
      };
    });

    return (
      <Table
        rowClassName={() => "editable-row"}
        components={expandComponents}
        columns={expandedcolumns as ColumnTypes}
        dataSource={expandedDataSource}
        pagination={false}
      />
    );
  };

  const expandedRowRender = (values: object) => {
    const list = values as DataType;
    var data: ExpandedDataType[] = list.activityList.map(
      (item): ExpandedDataType => {
        return {
          description: item.description,
          key: item.id,
          title: item.title,
          sessionId: list.key.toString(),
        };
      }
    );
    return (
      <Spin spinning={isUpdateActivityLoading}>
        <ExpandedRowRender
          activityList={data}
          sessionId={list.key.toString()}
        />
      </Spin>
    );
  };

  // Tab renderer
  const renderSessionsAndActivities = () => {
    return (
      <div className={styled["session-wrapper"]}>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ margin: 16 }}
          loading={isCreateSessionLoading}
        >
          Add session
        </Button>

        <Table
          components={components}
          rowClassName={() => "editable-row"}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          bordered
          loading={isFetching || isUpdateSessionLoading}
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </div>
    );
  };

  const renderCourseDetail = () => {
    return <CourseDetailPage />;
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Sessions and Activities`,
      children: renderSessionsAndActivities(),
    },
    {
      key: "2",
      label: `Course detail`,
      children: renderCourseDetail(),
    },
  ];

  ///////////////////////////////////////////////////////

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className={styled["container"]}>
      {contextHolder}

      <div className={styled["header"]}>
        <p className={styled["title"]}>Edit course</p>
      </div>
      {/* <Divider /> */}
      <div className={styled["body"]}>
        <Tabs
          defaultActiveKey="1"
          items={items}
          tabBarExtraContent={
            <Button
              onClick={() =>
                navigate(`/home/course/create-class/${params?.id}`)
              }
              type="primary"
            >
              Create class
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default EditCoursePage;
