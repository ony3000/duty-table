import { useDoctorRepository } from '../repositories';

export function useDoctorService() {
  const { doctorList, insertDoctor, removeDoctor } = useDoctorRepository();

  return { doctorList, insertDoctor, removeDoctor };
}
