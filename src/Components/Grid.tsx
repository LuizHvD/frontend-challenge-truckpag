import { useState } from "react";
import { Star, CheckCircle, Heart, FileText } from 'lucide-react';
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

interface Film {
  id: string;
  title: string;
  original_title?: string;
  poster: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  description: string;
  director: string;
  producer: string;
  watched: boolean;
  favorite?: boolean;
  hasNotes?: boolean;
}

export type { Film };

interface MovieGridProps {
  films: Film[];
  searchQuery?: string;
  includeSynopsis?: boolean;
  activeFilters?: {
    watched: boolean;
    favorites: boolean;
    withNotes: boolean;
    rating: boolean;
  };
  selectedRatingFilter?: string;
  toggleWatched: (filmId: string) => void;
  toggleFavorite: (filmId: string) => void;
  toggleNotes: (filmId: string) => void;
}

export default function MovieGrid({
  films,
  searchQuery = '',
  includeSynopsis = false,
  activeFilters = { watched: false, favorites: false, withNotes: false, rating: false },
  selectedRatingFilter = 'all-movies',
  toggleWatched,
  toggleFavorite,
  toggleNotes
}: MovieGridProps) {

  const [expandedSynopsis, setExpandedSynopsis] = useState<Record<string, boolean>>({});

  const filteredFilms = films.filter(film => {
    
    const searchLower = searchQuery.toLowerCase();
    if (searchQuery && !film.title.toLowerCase().includes(searchLower) &&
      !(includeSynopsis && film.description.toLowerCase().includes(searchLower))) {
      return false;
    }

    
    if (activeFilters.watched && !film.watched) return false;
    if (activeFilters.favorites && !film.favorite) return false;
    if (activeFilters.withNotes && !film.hasNotes) return false;

   
    if (activeFilters.rating) {
      if (selectedRatingFilter === 'unrated' && (film.rt_score)) return false;
      if (selectedRatingFilter === '5-stars' && (film.rt_score)) return false;
      if (selectedRatingFilter === '4-stars' && (film.rt_score)) return false;
      if (selectedRatingFilter === '3-stars' && (film.rt_score)) return false;
      if (selectedRatingFilter === '2-stars' && (film.rt_score)) return false;
      if (selectedRatingFilter === '1-star' && (film.rt_score)) return false;
    }

    return true;
  });

  const toggleSynopsisExpand = (filmId: string) => {
    setExpandedSynopsis(prev => ({
      ...prev,
      [filmId]: !prev[filmId]
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 px-4">
      {filteredFilms.map((film) => (
        <Card key={film.id} className="overflow-hidden flex flex-col">
          <div className="relative">
            <img
              src={film.poster}
              alt={`${film.title} poster`}
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute top-2 right-2">
              {film.watched && (
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Watched
                </Badge>
              )}
            </div>
          </div>

          <CardContent className="pt-4 flex-grow">
            <h3 className="text-lg font-bold">{film.title}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
              <span>{film.release_date}</span>
              <span className="mx-2">•</span>
              <span>{film.running_time}</span>
            </div>

            <div className="flex items-center mb-3">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold ml-1">{film.rt_score}%</span>
            </div>

            <p className={`text-sm text-gray-600 ${expandedSynopsis[film.id] ? '' : 'line-clamp-3'}`}>
              {film.description}
            </p>
            {film.description.length > 150 && (
              <button
                onClick={() => toggleSynopsisExpand(film.id)}
                className="text-xs text-blue-600 mt-1 hover:underline"
              >
                {expandedSynopsis[film.id] ? 'Read less' : 'Read more'}
              </button>
            )}

            <div className="mt-3 text-xs text-gray-500">
              <div>
                <span className="font-semibold">Director:</span> {film.director}
              </div>
              <div>
                <span className="font-semibold">Producer:</span> {film.producer}
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t flex justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleWatched(film.id)}
              className={film.watched ? "text-green-600" : "text-gray-500"}
            >
              <CheckCircle className={`w-4 h-4 mr-1 ${film.watched ? 'fill-green-600' : ''}`} />
              {film.watched ? 'Watched' : 'Mark Watched'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(film.id)}
              className={film.favorite ? "text-red-600" : "text-gray-500"}
            >
              <Heart className={`w-4 h-4 mr-1 ${film.favorite ? 'fill-red-600' : ''}`} />
              {film.favorite ? 'Favorited' : 'Favorite'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleNotes(film.id)}
              className={film.hasNotes ? "text-blue-600" : "text-gray-500"}
            >
              <FileText className="w-4 h-4 mr-1" />
              {film.hasNotes ? 'Edit Notes' : 'Add Notes'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}