import { type Diagnosis, type Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationHealthcare from "./OccupationalHealthcare";

const borderStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "8px",
};

const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {

    switch (entry.type) {
        case "Hospital":
            return <div style={borderStyle}><Hospital entry={entry} diagnoses={diagnoses} /></div>;
        case "OccupationalHealthcare":
            return <div style={borderStyle}><OccupationHealthcare entry={entry} diagnoses={diagnoses} /></div>;
        case "HealthCheck":
            return <div style={borderStyle}><HealthCheck entry={entry} diagnoses={diagnoses} /></div>;
        default:
            return assertNever(entry);
    };

};

export default EntryDetails;