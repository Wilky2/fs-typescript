import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntryForm from "./AddEntryForm";
import { type Diagnosis, type EntryWithoutId } from '../../types';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    error?: string;
    diagnoses: Diagnosis[]
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new entry </DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <AddEntryForm diagnoses={diagnoses} onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);

export default AddEntryModal;
