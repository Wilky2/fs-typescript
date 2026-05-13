import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other',
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const NewEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string(),
});

export interface Patient extends NewPatient {
    id: string;
    entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof NewEntrySchema>;