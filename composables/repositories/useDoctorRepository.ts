import { ref } from 'vue';
import { v4 as uuid } from 'uuid';

import type { Doctor, DoctorRequiredFields } from '~/miscs/types';

import { useBaseRepository } from './useBaseRepository';

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

export function useDoctorRepository() {
  const { getItem, setItem } = useBaseRepository();

  function getDoctorList(): Doctor[] {
    return getItem<Doctor[]>(storageKey, isDoctorArray) ?? [];
  }

  const doctorListRef = ref(getDoctorList());

  function insertDoctor(fields: DoctorRequiredFields): void {
    const newDoctor: Doctor = {
      ...fields,
      id: uuid(),
    };

    doctorListRef.value.push(newDoctor);
    setItem(storageKey, doctorListRef.value);
  }

  function removeDoctor(target: Doctor): void {
    const index = doctorListRef.value.findIndex(
      (doctor) => doctor.id === target.id,
    );

    if (index !== -1) {
      doctorListRef.value.splice(index, 1);
      setItem(storageKey, doctorListRef.value);
    }
  }

  return {
    doctorList: doctorListRef.value,
    insertDoctor,
    removeDoctor,
  };
}
