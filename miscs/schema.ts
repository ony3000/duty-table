import { z } from 'zod';

const baseFieldsSchema = z.object({
  id: z.string(),
});

export const doctorRequiredFieldsSchema = z.object({
  name: z.string(),
});

export const doctorSchema = baseFieldsSchema.merge(doctorRequiredFieldsSchema);
