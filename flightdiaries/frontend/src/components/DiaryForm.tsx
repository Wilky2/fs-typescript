import { useState } from "react";
import axios from "axios";
import { Visibility, Weather } from "../types";

export const DiaryForm = ({ createDiary, setNotificationError, setNotificationSuccess }: { createDiary: (val: unknown) => Promise<void>, setNotificationError: (val: string) => void, setNotificationSuccess: (val: string) => void }) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const formValue = { date, visibility, weather, comment };
        try {
            await createDiary(formValue);
            setDate('');
            setVisibility('');
            setWeather('');
            setComment('');
            setNotificationSuccess('Diary created successfully');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data);
                const field = error.response?.data.error[0].path[0] as 'date' | 'visibility' | 'weather' | 'comment';
                setNotificationError(`Error: Incorrect  ${field}: ${formValue[field]}`);
            } else {
                console.error(error);
                setNotificationError('Something goes wrong when creating the diaires');
            }
        }
    };

    return (
        <>
            <h2>Add new entry</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>date</label>
                    <input name="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div>
                    <label>visibility</label>
                    {Object.values(Visibility).map(value =>
                        <label key={value}>
                            <input
                                type="radio"
                                name="visibility"
                                value={value}
                                checked={visibility === value}
                                onChange={e => setVisibility(e.target.value)}
                            />
                            {value}
                        </label>
                    )}
                </div>
                <div>
                    <label>weather</label>
                    {Object.values(Weather).map(value =>
                        <label key={value}>
                            <input
                                type="radio"
                                name="weather"
                                value={value}
                                checked={weather === value}
                                onChange={e => setWeather(e.target.value)}
                            />
                            {value}
                        </label>
                    )}
                </div>
                <div>
                    <label>comment</label>
                    <input name="comment" value={comment} onChange={e => setComment(e.target.value)} />
                </div>
                <button>create</button>
            </form>
        </>
    );
};