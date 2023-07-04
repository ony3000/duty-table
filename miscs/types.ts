type BaseFields = {
  id: string;
};

export type DoctorRequiredFields = {
  name: string;
};

export type Doctor = BaseFields & DoctorRequiredFields;
