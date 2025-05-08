import { useEffect, useState } from "react";
import MovieGrid from "./Grid";
import { fetchFilms } from "../services/ghibli";
import type { Film } from "../services/ghibli";
import Header from './Header';

export default function App() {
  const [films, setFilms] = useState<Film[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [includeSynopsis, setIncludeSynopsis] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    watched: false,
    favorites: false, 
    withNotes: false,
    rating: false
  });
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('all-movies');
  const [selectedSort, setSelectedSort] = useState('Default');

useEffect(() => {
  fetchFilms()
    .then(data => {
      const updatedFilms = data.map(film => ({
        ...film,
        watched: false,
        favorite: false,
        hasNotes: false,
      }));
      setFilms(updatedFilms);
    })
    .catch(err => {
      console.error("Erro ao buscar filmes:", err);
    });
}, []);

const toggleWatched = (filmId: string) => {
  setFilms(prevFilms => 
    prevFilms.map(film => 
      film.id === filmId ? { ...film, watched: !film.watched } : film
    )
  );
};

const toggleFavorite = (filmId: string) => {
  setFilms(prevFilms => 
    prevFilms.map(film => 
      film.id === filmId ? { ...film, favorite: !film.favorite } : film
    )
  );
};


const toggleNotes = (filmId: string) => {
  setFilms(prevFilms => 
    prevFilms.map(film => 
      film.id === filmId ? { ...film, hasNotes: !film.hasNotes } : film
    )
  );
};

const sortFilms = (films: Film[]) => {
  const filmsCopy = [...films];
  
  switch (selectedSort) {
    case 'Title (A-Z)':
      return filmsCopy.sort((a, b) => a.title.localeCompare(b.title));
    case 'Title (Z-A)':
      return filmsCopy.sort((a, b) => b.title.localeCompare(a.title));
    case 'Duration (Shortest)':
      return filmsCopy.sort((a, b) => parseInt(a.running_time) - parseInt(b.running_time));
    case 'Duration (Longest)':
      return filmsCopy.sort((a, b) => parseInt(b.running_time) - parseInt(a.running_time));
    case 'Score (Highest)':
      return filmsCopy.sort((a, b) => parseInt(b.rt_score) - parseInt(a.rt_score));
    case 'Score (Lowest)':
      return filmsCopy.sort((a, b) => parseInt(a.rt_score) - parseInt(b.rt_score));
    default:
      return filmsCopy;
  }
};

const sortedFilms = sortFilms(films);

return (
  <div className="max-w-6xl mx-auto">
    <Header 
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      includeSynopsis={includeSynopsis}
      setIncludeSynopsis={setIncludeSynopsis}
      activeFilters={activeFilters}
      setActiveFilters={setActiveFilters}
      selectedRatingFilter={selectedRatingFilter}
      setSelectedRatingFilter={setSelectedRatingFilter}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
    />
    <MovieGrid 
      films={sortedFilms}
      searchQuery={searchQuery}
      includeSynopsis={includeSynopsis}
      activeFilters={activeFilters}
      selectedRatingFilter={selectedRatingFilter}
      toggleWatched={toggleWatched}
      toggleFavorite={toggleFavorite}
      toggleNotes={toggleNotes}
    />
  </div>
);
}