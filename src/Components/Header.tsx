import { useState } from 'react';
import {
Select,
SelectContent,
SelectGroup,
SelectItem,
SelectTrigger,
SelectValue
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import { Star, Eye, Heart, FileText, X, Search } from 'lucide-react';

const sortOptions = [
"Default",
"Title (A-Z)",
"Title (Z-A)",
"Duration (Shortest)",
"Duration (Longest)",
"Your Rating (Highest)",
"Your Rating (Lowest)",
"Score (Highest)",
"Score (Lowest)",
];

export default function Header() {
const [search, setSearch] = useState('');
const [includeSynopsis, setIncludeSynopsis] = useState(false);
const [selectedSort, setSelectedSort] = useState('Default');
const [showRatingDropdown, setShowRatingDropdown] = useState(false);
const [selectedRatingFilter, setSelectedRatingFilter]= useState('all-movies');
interface ActiveFilters {
  watched: boolean;
  favorites: boolean;
  withNotes: boolean;
  rating: boolean;
}

const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
  watched: false,
  favorites: false,
  withNotes: false,
  rating: false
});

type FilterKey = 'watched' | 'favorites' | 'withNotes' | 'rating';

const toggleFilter = (key: FilterKey) => {
  if (key === 'rating') {
    setShowRatingDropdown(!showRatingDropdown);
    if (selectedRatingFilter !== 'all-movies') {
      setActiveFilters(prev => ({
        ...prev,
        rating: true
      }));
    }
  } else {
    setActiveFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }
};

const removeFilter = (key: FilterKey) => {
  setActiveFilters(prev => ({
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
    setActiveFilters(prev => ({
      ...prev,
      rating: true
    }));
  } else {
    setActiveFilters(prev => ({
      ...prev,
      rating: false
    }));
  }
  setShowRatingDropdown(false);
};

return (
<div className="max-w-6xl mx-auto px-4 py-6">
  <header className="text-center mb-8">
    <h1 className="text-4xl font-bold text-gray-800">
      Studio Ghibli Collection
    </h1>
    <p className="text-gray-600 mt-2">
      Explore the magical world of Studio Ghibli films. Mark your favorites and keep track of what you've watched.
    </p>
  </header>

<div className="flex flex-col space-y-4">
  <div className="flex items-center justify-between gap-4">
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="w-4 h-4 " />
      </div>
        <Input
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300"
        />
      </div>

      <Select value={selectedSort} onValueChange={setSelectedSort}>
        <SelectTrigger className="w-48 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg border border-gray-200">
          <SelectGroup>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option} className="hover:bg-gray-100">
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

  <div className="flex items-center ">
    <Checkbox
      id="include-synopsis"
      checked={includeSynopsis}
      onCheckedChange={(checked) => setIncludeSynopsis(Boolean(checked))}
      className="mr-2 "
    />
    <label htmlFor="include-synopsis" className="text-sm text-gray-600">
      Include synopsis in search
    </label>
  </div>

<div className="flex flex-col space-y-2">
  <div className="flex items-center space-x-2">
    <span className="text-sm font-medium text-gray-600">Filters:</span>
      <div className="flex space-x-2">
        <button 
          className={`flex items-center px-3 py-1.5 rounded-md text-sm ${activeFilters.watched ? 'bg-green-100 text-green-800 ' : 'none:border'}`}
          onClick={() => toggleFilter('watched')}>
          <Eye className="w-4 h-4 mr-1.5" />
          Watched
        </button>
      <button 
        className={`flex items-center px-3 py-1.5 rounded-md text-sm ${activeFilters.favorites ? 'bg-red-100 text-red-800' : 'none:border'}`}
        onClick={() => toggleFilter('favorites')}>
        <Heart className="w-4 h-4 mr-1.5" />
        Favorites
      </button>
      <button 
        className={`flex items-center px-3 py-1.5 rounded-md text-sm ${activeFilters.withNotes ? 'bg-blue-100 text-blue-800' : 'none:border'}`}
        onClick={() => toggleFilter('withNotes')}>
        <FileText className="w-4 h-4 mr-1.5" />
        With Notes
      </button>
    <div className="relative">
      <button 
        className="flex items-center px-3 py-1.5 rounded-md text-sm border border-gray-300 bg-white"
        onClick={() => setShowRatingDropdown(!showRatingDropdown)}>
        <Star className="w-4 h-4 mr-1.5" />
        Rating
      </button> 

      {showRatingDropdown && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-10">
          <div className="p-2">
            <div className="flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
              <input type="radio" id="all-movies" name="rating" className="mr-2" 
              checked={selectedRatingFilter === 'all-movies'}
              onChange={() => handleRatingSelect('all-movies')}/>
              <label htmlFor="all-movies" className="text-sm">All Movies</label>
            </div>
            
            <div className="flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
              <input type="radio" id="any-rating" name="rating" className="mr-2"
              checked={selectedRatingFilter === 'any-rating'}
              onChange={() => handleRatingSelect('any-rating')}/>
              <label htmlFor="any-rating" className="text-sm flex items-center">
                Any Rating 
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
              </label>
            </div>
            
            <div className="flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
              <input type="radio" id="unrated" name="rating" className="mr-2" 
              checked={selectedRatingFilter === 'unrated'}
              onChange={() => handleRatingSelect('unrated')}/>
              <label htmlFor="unrated" className="text-sm">Unrated</label>
            </div>
            
            <div className="flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
              <input type="radio" id="5-stars" name="rating" className="mr-2"
              checked={selectedRatingFilter === '5-stars'}
              onChange={() => handleRatingSelect('5-stars')} />
              <label htmlFor="5-stars" className="text-sm flex items-center">
                5 Stars 
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
              </label>
            </div>
            
            <div className="flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
              <input type="radio" id="4-stars" name="rating" className="mr-2"
              checked={selectedRatingFilter === '4-stars'}
              onChange={() => handleRatingSelect('4-stars')} />
              <label htmlFor="4-stars" className="text-sm flex items-center">
                4 Stars
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
              </label>
            </div>
            
            <div className="flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
              <input type="radio" id="3-stars" name="rating" className="mr-2"
              checked={selectedRatingFilter === '3-stars'}
              onChange={() => handleRatingSelect('3-stars')} />
              <label htmlFor="3-stars" className="text-sm flex items-center">
                3 Stars
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
              </label>
            </div>
            
            <div className="flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
              <input type="radio" id="2-stars" name="rating" className="mr-2"
              checked={selectedRatingFilter === '2-stars'}
              onChange={() => handleRatingSelect('2-stars')} />
              <label htmlFor="2-stars" className="text-sm flex items-center">
                2 Stars
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
              </label>
            </div>
            
            <div className="flex items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
              <input type="radio" id="1-star" name="rating" className="mr-2"
              checked={selectedRatingFilter === '1-star'}
              onChange={() => handleRatingSelect('1-star')} />
              <label htmlFor="1-star" className="text-sm flex items-center">
                1 Star
                <Star className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500 stroke stroke-black" />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

{(activeFilters.watched || activeFilters.favorites || activeFilters.withNotes || activeFilters.rating) && (
  <div className="flex items-center">
    <span className="text-sm text-gray-600 mr-2">Active filters:</span>
    <div className="flex flex-wrap gap-2">
      {activeFilters.watched && (
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-50 text-green-700 border-green-200">
          Watched
          <button 
          className="ml-1 hover:text-green-900"
          onClick={() => removeFilter('watched')}>
          <X className="w-3 h-3" />
          </button>
        </div>
)}
      
      {activeFilters.favorites && (
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-red-50 text-red-700 border-red-200">
          Favorites
          <button 
          className="ml-1 hover:text-red-900"
          onClick={() => removeFilter('favorites')}>
          <X className="w-3 h-3" />
          </button>
        </div>
)}
      
      {activeFilters.withNotes && (
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-blue-50 text-blue-700 border-blue-200">
          With Notes
          <button 
          className="ml-1 hover:text-blue-900"
          onClick={() => removeFilter('withNotes')}>
          <X className="w-3 h-3" />
          </button>
        </div>
)}

      {activeFilters.rating && (
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-50 text-yellow-700 border-yellow-200">
          {selectedRatingFilter === 'any-rating' && 'Any Rating'}
          {selectedRatingFilter === 'unrated' && 'Unrated'}
          {selectedRatingFilter === '5-stars' && '5 Stars'}
          {selectedRatingFilter === '4-stars' && '4 Stars'}
          {selectedRatingFilter === '3-stars' && '3 Stars'}
          {selectedRatingFilter === '2-stars' && '2 Stars'}
          {selectedRatingFilter === '1-star' && '1 Star'}
          <button 
          className="ml-1 hover:text-yellow-900"
          onClick={() => removeFilter('rating')}>
          <X className="w-3 h-3" />
          </button>
        </div>
)}
</div>
</div>
)}
</div>
</div>
</div>
);
}
