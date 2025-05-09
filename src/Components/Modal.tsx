import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface ModalProps{
    isOpen: boolean
    onClose: () => void;
    filmId: string;
    filmTitle: string;
    currentNotes?: string;
    currentRating?:number;
    onSave: (filmId: string, notes: string, rating:number) => void;
}

export default function Modal({
    isOpen,
    onClose,
    filmId,
    filmTitle,
    currentNotes = "",
    currentRating = 0,
    onSave,
}: ModalProps) {
    
    const [notes,setNotes] = useState(currentNotes);
    const [rating, setRating] = useState(currentRating);
    const [hoveredRating, setHoveredRating] = useState(0);

    useEffect(() => {
        setNotes(currentNotes);
        setRating(currentRating);
    }, [currentNotes, currentRating]);

    const handleSave = () => {
        onSave(filmId, notes, rating);
        onClose();
    };

    const handleCancel = () => {
        setNotes(currentNotes);
        setRating(currentRating);
        onClose();
    };

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating === rating ? 0: selectedRating);
    };

return (
    <Dialog open= {isOpen} onOpenChange={handleCancel}>
    <DialogContent className="sm:max-w-md bg-white border-none">
        <DialogHeader>
            <DialogTitle>Edit Notes for {filmTitle}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
        <div className="mb-4">
            <p className="text-sm font-medium mb-2">Your Rating:</p>
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <button
                    key={i}
                    type="button"
                    onClick={()=> handleStarClick(i)}
                    onMouseEnter={()=> setHoveredRating(i)}
                    onMouseLeave={()=> setHoveredRating(0)}
                    className="focus:outline-none">
                  <Star
                    className={`w-6 h-6 cursor-pointer ${
                      i <= (hoveredRating || rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            <span className="ml-2 text-sm text-gray-500">
                {rating === 0 ? "Not rated" : `${rating}/5`}
            </span>
            </div>
        </div>

        <div>
            <p className="text-sm font-medium mb-2"> Your Notes:</p>
            <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write yout thoughts about this movie..."
            className="min-h-32"/>
        </div>
        </div>
    <DialogFooter className="flex justify-end gap-2">
        <Button className="border-gray-300 font-light" variant= "outline" onClick={handleCancel}>
            Cancel
        </Button>
        <Button onClick={handleSave} className="bg-gray-600 text-white" variant="outline">
            Save Notes
        </Button>
    </DialogFooter>
    </DialogContent>
    </Dialog>
    );
}