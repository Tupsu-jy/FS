interface BmiResult {
  weight: number;
  height: number;
  bmi: string;
}

const calculateBmi = (height: number, weight: number): BmiResult => {
  const bmiValue = weight / ((height / 100) ** 2);

  let bmi: string;
  if (bmiValue < 18.5) {
    bmi = "Underweight";
  } else if (bmiValue < 25) {
    bmi = "Normal (healthy weight)";
  } else if (bmiValue < 30) {
    bmi = "Overweight";
  } else {
    bmi = "Obese";
  }

  return {
    weight,
    height,
    bmi
  };
};

export default calculateBmi;