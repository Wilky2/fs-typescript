import axios from "axios";
import { DiarySchema, type Diary } from "../types";
import { z } from 'zod';

export const getAll = async (): Promise<Diary[]> => {
    const response = await axios.get<Diary[]>("/api/diaries");
    return z.array(DiarySchema).parse(response.data);
};

export const create = async (object: unknown): Promise<Diary> => {
    const response = await axios.post<Diary>("/api/diaries", object);
    return DiarySchema.parse(response.data);
};