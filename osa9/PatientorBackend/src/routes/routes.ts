import express, { Request, Response } from 'express';
import dataService from '../services/dataService';
import { PatientWithoutId, EntryWithoutId } from '../types';
import { isPatientWithoutId, isEntryWithoutId } from '../utils';

const router = express.Router();

router.get('/diagnoses', (_req: Request, res: Response): void => {
  res.send(dataService.getAllDiagnoses());
});

router.get('/ping', (_req: Request, res: Response): void => {
  res.send('pong');
});

router.get('/patients', (_req: Request, res: Response): void => {
  res.send(dataService.getNonSensitivePatients());
});

router.get('/patients/:id', (req: Request, res: Response): void => {
  const patient = dataService.getPatient(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/patients', (req: Request, res: Response): void => {
  const body = req.body as PatientWithoutId;

  if (!isPatientWithoutId(body)) { // Validate and type check
    res.status(400).send('Invalid patient data');
    return;
  }

  try {
    const newPatient = dataService.addPatient(body);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post('/patients/:id/entries', (req: Request, res: Response): void => {
  const body = req.body as EntryWithoutId;

  if (!isEntryWithoutId(body)) { // Validate and type check
    res.status(400).send('Invalid entry data');
    return;
  }

  try {
    const newEntry = dataService.addEntry(req.params.id, body);
    res.json(newEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;
