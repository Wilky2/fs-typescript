import { type Diagnosis } from '../type.ts';
import diagnoses from '../../data/diagnoses.ts';

const getEntries = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getEntries
};