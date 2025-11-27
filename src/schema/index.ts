import z from "zod";

export const applyFormSchema = z.object({
  name: z
    .string()
    .nonempty("გთხოვთ შეიყვანოთ სახელი და გვარი")
    .min(3, "სახელი და გვარი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს"),

  email: z
    .string()
    .nonempty("გთხოვთ შეიყვანოთ ელფოსტა")
    .min(5, "ელფოსტა უნდა შეიცავდეს მინიმუმ 5 სიმბოლოს")
    .email("გთხოვთ შეიყვანოთ ვალიდური ელფოსტა"),

  phone: z
    .string()
    .nonempty("გთხოვთ შეიყვანოთ ტელეფონი")
    .regex(
      /^\d{9}$/,
      "ტელეფონი უნდა შეიცავდეს ზუსტად 9 ციფრს, მაგალითად 555111222",
    ),
  resume: z
    .any()
    .refine((files) => files?.length === 1, "გთხოვთ ატვირთოთ ერთი PDF ფაილი")
    .refine(
      (files) => files?.[0]?.type === "application/pdf",
      "მხოლოდ PDF ფაილი არის დასაშვები!",
    ),
});
