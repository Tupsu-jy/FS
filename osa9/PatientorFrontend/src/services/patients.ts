import axios from "axios";
import { Patient, PatientWithFullDiagnoses, PatientFormValues, Entry, Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAllDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<PatientWithFullDiagnoses>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const addEntry = async (id: string, entry: Entry) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, get, addEntry, getAllDiagnoses
};

