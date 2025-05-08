import { useState } from "react";
import {Star, CheckCircle, Heart, FileText} from 'lucide-react'
import { Button } from "./ui/button";
import {Card, CardContent, CardFooter} from "./ui/card"
import { Badge } from "./ui/badge";

interface Film{
    id: number;
    title: string;
    original_title?: string;
    poster: string;
    year: number;
    duration: string;
    rating: number;
    synopsis: string;
    director: string;
    producer: string;
    watched: boolean;
    favorite?: boolean;
    hasNote?: boolean;
}

interface MovieGridProps{
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
}

export default function MovieGrid({
    films,
    searchQuery='',
    includeSynopsis= false,
    activeFilters={watched: false, favorites: false, withNotes: false, rating:false},
    selectedRatingFilter = 'all-movies'
}: MovieGridProps){

    const [expandedSynopsis, setExpandedSynopsis]= useState<Record<number, boolean>>({});

    
}