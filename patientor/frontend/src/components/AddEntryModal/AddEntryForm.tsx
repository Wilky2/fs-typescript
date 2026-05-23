import { useState, type SyntheticEvent } from "react";

import { TextField, Grid, Button, Select, type SelectChangeEvent, MenuItem, InputLabel } from '@mui/material';

import { HealthCheckRating, type EntryWithoutId } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [type, setType] = useState("HealthCheck");

  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');


  const typeOptions = [
    { label: "Health Check", value: "HealthCheck" },
    { label: "Occupational Healthcare", value: "OccupationalHealthcare" },
    { label: "Hospital", value: "Hospital" }
  ];

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const selectedType = typeOptions.find(g => g.value === value);
      if (selectedType) {
        setType(selectedType.value);
      }
    }
  };

  const onHealthCheckRatingChange = (value: string) => {
    const healthCheckRatingValue = Object.values(HealthCheckRating).find(g => g === Number(value));
    if (healthCheckRatingValue || healthCheckRatingValue === 0) {
      setHealthCheckRating(String(healthCheckRatingValue));
    }
    if (value === "") {
      setHealthCheckRating("");
    }
  };

  const onDiagnosisCodesChange = (value: string) => {
    const values = value.split(",");
    if (values) {
      setDiagnosisCodes(values);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const entryWithoutType = {
      date,
      description,
      specialist,
      diagnosisCodes
    };

    let entry: EntryWithoutId | null = null;

    if (type === "HealthCheck") {
      const value = Object.values(HealthCheckRating).find(g => g === Number(healthCheckRating));

      if (value || value === 0) {
        entry = {
          ...entryWithoutType,
          type: "HealthCheck",
          healthCheckRating: value,
        };
      }
    }

    if (type === "OccupationalHealthcare") {
      entry = {
        ...entryWithoutType,
        type: "OccupationalHealthcare",
        employerName,
        sickLeave: {
          startDate,
          endDate
        }
      };
    }

    if (type === "Hospital") {
      entry = {
        ...entryWithoutType,
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria
        }
      };
    }

    if (entry) {
      onSubmit(entry);
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel sx={{ marginTop: 2.5 }}>Entry type</InputLabel>
        <Select
          label="Entry type"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
          {typeOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
              }</MenuItem>
          )}
        </Select>

        <TextField
          sx={{ marginTop: 2 }}
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          sx={{ marginTop: 2 }}
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          sx={{ marginTop: 2 }}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {
          type === "HealthCheck" &&
          <TextField
            sx={{ marginTop: 2 }}
            label="Health Check Rating (0-3)"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => onHealthCheckRatingChange(target.value)}
          />
        }
        {
          type === "OccupationalHealthcare" &&
          <TextField
            sx={{ marginTop: 2 }}
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
        }
        {
          type === "OccupationalHealthcare" &&
          <TextField
            sx={{ marginTop: 2 }}
            label="Start Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={startDate}
            onChange={({ target }) => setStartDate(target.value)}
          />
        }
        {
          type === "OccupationalHealthcare" &&
          <TextField
            sx={{ marginTop: 2 }}
            label="End Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={endDate}
            onChange={({ target }) => setEndDate(target.value)}
          />
        }
        {
          type === "Hospital" &&
          <TextField
            sx={{ marginTop: 2 }}
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
        }
        {
          type === "Hospital" &&
          <TextField
            sx={{ marginTop: 2 }}
            label="criteria"
            fullWidth
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          />
        }
        <TextField
          sx={{ marginTop: 2 }}
          label="Diagnosis Codes (comma-separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => onDiagnosisCodesChange(target.value)}
        />

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;