import type { UploadFile } from "antd/es/upload/interface";

export interface ApplyFormInputs {
  name: string;
  email: string;
  phone: string;
  vacancyId: number; 
  resume: UploadFile[];
}