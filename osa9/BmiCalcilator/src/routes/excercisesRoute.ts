import express, { Request, Response } from 'express';
import calculateExercises from '../controllers/exerciseCalculator';

interface Body {
  daily_exercises: number[];
  target: number;
}

const router = express.Router();

router.post('/exercises', (req: Request<unknown, unknown, Body>, res: Response) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({
      error: "parameters missing"
    });
    return;
  }

  if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
    res.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  const response = calculateExercises(daily_exercises, target);

  res.status(200).json({
    response
  });
});

export default router;
