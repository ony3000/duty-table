import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

import type { Doctor, DoctorRequiredFields } from '~/miscs/types';

const storageKey = 'duty-table:doctor-list';

function isDoctor(arg: unknown): arg is Doctor {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    'id' in arg &&
    'name' in arg &&
    typeof arg.id === 'string' &&
    typeof arg.name === 'string'
  );
}

function isDoctorArray(arg: unknown): arg is Doctor[] {
  return Array.isArray(arg) && arg.every(isDoctor);
}

export const useDoctorStore = defineStore('doctor', () => {
  const { getItem, setItem } = useLocalStorage();

  const doctorList = ref<Doctor[]>(
    getItem<Doctor[]>(storageKey, isDoctorArray) ?? [],
  );

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
