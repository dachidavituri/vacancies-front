import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, Upload, message, Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { applyFormSchema } from "@/schema/index";
import type { ApplyFormInputs, ApplyFormProps } from "./index.types";
import { applyFormDefaultvalues } from "@/data";


const ApplyForm: React.FC<ApplyFormProps> = ({ onFinish }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplyFormInputs>({
    resolver: zodResolver(applyFormSchema),
    defaultValues: applyFormDefaultvalues,
  });

  const pdfUploadProps = {
    maxCount: 1,
    customRequest: async (options: any) => {
      const { file, onSuccess, onError, onProgress } = options;
      try {
        if (file.type !== "application/pdf") {
          message.error("მხოლოდ PDF ფაილი არის დასაშვები!");
          return onError?.(new Error("Invalid file type"));
        }
        const simulateUpload = () => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);

            onProgress?.({ percent: progress });

            if (progress >= 100) {
              clearInterval(interval);
              const url = URL.createObjectURL(file);
              setPdfUrl(url);
              onSuccess?.("ok");
            }
          }, 150);
        };

        simulateUpload();
      } catch (error) {
        console.error(error);
        onError?.(error);
      }
    },
  };

  const onSubmit = (data: ApplyFormInputs) => {
    onFinish(data);
    reset();
    setPdfUrl(null);
    setShowPreview(false);
  };

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="სახელი და გვარი"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name?.message}
            >
              <Input placeholder="name" {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="ელფოსტა"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Input placeholder="example@mail.com" {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="ტელეფონი"
              validateStatus={errors.phone ? "error" : ""}
              help={errors.phone?.message}
            >
              <Input placeholder="+995 5XX XXX XXX" {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="resume"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="CV Upload (PDF only)"
              validateStatus={errors.resume ? "error" : ""}
              help={errors.resume?.message as string}
            >
              <Upload.Dragger
                {...pdfUploadProps}
                fileList={field.value}
                onChange={({ file, fileList }) => {
                  field.onChange(fileList);

                  if (file.status === "removed") {
                    setUploadProgress(0);
                    setPdfUrl(null);
                    setShowPreview(false);
                  }
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  ჩააგდეთ PDF ფაილი ან დააკლიკეთ ატვირთვისთვის
                </p>
                <p className="ant-upload-hint">მხოლოდ PDF ფაილია დასაშვები</p>
              </Upload.Dragger>
              {uploadProgress > 0 && (
                <Progress
                  percent={uploadProgress}
                  status={uploadProgress === 100 ? "success" : "active"}
                />
              )}

              {pdfUrl && (
                <Button
                  type="default"
                  style={{ marginTop: 10 }}
                  onClick={() => setShowPreview(!showPreview)}
                >
                  CV Preview
                </Button>
              )}
            </Form.Item>
          )}
        />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ backgroundColor: "#3A6FF8", borderColor: "#3A6FF8" }}
          >
            გაგზავნა
          </Button>
        </Form.Item>
      </Form>

      {showPreview && pdfUrl && (
        <div style={{ marginTop: 20 }}>
          <iframe
            src={pdfUrl}
            width="100%"
            height="500px"
            style={{ border: "1px solid #ccc", borderRadius: 8 }}
          />
        </div>
      )}
    </>
  );
};

export default ApplyForm;
