import { type Diagnosis, type HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital = ({ entry, diagnosises }: { entry: HospitalEntry, diagnosises: Diagnosis[] }) => {

    return (
        <>
            <div>{entry.date} <LocalHospitalIcon /></div>
            <div>{entry.description}</div>
            <div>diagnose by {entry.specialist}</div>
            <div>Patient discharged from the hospital on {entry.discharge.date} based on {entry.discharge.criteria}</div>
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

export default Hospital;