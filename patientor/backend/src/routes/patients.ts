import express, { type Request, type NextFunction, type Response } from 'express';
import patientService from '../services/patientService.ts';
import { NewEntrySchema, type Patient, type NewPatient, type NonSensitivePatient, EntryWithoutIdSchema, type Entry, PatientNotFoundError } from '../type.ts';
import { z } from 'zod';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        EntryWithoutIdSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};


const patientIdParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        z.string().parse(req.params.id);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else if (error instanceof PatientNotFoundError) {
        res.status(404).send({ error: error.message });
    }
    else {
        next(error);
    }
};

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', patientIdParser, (req: Request<{ id: string }, unknown, unknown>, res: Response<Patient>) => {
    res.send(patientService.getPatient(req.params.id));
});

router.post('/:id/entries', patientIdParser, newEntryParser, (req: Request<{ id: string }, unknown, Entry>, res: Response<Patient>) => {
    res.send(patientService.addEntry(req.params.id, req.body));
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;