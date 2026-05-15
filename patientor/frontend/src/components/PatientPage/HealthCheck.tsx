import { HealthCheckRating, type Diagnosis, type HealthCheckEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red, yellow, green, amber } from '@mui/material/colors';

const HealthCheck = ({ entry, diagnosises }: { entry: HealthCheckEntry, diagnosises: Diagnosis[] }) => {

    let color: string = '';
    if (entry.healthCheckRating === HealthCheckRating.Healthy) {
        color = green[500];
    }

    if (entry.healthCheckRating === HealthCheckRating.LowRisk) {
        color = yellow[500];
    }

    if (entry.healthCheckRating === HealthCheckRating.HighRisk) {
        color = amber[900];
    }

    if (entry.healthCheckRating === HealthCheckRating.CriticalRisk) {
        color = red[500];
    }
    return (
        <>
            <div>{entry.date} <MedicalServicesIcon /></div>
            <div>{entry.description}</div>
            <div><FavoriteIcon sx={{ color }} /></div>
            <div>diagnose by {entry.specialist}</div>
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

export default HealthCheck;