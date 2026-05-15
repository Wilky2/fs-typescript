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

const EntryDetails = ({ entry, diagnosises }: { entry: Entry, diagnosises: Diagnosis[] }) => {

    switch (entry.type) {
        case "Hospital":
            return <div style={borderStyle}><Hospital entry={entry} diagnosises={diagnosises} /></div>;
        case "OccupationalHealthcare":
            return <div style={borderStyle}><OccupationHealthcare entry={entry} diagnosises={diagnosises} /></div>;
        case "HealthCheck":
            return <div style={borderStyle}><HealthCheck entry={entry} diagnosises={diagnosises} /></div>;
        default:
            return assertNever(entry);
    };

};

export default EntryDetails;