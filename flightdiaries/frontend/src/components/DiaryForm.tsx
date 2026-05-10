import { useState } from "react";
import axios from "axios";

export const DiaryForm = ({ createDiary, setNotification }: { createDiary: (val: unknown) => Promise<void>, setNotification: (val: string) => void }) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const formValue = { date, visibility, weather, comment };
        try {
            await createDiary(formValue);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data);
                const field = error.response?.data.error[0].path[0] as 'date' | 'visibility' | 'weather' | 'comment';
                setNotification(`Error: Incorrect  ${field}: ${formValue[field]}`)
            } else {
                console.error(error);
                setNotification('Something goes wrong when creating the diaires');
            }
        }

    }

    return (
        <>
            <h2>Add new entry</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>date</label>
                    <input name="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div>
                    <label>visibility</label>
                    <input name="visibility" value={visibility} onChange={e => setVisibility(e.target.value)} />
                </div>
                <div>
                    <label>weather</label>
                    <input name="weather" value={weather} onChange={e => setWeather(e.target.value)} />
                </div>
                <div>
                    <label>comment</label>
                    <input name="comment" value={comment} onChange={e => setComment(e.target.value)} />
                </div>
                <button>create</button>
            </form>
        </>
    )
}