import express, { Request, Response } from 'express';
import dataService from '../services/dataService';
import { Patient, Entry } from '../types';

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
  try {
    const newPatient = dataService.addPatient(req.body as Patient);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

router.post('/patients/:id/entries', (req: Request, res: Response): void => {
  try {
    const newEntry = dataService.addEntry(req.params.id, req.body as Entry);
    res.json(newEntry);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;
