import axios from "axios";

export interface CreditLine {
  role: string;
  name: string;
}

export interface Movie {
  slug: string;
  title_en: string;
  title_bn: string;
  year: number;
  runtime_min: number;
  synopsis: string;
  poster_url: string;
  card_url: string;
  playback_url: string;
  credits: CreditLine[];
}

const API_BASE = "https://ujmshy8j51.execute-api.ap-south-1.amazonaws.com/"; // replace with your invoke URL

export async function fetchMovies(): Promise<Movie[]> {
  const response = await axios.get<Movie[]>(`${API_BASE}/movies`);
  return response.data;
}