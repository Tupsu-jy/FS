import express, { Request, Response } from 'express';
import calculateBmi from '../controllers/bmiCalculator';

interface BmiQuery {
  weight: string;
  height: string;
}

const router = express.Router();

router.get('/bmi', (req: Request<BmiQuery>, res: Response) => {
  const { weight, height } = req.query;

  if (!weight || !height) {
    res.status(400).json({
      error: "parameters missing"
    });
    return;
  }

  const weightNumber = Number(weight);
  const heightNumber = Number(height);

  if (isNaN(weightNumber) || isNaN(heightNumber)) {
    res.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  const response = calculateBmi(heightNumber, weightNumber);

  res.status(200).json(response);
});

export default router;
