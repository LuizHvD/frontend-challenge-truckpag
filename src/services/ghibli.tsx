export interface ApiFilm {
  id: string;
  title: string;
  original_title: string;
  image: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  description: string;
  director: string;
  producer: string;
}

export async function fetchFilms(): Promise<Film[]> {
  const response = await fetch("https://ghibliapi.vercel.app/films");
  const data: ApiFilm[] = await response.json();

  return data.map((film) => ({
    id: film.id,
    title: film.title,
    original_title: film.original_title,
    poster: film.image,
    release_date: film.release_date,
    running_time: film.running_time + " min",
    rt_score: film.rt_score,
    description: film.description,
    director: film.director,
    producer: film.producer,
    watched: false,
    favorite: false,
    hasNotes: false,
  }));
}

// exporta o tipo com os campos extras
import type { Film } from "../Components/Grid";
export type { Film };
