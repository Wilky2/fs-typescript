import { useState } from "react";
import type { Diary } from "../types";

export const DiaryForm = ({ createDiary, setNotification }: { createDiary: (val: unknown) => Promise<void>, setNotification: (val: string) => void }) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
            await createDiary({ date, visibility, weather, comment });
        } catch (error) {
            console.log(error);
            setNotification('Something goes wrong when getting the diaires');
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