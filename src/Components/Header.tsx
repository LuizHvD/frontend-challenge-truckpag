import { useState } from 'react'
import './Header.css'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Input } from "@/Components/ui/input"
import { Checkbox } from "@/Components/ui/checkbox"
import { Label } from "@/Components/ui/label"
import { Button } from "@/Components/ui/button"

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

export function Header(){
  const [search, setSearch]= useState("");
  const [includeSynopsis, setIncludeSynopsis]= useState(false);
  const [selectedSort, setSelectedSort]= useState("Default");
  const [filters, setFilters]= useState({
    watched: false,
    favorites: false,
    notes: false,
    rating: false,
  });

  const toggleFilter= (key: keyof typeof filters) => {
    setFilters({...filters, [key]: !filters[key]});
  };

  return(

  <header className='Header'>
    <h1 className='Title'> Studio Ghibli Collection</h1>
      <p className='Text Title'> Explore the magical world of Studio Ghibli films. Mark your favorites and keep track of what you've watched.</p>
    <div className='Search'>
      <div className='Search input'>
      <Input placeholder="Search movies ..."
      value={search}
      onChange={(e)=> setSearch(e.target.value)}
      />
    </div>
      <div className='Checkbox'>
        <Checkbox className='Checkbox input'
        id="include-synopsis"
        checked={includeSynopsis}
        onCheckedChange={(checked)=> setIncludeSynopsis(Boolean(checked))}
        />
          <Label htmlFor="Include synopsis" className='Text Checkbox'>
            Include synopsis in search
          </Label>
      </div>
    </div>

  <div className='sort'>
    <Select value={selectedSort} onValueChange={(value) => setSelectedSort(value)}>
    <SelectTrigger className="SelectTrigger">
      <SelectValue placeholder="Sort by..." />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel></SelectLabel>
        {sortOptions.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
  </div>

<div className='Filters'>
  <span className='Text filters'>Filters:</span>
    <Button variant={filters.watched ? "default":"outline"}
      onClick={() => toggleFilter("watched")}>
      Watched
    </Button>
    <Button variant={filters.favorites ? "secondary":"outline"}
      onClick={() => toggleFilter("favorites")}>
      Favorites
    </Button>
    <Button variant={filters.notes ? "secondary":"outline"}
      onClick={() => toggleFilter("notes")}>
      With Notes
    </Button>
    <Button variant={filters.rating ? "default":"outline"}
      onClick={() => toggleFilter("rating")}>
      Rating
    </Button>
  </div>
</header>
);
}
