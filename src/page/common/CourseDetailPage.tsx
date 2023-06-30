import React, { useMemo } from "react";
import {
  Form,
  SelectProps,
  notification,
  Upload,
  UploadProps,
  Image as NewImage,
} from "antd";
import { UseQueryResult, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GetCourseResult } from "../../types/Course.type";
import { CourseAPI, UpdateCourseParams } from "../../api/CourseAPI";
import LoadingSkeleton from "../../components/skeleton/LoadingSkeleton";
import EditAndUpdateForm, {
  EDIT_FIELD_TYPES,
} from "../../components/form/EditAndUpdateFrom";
import "./CourseDetailPage.css";
import ImgCrop from "antd-img-crop";
import styled from "./CourseDetailPage.module.scss";
import { GetField } from "../../types/Field.type";
import { FieldAPI } from "../../api/FieldAPI";
import { EnumAPI } from "../../api/EnumAPI";
import { useUpdateCourse } from "../../hooks/useUpdateCourseHook";
import type {
  RcFile,
  UploadFile,
  UploadProps as UploadPropsInterface,
} from "antd/es/upload/interface";

const onPreview = async (file: UploadFile) => {
  let src = file.url as string;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.onload = () => resolve(reader.result as string);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

const props: UploadProps = {
  name: "file",
  beforeUpload: () => false,
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log("done");
    } else if (info.file.status === "error") {
      console.log("error");
    }
  },
  onPreview,
  progress: {
    style: {
      display: "none",
    },
  },
  showUploadList: false,
};

var fieldOptions: SelectProps["options"] = [];

var levelOptions: SelectProps["options"] = [];

var statusOptions: SelectProps["options"] = [];

var intendedLearnerOptions: SelectProps["options"] = [];

const CourseDetailPage = () => {
  //Notification
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api["success"]({
      message: "Course update successfully!",
    });
  };
  //

  const params = useParams();
  const {
    mutate: updateCourse,
    isLoading: isUpdateCourseLoading,
    error,
  } = useUpdateCourse();

  const {
    data,
    isLoading,
    refetch,
    isFetching,
  }: UseQueryResult<GetCourseResult, Error> = useQuery(
    ["course", params?.id],
    async () => await CourseAPI.getById(params?.id!),
    {
      enabled: Boolean(params?.id),
    }
  );

  const {
    data: fields,
    isLoading: isFieldsLoading,
  }: UseQueryResult<GetField[], Error> = useQuery(
    ["fields"],
    async () =>
      await FieldAPI.getAll().then((fields) => {
        fieldOptions = fields.map((field: GetField) => {
          return { value: field.id, label: field.name };
        });
      })
  );

  const {
    data: status,
    isLoading: isStatusLoading,
  }: UseQueryResult<string[], Error> = useQuery(
    ["status"],
    async () =>
      await EnumAPI.getCourseStatus().then((items) => {
        statusOptions = items.map((item: string) => {
          return { value: item, label: item };
        });
      })
  );

  const {
    data: intendedLearner,
    isLoading: isIntendedLearnerLoading,
  }: UseQueryResult<string[], Error> = useQuery(
    ["intendtedLearner"],
    async () =>
      await EnumAPI.getCourseIntendedLearner().then((items) => {
        intendedLearnerOptions = items.map((item: string) => {
          return { value: item, label: item };
        });
      })
  );

  const {
    data: levels,
    isLoading: isLevelLoading,
  }: UseQueryResult<string[], Error> = useQuery(
    ["levels"],
    async () =>
      await EnumAPI.getCourseLevel().then((levels) => {
        levelOptions = levels.map((level: string) => {
          return {
            value: level,
            label: level,
          };
        });
      })
  );

  const onFinish = async (values: any) => {
    const updateParams: UpdateCourseParams = {
      id: params?.id ?? "",
      courseLevel: values?.level,
      description: values?.description,
      field: { id: values?.field },
      fullName: values?.fullname,
      intendedLearner: values?.intendedLearner,
      learningOutcome: values?.learningOutcome,
      shortName: values?.shortname,
      status: values?.status,
      version: 0,
    };
    updateCourse(updateParams, {
      onSuccess(data, variables, context) {
        openNotificationWithIcon();
        refetch();
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
  };

  const left_profile_fields = [
    {
      type: EDIT_FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "Fullname",
        name: "fullname",
        label: "Fullname",
        rules: { required: true, message: "Fullname must not empty!" },
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
      type: EDIT_FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "Shortname",
        name: "shortname",
        label: "Shortname",
        rules: { required: true, message: "Shortname must not empty!" },
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
      type: EDIT_FIELD_TYPES.TEXTAREA,
      fieldProps: {
        placeholder: "Description",
        name: "description",
        label: "Description",
        rules: { required: true, message: "Description must not empty!" },
        style: {
          marginBottom: "1.6rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
    {
      type: EDIT_FIELD_TYPES.TEXT,
      fieldProps: {
        placeholder: "Learning outcome",
        name: "learningOutcome",
        label: "Learning outcome",
        rules: { required: true, message: "This field must not empty!" },
        style: {
          width: "500px",
          height: "50px",
          marginBottom: "3.5rem",
        },
        onChange: (value: any) => {},
      },
      cols: 12,
    },
  ];

  const right_profile_fields = useMemo(() => {
    return [
      {
        type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
        fieldProps: {
          placeholder: "Field",
          name: "field",
          label: "Field",
          rules: { required: true, message: "This field must not empty!" },
          options: fieldOptions,
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
        type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
        fieldProps: {
          placeholder: "Status",
          name: "status",
          label: "Status",
          rules: { required: true, message: "This field must not empty!" },
          options: statusOptions,
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
        type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
        fieldProps: {
          placeholder: "Intended learner",
          name: "intendedLearner",
          label: "Intended Learner",
          rules: { required: true, message: "This field must not empty!" },
          options: intendedLearnerOptions,
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
        type: EDIT_FIELD_TYPES.SELECTMULTIOPTION,
        fieldProps: {
          name: "level",
          placeholder: "Level",
          options: levelOptions,
          rules: { required: true, message: "This field must be select!" },
          label: "Level",
          style: {
            width: "500px",
            height: "50px",
            marginBottom: "3.4rem",
          },
          cols: 12,
        },
      },
      {
        type: EDIT_FIELD_TYPES.BUTTON,
        formProps: {
          // wrapperCol: { span: 24, offset: 17 },
        },
        fieldProps: {
          type: "primary",
          htmlType: "submit",
          text: "Save",
          loading: isUpdateCourseLoading,
          style: {
            borderRadius: ".5rem",
          },
        },
        cols: 12,
      },
    ];
  }, [
    isUpdateCourseLoading ||
      isFieldsLoading ||
      isLevelLoading ||
      isStatusLoading ||
      isIntendedLearnerLoading,
  ]);

  if (
    isLoading ||
    isFieldsLoading ||
    isLevelLoading ||
    isStatusLoading ||
    isIntendedLearnerLoading
  )
    return <LoadingSkeleton />;

  return (
    <div className={styled["container"]}>
      <div className={styled["img-wrapper"]}>
        <ImgCrop rotationSlider>
          <Upload
            {...props}
            onChange={async ({ fileList }) => {
              // setloadingAvatar(true);
              // var url = await uploadImage(fileList[0].originFileObj);
              // setloadingAvatar(false);
              // if (url) {
              //   mutate(
              //     {
              //       url: url,
              //       id: localStorage.getItem("userID")!,
              //       version: 0,
              //     },
              //     {
              //       onSuccess(data, variables, context) {
              //         refetch();
              //       },
              //     }
              //   );
              // }
            }}
          >
            <NewImage
              height={428}
              className={styled["img"]}
              src={data?.image.url}
              preview={false}
              alt="image"
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA
            AMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3aw
            yMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmM
            L4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBob
            tQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAg
            AAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4
            BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBE
            lAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEeg
            JmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkA
            EEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJ
            EkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+h
            i2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAE
            CRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZF
            bJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEX
            dvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31
            dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAg
            uWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYEN
            Rdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2Arb
            XTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2
            aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/E
            bcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAk
            Qo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChU
            LMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs02
            1JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHM
            CRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JEC
            Fno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
            />
            <p className={styled["description"]}>Edit</p>
          </Upload>
        </ImgCrop>
      </div>

      <Form
        name="personal_detail"
        wrapperCol={{ span: 16 }}
        initialValues={{
          ["fullname"]: data?.fullName,
          ["shortname"]: data?.shortName,
          ["description"]: data?.description,
          ["learningOutcome"]: data?.learningOutcome,
          ["field"]: data?.field.id,
          ["intendedLearner"]: data?.intendedLearner,
          ["status"]: data?.status,
          ["level"]: data?.courseLevel,
        }}
        layout="vertical"
        requiredMark="optional"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          display: "flex",
        }}
      >
        <div className={styled["left-wrapper"]}>
          <EditAndUpdateForm fields={left_profile_fields} />
        </div>
        <div className={styled["right-wrapper"]}>
          <EditAndUpdateForm fields={right_profile_fields} />
        </div>
      </Form>
    </div>
  );
};

export default CourseDetailPage;
