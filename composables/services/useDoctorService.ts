import { storeToRefs } from 'pinia';

import { useDoctorStore } from '~/store/doctor';

export function useDoctorService() {
  const store = useDoctorStore();

  const { doctorList } = storeToRefs(store);
  const { insertDoctor, removeDoctor } = store;

  return { doctorList, insertDoctor, removeDoctor };
}
