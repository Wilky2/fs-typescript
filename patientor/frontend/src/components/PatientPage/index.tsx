import { useParams } from 'react-router-dom';
import { type Patient } from '../../types';
import { useEffect, useState } from 'react';
import patientService from "../../services/patients";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import React from 'react';

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

            {
                patient?.entries.length !== 0 &&
                <>
                    <h3>entries</h3>
                    {
                        patient?.entries.map(entry => (
                            <React.Fragment key={entry.id}>
                                <p>{entry.date} {entry.description}</p>
                                {
                                    entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 &&
                                    <ul>
                                        {
                                            entry.diagnosisCodes.map(diagnosis => <li key={diagnosis}>{diagnosis}</li>)
                                        }
                                    </ul>
                                }
                            </React.Fragment>
                        ))
                    }
                </>
            }
        </>
    );
};

export default PatientPage;