import type { applyFormSchema } from "@/schema/index";
import type z from "zod";

export type ApplyFormInputs = z.infer<typeof applyFormSchema>;

export interface ApplyFormProps {
  onFinish: (values: ApplyFormInputs) => void;
}
