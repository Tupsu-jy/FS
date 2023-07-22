import { Patient, NonSensitivePatient, Entry } from '../types';

const getDiagnoses = (): Array<string> => {
  // Your implementation here
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  // Your implementation here
};

const addPatient = async (patient: Patient): Promise<Patient> => {
  // Your implementation here
};

const getPatient = (id: string): Patient | undefined => {
  // Your implementation here
};

const addEntry = async (patientId: string, entry: Entry): Promise<Entry> => {
  // Your implementation here
};

export default {
  getDiagnoses,
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry
};
