import { useParams } from 'react-router-dom';
import { type EntryWithoutId, type Diagnosis, type Patient } from '../../types';
import { useEffect, useState } from 'react';
import patientService from "../../services/patients";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDetails from './EntryDetails';
import Button from '@mui/material/Button';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';

const marginStyle: React.CSSProperties = {
    margin: "10px",
};

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
    const id = useParams().id;

    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {

        const fetchPatient = async () => {
            const patient = await patientService.getPatient(id ?? '');
            setPatient(patient);
        };
        void fetchPatient();
    }, [id]);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryWithoutId) => {
        console.log(patient);
        if (patient) {
            try {
                const result = await patientService.addEntry(patient.id, values);
                setPatient(result);
                setModalOpen(false);
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    if (e?.response?.data && typeof e?.response?.data === "string") {
                        const message = e.response.data.replace('Something went wrong. Error: ', '');
                        console.error(message);
                        setError(message);
                    } else if (e.response?.data?.error[0].message) {
                        setError(e.response?.data?.error[0].message);
                    }
                    else {
                        setError("Unrecognized axios error");
                    }
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        }
    };

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
                            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
                        ))
                    }
                </>
            }
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
                diagnoses={diagnoses}
            />
            <Button variant="contained" style={marginStyle} onClick={() => openModal()}>
                ADD NEW ENTRY
            </Button >
        </>
    );
};

export default PatientPage;