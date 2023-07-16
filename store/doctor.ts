import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { doctorSchema } from '~/miscs/schema';
import type { Doctor, DoctorRequiredFields } from '~/miscs/types';

const doctorListSchema = z.array(doctorSchema);

const storageKey = 'duty-table:doctor-list';

export const useDoctorStore = defineStore('doctor', () => {
  const { getItem, setItem } = useLocalStorage();

  const doctorList = ref<Doctor[]>(getItem(storageKey, doctorListSchema) ?? []);

  function insertDoctor(fields: DoctorRequiredFields): void {
    const newDoctor: Doctor = {
      ...fields,
      id: uuid(),
    };

    doctorList.value.push(newDoctor);
    setItem(storageKey, doctorList.value);
  }

  function removeDoctor(target: Doctor): void {
    const index = doctorList.value.findIndex(
      (doctor) => doctor.id === target.id,
    );

    if (index !== -1) {
      doctorList.value.splice(index, 1);
      setItem(storageKey, doctorList.value);
    }
  }

  return {
    doctorList,
    insertDoctor,
    removeDoctor,
  };
});
