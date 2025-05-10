import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import { Star, Eye, Heart, FileText, X, Search } from 'lucide-react';
import { Button } from './ui/button';

const sortOptions = [
  "Default",
  "Title (A-Z)",
  "Title (Z-A)",
  "Duration (Shortest)",
  "Duration (Longest)",
  "Score (Highest)",
  "Score (Lowest)",
];

const ratingFilterOptions = [
  { id: 'all-movies', label: 'All Movies', stars: 0 },
  { id: 'any-rating', label: 'Any Rating', stars: 1, showStar: true },
  { id: 'unrated', label: 'Unrated', stars: 0 },
  { id: '5-stars', label: '5 Stars', stars: 5 },
  { id: '4-stars', label: '4 Stars', stars: 4 },
  { id: '3-stars', label: '3 Stars', stars: 3 },
  { id: '2-stars', label: '2 Stars', stars: 2 },
  { id: '1-star', label: '1 Star', stars: 1 },
];

const renderStars = (count: number) => {
  return Array(count).fill(0).map((_, index) => (
    <Star key={index} className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500" />
  ));
};

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  includeSynopsis: boolean;
  setIncludeSynopsis: (include: boolean) => void;
  activeFilters: {
    watched: boolean;
    favorites: boolean;
    withNotes: boolean;
    rating: boolean;
  };
  setActiveFilters: (filters: any) => void;
  selectedRatingFilter: string;
  setSelectedRatingFilter: (filter: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
  onClearFilters?: () => void;

}

export default function Header({
searchQuery,
setSearchQuery,
includeSynopsis,
setIncludeSynopsis,
activeFilters,
setActiveFilters,
selectedRatingFilter,
setSelectedRatingFilter,
selectedSort,
setSelectedSort,
onClearFilters
}: HeaderProps) {
const [showRatingDropdown, setShowRatingDropdown] = useState(false);

type FilterKey = 'watched' | 'favorites' | 'withNotes' | 'rating';

const toggleFilter = (key: FilterKey) => {
  if (key === 'rating') {
    setShowRatingDropdown(!showRatingDropdown);
    if (selectedRatingFilter !== 'all-movies') {
      setActiveFilters((prev: any) => ({
        ...prev,
        rating: true
      }));
    }
  } else {
    setActiveFilters((prev: any) => ({
      ...prev,
      [key]: !prev[key]
    }));
  }
};

const removeFilter = (key: FilterKey) => {
  setActiveFilters((prev: any) => ({
    ...prev,
    [key]: false
  }));
  if (key === 'rating') {
    setSelectedRatingFilter('all-movies');
  }
};

const handleRatingSelect = (ratingId: string) => {
  setSelectedRatingFilter(ratingId);
  if (ratingId !== 'all-movies') {
    setActiveFilters((prev: any) => ({
      ...prev,
      rating: true
    }));
  } else {
    setActiveFilters((prev: any) => ({
      ...prev,
      rating: false
    }));
  }
  setShowRatingDropdown(false);
};

return (
  <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
    <header className="text-center mb-4 sm:mb-8">
      <h1 className="text-2xl sm:text-4x1 font-bold text-gray-800">
        Studio Ghibli Collection
      </h1>
      <p className="text-gray-600 mt-2 text-sm sm:text-base mt-1 sm:mt-2 px-2" >
        Explore the magical world of Studio Ghibli films. Mark your favorites and keep track of what you've watched.
      </p>
    </header>

<div className="flex flex-col space-y-3 sm:space-y-4">
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:justify-between sm:gap-4 items-center">
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="w-4 h-4" />
      </div>
      <Input
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300"
      />
    </div>

    <Select value={selectedSort} onValueChange={setSelectedSort}>
      <SelectTrigger className="cursor-pointer w-full sm:w-48 mt-2 sm:mt-0 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black">
        <SelectValue placeholder="Default" />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-lg border border-gray-200">
        <SelectGroup>
          {sortOptions.map((option) => (
            <SelectItem key={option} value={option} className="hover:bg-gray-100 cursor-pointer">
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>

<div className="flex items-center">
      <Checkbox
        id="include-synopsis"
        checked={includeSynopsis}
        onCheckedChange={(checked) => setIncludeSynopsis(Boolean(checked))}
        className="mr-2"
      />
      <label htmlFor="include-synopsis" className="text-sm text-gray-600">
        Include synopsis in search
      </label>
</div>

<div className="flex flex-col space-y-2">
  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
    <span className="text-sm font-medium text-gray-600">Filters:</span>
    <div className="flex flex-wrap gap-2">
      <button
        className={`cursor-pointer flex items-center px-2 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm ${activeFilters.watched ? 'bg-green-100 text-green-800' : 'border border-gray-300'}`}
        onClick={() => toggleFilter('watched')}>
        <Eye className="w-3 h-3 sm:w-4 sm:-h4 mr-1 sm:mr-1.5" />
        Watched
      </button>
      <button
        className={`cursor-pointer flex items-center px-2 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm ${activeFilters.favorites ? 'bg-red-100 text-red-800' : 'border border-gray-300'}`}
        onClick={() => toggleFilter('favorites')}>
        <Heart className="w-3 h-3 sm:w-4 sm:-h4 mr-1 sm:mr-1.5" />
        Favorites
      </button>
      <button
        className={`cursor-pointer flex items-center px-2 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm ${activeFilters.withNotes ? 'bg-blue-100 text-blue-800' : 'border border-gray-300'}`}
        onClick={() => toggleFilter('withNotes')}>
        <FileText className="w-3 h-3 sm:w-4 sm:-h4 mr-1 sm:mr-1.5" />
        With Notes
      </button>
      <div className="relative ">
        <button
          className={`cursor-pointer flex items-center px-2 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm ${activeFilters.rating ? 'bg-yellow-100 text-yellow-800' : 'border border-gray-300 bg-white'}`}
          onClick={() => toggleFilter('rating')}>
          <Star className="w-3 h-3 sm:w-4 sm:-h4 mr-1 sm:mr-1.5" />
          Rating
        </button>

        {showRatingDropdown && (
          <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-10">
            <div className="p-2">
              {ratingFilterOptions.map(option => (
                <div key={option.id} className="flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
                  <input 
                    type="radio" 
                    id={option.id} 
                    name="rating" 
                    className="mr-2"
                    checked={selectedRatingFilter === option.id}
                    onChange={() => handleRatingSelect(option.id)} 
                  />
                  <label htmlFor={option.id} className="text-sm flex items-center">
                    {option.label}
                    {option.showStar && <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500" />}
                    {!option.showStar && option.stars > 0 && renderStars(option.stars)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="sm:ml-auto">
      {onClearFilters && (searchQuery || activeFilters.watched || activeFilters.favorites || activeFilters.withNotes || activeFilters.rating) && (
          <Button 
            onClick={onClearFilters}
            variant="ghost"
            className="cursor-pointer text-xs sm:text-sm font-light py-1 px-2 sm:px-3 rounded-md border border-gray-300 hover:bg-gray-200/60 flex items-center h-4.5 sm:h-8.5"
          >
            Clear All
          </Button>
      )}
      </div>
    </div>
  </div>
</div>

  {(activeFilters.watched || activeFilters.favorites || activeFilters.withNotes || activeFilters.rating) && (
    <div className="flex flex-col sm:flex-row sm:items-center">
      <span className="text-sm text-gray-600 sm:mr-2 mb-1 sm:b-0">Active filters:</span>
      <div className="flex flex-wrap gap-2">
        {activeFilters.watched && (
          <div className=" h-5.5 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-50 text-green-700 border-green-200">
            Watched
            <Button
            className="hover:text-green-900"
            onClick={() => removeFilter('watched')}>
            <X className="w-3 h-3" />
            </Button>
          </div>
        )}

        {activeFilters.favorites && (
          <div className="h-5.5 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-red-50 text-red-700 border-red-200">
            Favorites
            <Button
            className=" hover:text-red-900"
            onClick={() => removeFilter('favorites')}>
            <X className="w-3 h-3" />
            </Button>
          </div>
        )}

        {activeFilters.withNotes && (
          <div className="h-5.5 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-50 text-blue-700 border-blue-200">
            With Notes
            <Button
            className=" hover:text-blue-900"
            onClick={() => removeFilter('withNotes')}>
            <X className="w-3 h-3" />
            </Button>
          </div>
        )}

        {activeFilters.rating && (
          <div className="cursor-pointer h-5.5 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-50 text-yellow-700 border-yellow-200">
            {selectedRatingFilter === 'any-rating' && 'Any Rating'}
            {selectedRatingFilter === 'unrated' && 'Unrated'}
            {selectedRatingFilter === '5-stars' && '⭐⭐⭐⭐⭐ Stars'}
            {selectedRatingFilter === '4-stars' && '⭐⭐⭐⭐ Stars'}
            {selectedRatingFilter === '3-stars' && '⭐⭐⭐ Stars'}
            {selectedRatingFilter === '2-stars' && '⭐⭐Stars'}
            {selectedRatingFilter === '1-star' && '⭐ Star'}
            <Button
            className=" hover:text-yellow-900"
            onClick={() => removeFilter('rating')}>
            <X className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )}
</div>
</div>
);
}