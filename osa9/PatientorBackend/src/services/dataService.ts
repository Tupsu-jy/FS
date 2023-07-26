import { Patient, PatientWithoutId, PatientWithFullDiagnoses, NonSensitivePatient, Entry, EntryWithFullDiagnoses, EntryWithoutId, Diagnosis } from '../types';
import diagnoses from '../../data/diagnoses';
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

const getAllDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const getDiagnosis = (code: string): Diagnosis | undefined => {
  return diagnoses.find(diagnosis => diagnosis.code === code);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: PatientWithoutId): Patient => {
  const newPatient = {
    ...patient,
    entries: patient.entries ?? [],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuidv4() ,
  };

  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): PatientWithFullDiagnoses | undefined => {
  const patient = patients.find(p => p.id === id);
  
  if (!patient) {
    return undefined;
  }
  
  const entriesWithFullDiagnoses: EntryWithFullDiagnoses[] = patient.entries.map(entry => {
    if (!entry.diagnosisCodes) {
      return {...entry};
    }

    const diagnoses = entry.diagnosisCodes.map(code => getDiagnosis(code));
    const filteredDiagnoses = diagnoses.filter((diagnosis): diagnosis is Diagnosis => diagnosis !== undefined);
    return {...entry, diagnoses: filteredDiagnoses, diagnosisCodes: undefined};
  });

  return {...patient, entries: entriesWithFullDiagnoses};
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    throw new Error('Patient not found');
  }

  const newEntry = {
    ...entry,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuidv4(),
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry,
  getAllDiagnoses,
};