import { z } from 'zod';

const baseFieldsSchema = z.object({
  id: z.string(),
});

export const doctorRequiredFieldsSchema = z.object({
  name: z.string(),
});

export const doctorSchema = baseFieldsSchema.merge(doctorRequiredFieldsSchema);

const dayRequiredFieldsSchema = z.object({
  /**
   * 공휴일 여부
   */
  isHoliday: z.boolean(),
});

export const daySchema = baseFieldsSchema.merge(dayRequiredFieldsSchema);

const slotRequiredFieldsSchema = z.object({
  dayId: z.string(),
});

export const slotSchema = baseFieldsSchema.merge(slotRequiredFieldsSchema);
