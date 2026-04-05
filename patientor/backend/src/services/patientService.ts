import { type NewPatient, type NonSensitivePatient, type Patient } from '../type.ts';
import patients from '../../data/patients.ts';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
    return patients;
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

const addPatient = (entry: NewPatient): NonSensitivePatient => {
    const id = uuid();
    const newPatient = {
        id,
        ...entry
    };

    patients.push(newPatient);
    return {
        id: newPatient.id,
        name: newPatient.name,
        dateOfBirth: newPatient.dateOfBirth,
        gender: newPatient.gender,
        occupation: newPatient.occupation
    };
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};