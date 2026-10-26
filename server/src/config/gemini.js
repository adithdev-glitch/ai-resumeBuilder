import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

export const geminiClient = apiKey ? new GoogleGenAI({ apiKey }) : null;
export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
