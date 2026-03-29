import express from 'express';
import calculateBmi from './bmiCalculator.ts';

const app = express();

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
        }
        res.send(result);
    }
    else {
        res.send({
            error: "malformatted parameters"
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});