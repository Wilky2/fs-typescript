import { type Entry, PatientNotFoundError, type NewPatient, type NonSensitivePatient, type Patient, type EntryWithoutId } from '../type.ts';
import patients from '../../data/patients.ts';
import { v1 as uuidv1 } from 'uuid';

const getEntries = (): Patient[] => {
    return patients;
};

const getPatient = (id: string): Patient => {
    const patient = patients.find((patient) => patient.id === id);
    if (patient) {
        return patient;
    }
    throw new PatientNotFoundError(id);
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const id: string = uuidv1();
    const newPatient = {
        id,
        ...entry,
        entries: []
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Patient => {
    const patient = getPatient(patientId);
    const id: string = uuidv1();
    const newEntry: Entry = {
        id,
        ...entry
    };
    patient.entries = [...patient.entries, newEntry];
    return patient;
};

export default {
    getEntries,
    getPatient,
    getNonSensitiveEntries,
    addPatient,
    addEntry
};