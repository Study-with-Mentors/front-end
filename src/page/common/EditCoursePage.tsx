import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "./EditCoursePage.module.scss";
import { DownOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType } from "antd";
import { Form, Input, Popconfirm, Table, Button, Divider } from "antd";
import type { FormInstance } from "antd/es/form";

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

interface ExpandedDataType {
  key: React.Key;
  sessionId: string;
  description: string;
  title: string;
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
  sessionNumber: string;
  type: string;
  description: string;
  resourse: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const EditCoursePage = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      name: "Edward King 0",
      sessionNumber: "1",
      description: "this is description",
      resourse: "resourse",
      type: "UI",
    },
    {
      key: "1",
      name: "Edward King 1",
      sessionNumber: "2",
      description: "this is description",
      resourse: "resourse",
      type: "UI",
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "name",
      dataIndex: "name",
      editable: true,
      key: "name",
    },
    {
      title: "session number",
      dataIndex: "sessionNumber",
      key: "sessionNumber",
    },
    {
      title: "description",
      dataIndex: "description",
      width: "40%",
      key: "description",
    },
    {
      title: "resourse",
      dataIndex: "resourse",
      key: "resourse",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "operation",
      dataIndex: "operation",
      key: "operation",
      render: (_, record: { key?: React.Key }) =>
        dataSource.length >= 1 ? (
          <>
            <Button
              style={{
                marginRight: "16px",
              }}
              type="primary"
            >
              Add activity
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key ? record.key : 0)}
            >
              <a style={{ color: "red" }}>Delete</a>
            </Popconfirm>
          </>
        ) : (
          <></>
        ),
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `Edward King ${count}`,
      sessionNumber: `${count}`,
      description: "this is description",
      resourse: "resourse",
      type: "UI",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

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
        title: col.title,
        handleSave,
      }),
    };
  });

  const ExpandedRowRender = () => {
    const [expandedDataSource, setExpandedDataSource] = useState<
      ExpandedDataType[]
    >([
      {
        key: "0",
        sessionId: `${1}`,
        description: "description",
        title: "title",
      },
      {
        key: "1",
        sessionId: `${2}`,
        description: "description",
        title: "title",
      },
    ]);

    const handleDeleteSub = (key: React.Key) => {
      const newData = expandedDataSource.filter((item) => item.key !== key);
      setExpandedDataSource(newData);
    };

    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "session id", dataIndex: "sessionId", key: "sessionId" },
      { title: "description", dataIndex: "description", key: "description" },
      {
        title: "title",
        key: "title",
        dataIndex: "title",
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
              <a style={{ color: "red" }}>Delete</a>
            </Popconfirm>
          ) : (
            <></>
          ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={expandedDataSource}
        pagination={false}
      />
    );
  };

  const expandedRowRender = (value: any, object: any) => {
    return <ExpandedRowRender />;
  };

  return (
    <div className={styled["container"]}>
      <div className={styled["header"]}>
        <p className={styled["title"]}>Edit course</p>
      </div>
      <Divider />
      <div className={styled["body"]}>
        <div className={styled["session-wrapper"]}>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            Add session
          </Button>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            bordered
            dataSource={dataSource}
            columns={columns as ColumnTypes}
          />
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
