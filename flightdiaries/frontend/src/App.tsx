import { useEffect, useState } from "react";
import axios from "axios";
import { DiarySchema, type Diary } from "./types";
import { z } from 'zod';
import { ErrorNotification } from "./components/notification";

const App = () => {

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Diary[]>("/api/diaries").then(response => {
      try {
        setDiaries(z.array(DiarySchema).parse(response.data));
      }
      catch (error) {
        console.log(error);
        setError('Something goes wrong when getting the diaires');
      }
    });
  }, []);

  return (
    <div>
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
