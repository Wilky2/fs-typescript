import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import { useEffect, useState } from 'react';
import patientService from "../../services/patients";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = () => {
    const id = useParams().id;

    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {

        const fetchPatient = async () => {
            const patient = await patientService.getPatient(id ?? '');
            setPatient(patient);
        };
        void fetchPatient();
    }, [id]);

    return (
        <>
            <h2>
                {patient?.name}
                {patient?.gender === 'male' && <MaleIcon />}
                {patient?.gender === 'female' && <FemaleIcon />}
            </h2>

            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>
            <p>date of birth: {patient?.dateOfBirth}</p>
        </>
    );
};

export default PatientPage;