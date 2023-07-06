import { useDoctorStore } from '~/store/doctor';

export function useDoctorService() {
  const { doctorList, insertDoctor, removeDoctor } = useDoctorStore();

  return { doctorList, insertDoctor, removeDoctor };
}
