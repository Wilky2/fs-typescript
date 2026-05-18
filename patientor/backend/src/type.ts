import { z } from 'zod';

export const DiagnosisSchema = z.object({
    code: z.string(),
    name: z.string(),
    latin: z.string().optional()
});

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(
        DiagnosisSchema.shape.code
    ).optional()
});


const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3,
} as const;

const HealthCheckRatingSchema = z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
]);

type HealthCheckRating = z.infer<typeof HealthCheckRatingSchema>;

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: HealthCheckRatingSchema,
});


const SickLeaveSchema = z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: SickLeaveSchema.optional()
});


const DischargeSchema = z.object({
    date: z.string(),
    criteria: z.string()
});

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: DischargeSchema.optional()
});

export const EntryWithoutIdSchema = z.discriminatedUnion("type", [
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
    HealthCheckEntrySchema,
]);

export type EntryWithoutId = z.infer<typeof EntryWithoutIdSchema>;

export type Entry = EntryWithoutId & {
    id: string;
};

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

export class PatientNotFoundError extends Error {
    constructor(id: string) {
        super(`Patient with id: ${id}, not found`);
    }
}