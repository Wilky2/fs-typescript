import { type NewPatient, type NonSensitivePatient, type Patient } from '../type.ts';
import patients from '../../data/patients.ts';
import { v1 as uuid } from 'uuid';
import { isString } from '../utils.ts';

const generateId = (): string => {
    const id = uuid();
    if (isString(id)) {
        return id;
    }
    return "id-0001";
};

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

const addPatient = (entry: NewPatient): Patient => {
    const id = generateId();
    const newPatient = {
        id,
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};