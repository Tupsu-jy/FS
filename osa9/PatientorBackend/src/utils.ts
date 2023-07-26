import { EntryWithoutId, PatientWithoutId } from "./types";

export function isPatientWithoutId(object: unknown): object is PatientWithoutId {
  return (
    typeof object === 'object' &&
    object !== null &&
    typeof (object as PatientWithoutId).name === 'string' &&
    (object as PatientWithoutId).name.trim().length > 0 &&
    typeof (object as PatientWithoutId).ssn === 'string' &&
    (object as PatientWithoutId).ssn.trim().length > 0 &&
    typeof (object as PatientWithoutId).occupation === 'string' &&
    (object as PatientWithoutId).occupation.trim().length > 0 &&
    typeof (object as PatientWithoutId).gender === 'string' &&
    (object as PatientWithoutId).gender.trim().length > 0 &&
    typeof (object as PatientWithoutId).dateOfBirth === 'string' &&
    (object as PatientWithoutId).dateOfBirth.trim().length > 0 &&
    Array.isArray((object as PatientWithoutId).entries)
  );
}

export function isEntryWithoutId(object: unknown): object is EntryWithoutId {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  const entry = object as EntryWithoutId;

  const isBaseEntry = 
    typeof entry.description === 'string' &&
    entry.description.trim().length > 0 &&
    typeof entry.date === 'string' &&
    entry.date.trim().length > 0 &&
    typeof entry.specialist === 'string' &&
    entry.specialist.trim().length > 0 &&
    (entry.diagnosisCodes === undefined || Array.isArray(entry.diagnosisCodes));

  switch(entry.type) {
    case "HealthCheck":
      return isBaseEntry && typeof entry.healthCheckRating === 'number';
    case "OccupationalHealthcare":
      return isBaseEntry && typeof entry.employerName === 'string' && entry.employerName.trim().length > 0 && (entry.sickLeave === undefined || (typeof entry.sickLeave.startDate === 'string' && entry.sickLeave.startDate.trim().length > 0 && typeof entry.sickLeave.endDate === 'string' && entry.sickLeave.endDate.trim().length > 0));
    case "Hospital":
      return isBaseEntry && typeof entry.discharge.date === 'string' && entry.discharge.date.trim().length > 0 && typeof entry.discharge.criteria === 'string' && entry.discharge.criteria.trim().length > 0;
    default:
      return false;
  }
}
