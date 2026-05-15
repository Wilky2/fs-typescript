import { type Diagnosis, type OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

const OccupationHealthcare = ({ entry, diagnosises }: { entry: OccupationalHealthcareEntry, diagnosises: Diagnosis[] }) => {

    return (
        <>
            <div>{entry.date} <WorkIcon /></div>
            <div>{entry.description}</div>
            <div>diagnose by {entry.specialist}</div>
            <div>employee: {entry.employerName}</div>
            <div>Sick leave period: {entry.sickLeave?.startDate} – {entry.sickLeave?.endDate}</div>
            {
                entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 &&
                <ul>
                    {
                        entry.diagnosisCodes.map(diagnosis =>
                            <li key={diagnosis}>
                                {diagnosis} {diagnosises.find(d => d.code === diagnosis)?.name ?? ''}
                            </li>)
                    }
                </ul>
            }
        </>
    );

};

export default OccupationHealthcare;