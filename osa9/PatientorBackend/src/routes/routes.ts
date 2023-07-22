import express, { Request, Response } from 'express';
import dataService from '../services/dataService';

const router = express.Router();

router.get('/ping', (_req: Request, res: Response): void => {
  res.send('pong');
});

router.get('/diagnoses', (_req: Request, res: Response): void => {
  res.send(dataService.getDiagnoses());
});

router.get('/patients', (_req: Request, res: Response): void => {
  res.send(dataService.getNonSensitivePatients());
});

router.post('/patients', async (req: Request, res: Response) => {
  try {
    const newPatient = await dataService.addPatient(req.body);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/patients/:id', (req: Request, res: Response) => {
  const patient = dataService.getPatient(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/patients/:id/entries', async (req: Request, res: Response) => {
  try {
    const newEntry = await dataService.addEntry(req.params.id, req.body);
    res.json(newEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
