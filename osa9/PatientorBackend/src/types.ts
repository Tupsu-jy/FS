export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  diagnoses?: Array<Diagnosis>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type HealthCheckEntryWithoutId = Omit<HealthCheckEntry, 'id'>;
export type OccupationalHealthcareEntryWithoutId = Omit<OccupationalHealthcareEntry, 'id'>;
export type HospitalEntryWithoutId = Omit<HospitalEntry, 'id'>;

export type EntryWithoutId =
  | HealthCheckEntryWithoutId
  | OccupationalHealthcareEntryWithoutId
  | HospitalEntryWithoutId;
  
interface HealthCheckEntryWithFullDiagnoses extends Omit<HealthCheckEntry, 'diagnosisCodes'> {
  diagnoses?: Array<Diagnosis>;
}

interface OccupationalHealthcareEntryWithFullDiagnoses extends Omit<OccupationalHealthcareEntry, 'diagnosisCodes'> {
  diagnoses?: Array<Diagnosis>;
}

interface HospitalEntryWithFullDiagnoses extends Omit<HospitalEntry, 'diagnosisCodes'> {
  diagnoses?: Array<Diagnosis>;
}

export type EntryWithFullDiagnoses =
  | HospitalEntryWithFullDiagnoses
  | OccupationalHealthcareEntryWithFullDiagnoses
  | HealthCheckEntryWithFullDiagnoses;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PatientWithoutId = Omit<Patient, 'id'>;

export interface PatientWithFullDiagnoses extends Omit<Patient, 'entries'> {
  entries: EntryWithFullDiagnoses[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
