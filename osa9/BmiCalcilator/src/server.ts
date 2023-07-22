import express from 'express';
import bmiRoute from './routes/bmiRoute';
import excercisesRoute from './routes/excercisesRoute';

const app = express();
app.use(express.json());

app.use('/api', bmiRoute);
app.use('/api', excercisesRoute);

app.listen(3002, () => {
  console.log('Server is listening on port 3002');
});

export default app;
