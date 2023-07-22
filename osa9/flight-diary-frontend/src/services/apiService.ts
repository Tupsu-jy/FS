import axios, { AxiosResponse } from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001';

export const addEntry = async (
  formData: NewDiaryEntry
): Promise<AxiosResponse<DiaryEntry>> => {
  try {
    const addedEntry: AxiosResponse<DiaryEntry> = await axios.post(
      baseUrl + '/api/diaries',
      formData
    );
    return addedEntry;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Something went wrong.');
  }
};

export const getNonSensitiveEntries = async (): Promise<AxiosResponse<NonSensitiveDiaryEntry[]>> => {
  try {
    const entries: AxiosResponse<NonSensitiveDiaryEntry[]> = await axios.get(
      baseUrl + '/api/diaries'
    );
    return entries;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Something went wrong.');
  }
};

export const getEntryById = async (id: number): Promise<AxiosResponse<DiaryEntry>> => {
  try {
    const entry: AxiosResponse<DiaryEntry> = await axios.get(
      `${baseUrl}/api/diaries/${id}`
    );
    return entry;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Something went wrong.');
  }
};
