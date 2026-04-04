import express, { type Response } from 'express';
import { type Diagnosis } from '../type.ts';
import diagnoses from '../../data/diagnoses.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnoses);
});

export default router;