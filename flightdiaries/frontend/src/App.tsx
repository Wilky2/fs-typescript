import { useEffect, useState } from "react";
import { ErrorNotification } from "./components/notification";
import type { Diary } from "./types";
import { create, getAll } from "./services/DiaryService";
import { DiaryForm } from "./components/DiaryForm";

const App = () => {

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    getAll().then(diaries => {
      setDiaries(diaries);
    }).catch(error => {
      console.log(error);
      setError('Something goes wrong when getting the diaires');
    });
  }, []);

  const createDiary = async (diary: unknown) => {
    const newDiary = await create(diary);
    setDiaries([...diaries, newDiary]);
  }

  return (
    <div>
      <DiaryForm createDiary={createDiary} setNotification={setError} />
      <h1>Diaries entries</h1>
      <ErrorNotification message={error} />
      {
        diaries.map(diarie => (
          <div key={diarie.id}>
            <h2>{diarie.date}</h2>
            <p>Weather: {diarie.weather}</p>
            <p>Visibiity: {diarie.visibility}</p>
            {diarie.comment && <p>Comment: {diarie.comment}</p>}
          </div>)
        )
      }
    </div>
  );
};

export default App;
