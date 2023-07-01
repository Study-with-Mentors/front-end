import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Form,
  Input,
  Table,
  DatePicker,
  Typography,
  Divider,
  Result,
  Button,
} from "antd";
import styled from "./CreateClassPage.module.scss";
import EditAndUpdateForm, {
  EDIT_FIELD_TYPES,
} from "../../components/form/EditAndUpdateFrom";
import { UseQueryResult, useQuery } from "react-query";
import { GetSessionResult } from "../../types/Session.type";
import { SessionAPI } from "../../api/SessionAPI";
import { useNavigate, useParams } from "react-router-dom";
import type { InputRef } from "antd";
import type { FormInstance } from "antd/es/form";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { SmileOutlined } from "@ant-design/icons";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import { useCreateClass } from "../../hooks/useCreateClassHook";
import { CreateClassParams } from "../../api/ClassAPI";
import { CreateLessonParams } from "../../api/LessonAPI";

const onSelectedDateChange = (value: any, dateString: any) => {
  console.log(value);
};

const { RangePicker } = DatePicker;
const { Title } = Typography;
//editable table

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
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

enum EditableType {
  INPUT = "INPUT",
  RANGEPICKER = "RANGEPICKER",
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  editType: EditableType;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  editType,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
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
        {editType != EditableType.RANGEPICKER ? (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        ) : (
          <RangePicker
            showTime
            ref={inputRef}
            onOk={save}
            // onPressEnter={save}
            onBlur={save}
          ></RangePicker>
        )}
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
  sessionName: string;
  time?: Dayjs[];
  location: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

//////////////////
const CreateClassPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  //Editable table func
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const {
    data: sessions,
    isLoading: isSessionLoading,
  }: UseQueryResult<GetSessionResult[], Error> = useQuery(
    ["sessions", params?.id],
    async () =>
      await SessionAPI.getSessionByCourseID(params?.id!)
        .then((sessions) => {
          setDataSource(
            sessions.map((session: GetSessionResult): DataType => {
              return {
                key: session.id,
                sessionName: session.sessionName,
                location: "location",
              };
            })
          );
        })
        .catch((err) => console.log(err))
  );

  const {
    error: isCreateClassError,
    isLoading: isCreateClassLoading,
    isSuccess: isCreateClassSuccess,
    mutate: createClass,
  } = useCreateClass();

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    editType?: EditableType;
  })[] = [
    {
      title: "Session name",
      dataIndex: "sessionName",
      width: "40%",
    },
    {
      title: "Start date - End date",
      dataIndex: "time",
      render(value, record, index) {
        return <RangePicker value={value} inputReadOnly showTime></RangePicker>;
      },
      editable: true,
      editType: EditableType.RANGEPICKER,
    },

    {
      title: "Location",
      dataIndex: "location",
      editable: true,
      editType: EditableType.INPUT,
      width: "20%",
    },
  ];

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
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
        editType: col.editType,
        title: col.title,
        handleSave,
      }),
    };
  });

  /////////////////////

  const onFinish = (values: any, extraValue: DataType[]) => {
    var lessonCreateParams: CreateLessonParams[] = extraValue.map(
      (item, index) => {
        return {
          sessionId: item.key.toString(),
          lessonNum: index + 1,
          location: item.location,
          startTime: item.time?.[0].format("YYYY-MM-DD HH:mm:ss")!,
          endTime: item.time?.[0].format("YYYY-MM-DD HH:mm:ss")!,
        };
      }
    );
    const createParams: CreateClassParams = {
      courseId: params?.id!,
      startDate: values.date[0].format("YYYY-MM-DD"),
      endDate: values.date[1].format("YYYY-MM-DD"),
      enrollmentEndDate: values.enrollmentEndDate.format("YYYY-MM-DD"),
      price: values.price,
      lessonCreateDtos: lessonCreateParams,
    };
    createClass(createParams);
    console.log(values, extraValue, createParams);
  };

  const class_fields = [
    {
      type: EDIT_FIELD_TYPES.RANGEPICKERDATE,
      fieldProps: {
        name: "date",
        label: "Start date - End date",
        rules: { required: true, message: "This field must not empty!" },
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "3rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
    {
      type: EDIT_FIELD_TYPES.SELECTDATE,
      fieldProps: {
        name: "enrollmentEndDate",
        label: "Enrollment end date",
        rules: {
          required: true,
          message: "Enrollment end date must not empty!",
        },
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "3.5rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
    {
      type: EDIT_FIELD_TYPES.NUMERIC,
      fieldProps: {
        placeholder: "Price",
        name: "price",
        label: "Price",
        rules: { required: true, message: "Price must not empty!" },
        minValue: 0,
        maxValue: Number.MAX_VALUE,
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "5rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
  ];

  const action_fields = useMemo(() => {
    return [
      {
        type: EDIT_FIELD_TYPES.BUTTON,
        formProps: {
          // wrapperCol: { span: 24, offset: 9 },
        },
        fieldProps: {
          type: "primary",
          htmlType: "submit",
          text: "Save",
          loading: isCreateClassLoading,
          style: {},
        },
        cols: 12,
      },
    ];
  }, [isCreateClassLoading]);

  if (isSessionLoading) return <LoadingSkeleton />;

  if (isCreateClassSuccess)
    return (
      <Result
        icon={<SmileOutlined />}
        title="Great, we have done all the operations!"
        extra={
          <Button onClick={() => navigate("/home/course")} type="primary">
            Countinue
          </Button>
        }
      />
    );

  if (isCreateClassError)
    return (
      <Result
        status="error"
        title="Something went wrong went creating class!"
        extra={
          <Button onClick={() => navigate("/home/course")} type="primary">
            Countinue
          </Button>
        }
      />
    );

  return (
    <div className={styled["container"]}>
      <Title level={2}>Create class</Title>
      <Divider />
      <Form
        name="personal_detail"
        wrapperCol={{ span: 16 }}
        initialValues={{}}
        layout="vertical"
        requiredMark="optional"
        onFinish={(values) => onFinish(values, dataSource)}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "left",
        }}
      >
        <EditAndUpdateForm fields={class_fields} />
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          pagination={false}
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
        <EditAndUpdateForm fields={action_fields} />
      </Form>
    </div>
  );
};

export default CreateClassPage;
