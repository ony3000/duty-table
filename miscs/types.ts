import { z } from 'zod';
import { doctorRequiredFieldsSchema, doctorSchema } from './schema';

export type DoctorRequiredFields = z.infer<typeof doctorRequiredFieldsSchema>;

export type Doctor = z.infer<typeof doctorSchema>;

/**
 * 숫자로 나타낸 요일 (0=일요일, 1=월요일, ..., 6=토요일)
 */
export type DayOfTheWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Day = {
  id: string;
  index: number;
  dayOfTheWeek: DayOfTheWeek;
  /**
   * 공휴일 여부
   */
  isHoliday: boolean;
};

export type Slot = {
  id: string;
  day: Day;
  doctor?: Doctor;
};
