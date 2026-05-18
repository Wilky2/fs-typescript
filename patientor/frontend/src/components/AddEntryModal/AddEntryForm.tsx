import { useState, type SyntheticEvent } from "react";

import { TextField, Grid, Button } from '@mui/material';

import { HealthCheckRating, type EntryWithoutId } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const onHealthCheckRatingChange = (value: string) => {
    const healthCheckRatingValue = Object.values(HealthCheckRating).find(g => g.toString() === value);
    if (healthCheckRatingValue) {
      setHealthCheckRating(healthCheckRatingValue);
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
    const entry: EntryWithoutId = {
      type: "HealthCheck",
      date,
      description,
      specialist,
      healthCheckRating,
      diagnosisCodes
    }
    onSubmit(entry);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Health Check Rating (0-3)"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => onHealthCheckRatingChange(target.value)}
        />
        <TextField
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