import { z } from 'zod';
import { doctorRequiredFieldsSchema, doctorSchema } from './schema';

export type DoctorRequiredFields = z.infer<typeof doctorRequiredFieldsSchema>;

export type Doctor = z.infer<typeof doctorSchema>;
