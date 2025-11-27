import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { applyFormSchema } from "@/schema/index";
import type { ApplyFormInputs, ApplyFormProps } from "./index.types";
import { applyFormDefaultvalues } from "@/data";

const ApplyForm: React.FC<ApplyFormProps> = ({ onFinish }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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
    beforeUpload: (file: File) => {
      if (file.type !== "application/pdf") {
        message.error("მხოლოდ PDF ფაილი არის დასაშვები!");
        return false;
      }
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setShowPreview(false); 
      return false; 
    },
    maxCount: 1,
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
              <Upload
                {...pdfUploadProps}
                fileList={field.value}
                onChange={({ fileList }) => field.onChange(fileList)}
              >
                <Button icon={<UploadOutlined />}>ატვირთეთ PDF</Button>
              </Upload>

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
