import { useState } from "react";
import { Star, Heart, FileText } from 'lucide-react';
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowDown } from 'lucide-react'
import { Eye } from 'lucide-react';


interface Film {
  id: string;
  title: string;
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 px-4 ">
      {filteredFilms.map((film) => (
        <Card key={film.id} className="overflow-hidden flex flex-col py-0 group border border-gray-200 hover:shadow-lg ">
          <div className="relative aspect-[2/3] overflow-hidden ">
            <img
              src={film.poster}
              alt={`${film.title} poster`}
              className="object-cover transition-transform duration-300 w-full h-full " />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 z-10 ">

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-20">

              <h3 className="text-white text-center text-lg font-semibold px-2">
              {film.title}</h3>

            </div>
          </div>

             <div className="absolute top-2 right-2 flex flex-col gap-1 items-end ">
              {film.watched && (
                <Badge className="bg-green-500 text-white rounded-full ">
                  <Eye className="w-3 h-3 mr-1" />
                  Watched
                </Badge>
              )}
            </div>
            <div className="absolute top-2 left-2 flex flex-col gap-1 items-end ">
              {film.favorite && (
                <Badge className="bg-red-500 text-white rounded-full ">
                  <Heart className="w-3 h-3 mr-1 fill-white" />
                  Watched
                </Badge>
              )}
            </div>
            <div className="absolute top-9 right-2 flex flex-col gap-1 items-end ">
              {film.hasNotes && (
                <Badge className="bg-blue-500 text-white rounded-full ">
                  <FileText className="w-3 h-3 mr-1" />
                  Notes
                </Badge>
              )}
            </div>
          </div>

          <CardContent className="flex-grow p-4">
            <h2 className="text-lg font-bold mb-1 line-clamp-1">{film.title}</h2>
            <div className="text-sm text-gray-500 mb-2">
              <span>{film.release_date}</span>
              <span className="mx-2">•</span>
              <span>{film.running_time}</span>
            </div>

            <div className="flex items-center mb-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold ml-1">{film.rt_score}%</span>
            </div>

            <p className={`mb-2 text-xs ${expandedSynopsis[film.id] ? '' : 'line-clamp-3'}`}>
              {film.description}
            </p>
            {film.description.length > 150 && (
              <button
                onClick={() => toggleSynopsisExpand(film.id)}
                className="text-xs text-gray-500 hover:text-gray-700 mt-1 flex items-center">
               <ArrowDown className="w-3 h-3 mr-2"/> 
                {expandedSynopsis[film.id] ? 'Read less' : 'Read more'}
              </button>
            )}

            <div className="mt-3 text-xs text-gray-500 ">
              <div>
                <span className="font-semibold">Director:</span> {film.director}
              </div>
              <div>
                <span className="font-semibold">Producer:</span> {film.producer}
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex flex-col gap-2 content-center items-center ">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleWatched(film.id)}
              className={film.watched ? "text-white bg-black" : " border border-gray-300 text-black hover:bg-gray-200/60 "}>
              <Eye className={`w-4 h-4 mr-1 `} />
              {film.watched ? 'Watched' : 'Mark Watched'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(film.id)}
              className={film.favorite ? "text-white bg-red-500 " : "bg-white border border-gray-300 text-black hover:bg-gray-200/60 "}>
              <Heart className={`w-4 h-4 mr-1 fill-white`} />
              {film.favorite ? 'Favorite' : 'Add Favorite'}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleNotes(film.id)}
              className= "border border-gray-300 text-black hover:bg-gray-200/60">
              <FileText className="w-4 h-4 mr-1" />
              Edit Notes
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}