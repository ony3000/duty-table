import { z } from 'zod';
import {
  doctorRequiredFieldsSchema,
  doctorSchema,
  daySchema,
  slotSchema,
} from './schema';

export type DoctorRequiredFields = z.infer<typeof doctorRequiredFieldsSchema>;

export type Doctor = z.infer<typeof doctorSchema>;

export type Day = z.infer<typeof daySchema>;

export type Slot = z.infer<typeof slotSchema>;

/**
 * 숫자로 나타낸 요일 (0=일요일, 1=월요일, ..., 6=토요일)
 */
export type DayOfTheWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ExtendedDay = Day & {
  index: number;
  /**
   * 평일(월-목)과 주말(금-일)을 구분하기 위한 index 기반의 값
   */
  indexGroup: number;
  dayOfTheWeek: DayOfTheWeek;
};

export type ExtendedSlot = Omit<Slot, 'dayId'> & {
  day: ExtendedDay;
  doctor?: Doctor;
};
