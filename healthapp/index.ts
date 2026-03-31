import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import calculateExercises from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weightReq = req.query['weight'];
    const heightReq = req.query['height'];
    if (weightReq && !isNaN(Number(weightReq))
        && heightReq && !isNaN(Number(heightReq))) {
        const weight = Number(weightReq);
        const height = Number(heightReq);
        const bmi = calculateBmi(height, weight);
        const result = {
            weight, height, bmi
        };
        res.send(result);
    }
    else {
        res.status(400).send({
            error: "malformatted parameters"
        });
    }
});

const isArrayOfNumbers = (value: unknown) => {
    return Array.isArray(value) && value.every(item => typeof item === 'number');
};

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        res.status(400).send({
            error: "parameters missing"
        });
        return;
    }

    if (isNaN(Number(target)) || !isArrayOfNumbers(daily_exercises)) {
        res.status(400).send({
            error: "malformatted parameters"
        });
        return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = calculateExercises(daily_exercises, target);
    res.send(result);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});