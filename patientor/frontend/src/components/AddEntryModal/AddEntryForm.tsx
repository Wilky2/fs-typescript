import { useState, type SyntheticEvent } from "react";

import { TextField, Grid, Button, Select, type SelectChangeEvent, MenuItem, InputLabel, OutlinedInput } from '@mui/material';

import { type Diagnosis, HealthCheckRating, type EntryWithoutId } from "../../types";

import ListItemText from '@mui/material/ListItemText';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[]
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 500,
      },
    },
  },
};

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
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

  const healthCheckRatingValues = Object.values(HealthCheckRating);
  const healthCheckRatingValuesLabel = ["Healthy", "Low Risk", "High Risk", "Critical Risk"];
  const healthCheckRatingValuesOptions = healthCheckRatingValues.map(rate => {
    return { label: `${rate} - ${healthCheckRatingValuesLabel[rate]}`, value: rate };
  });

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const healthCheckRatingValue = healthCheckRatingValues.find(g => g === Number(value));
      if (healthCheckRatingValue || healthCheckRatingValue === 0) {
        setHealthCheckRating(String(healthCheckRatingValue));
      }
      if (value === "") {
        setHealthCheckRating("");
      }
    }
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
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
      const value = healthCheckRatingValues.find(g => g === Number(healthCheckRating));

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
          labelId="Entry-type"
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
          type="date"
          label="Date"
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
        <InputLabel sx={{ marginTop: 2 }}>Diagnosis Codes (comma-separated)</InputLabel>
        <Select
          labelId="Diagnosis-Codes"
          sx={{ width: 250 }}
          multiple
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
          renderValue={(selected) => selected.join(',')}
          MenuProps={MenuProps}
        >
          {diagnoses.map((diagnosis) => {
            const selected = diagnosisCodes.includes(diagnosis.code);
            const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

            return (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <SelectionIcon
                  fontSize="small"
                  style={{ marginRight: 8, padding: 9, boxSizing: 'content-box' }}
                />
                <ListItemText primary={`${diagnosis.code} - ${diagnosis.name}`} />
              </MenuItem>
            );
          })}
        </Select>
        {
          type === "HealthCheck" &&
          <>
            <InputLabel sx={{ marginTop: 2 }}>Health Check Rating (0-3)</InputLabel>
            <Select
              labelId="Health-Check-Rating"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingValuesOptions.map(option =>
                <MenuItem
                  key={option.label}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              )}
            </Select>
          </>
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
            type="date"
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
            type="date"
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
            type="date"
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