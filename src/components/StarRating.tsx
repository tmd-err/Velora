import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
  className?: string;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'sm', 
  showRating = false,
  className = "" 
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const starSize = sizeClasses[size];
  
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, index) => {
          const filled = index < Math.floor(rating);
          const partiallyFilled = index === Math.floor(rating) && rating % 1 !== 0;
          
          return (
            <div key={index} className="relative">
              <Star 
                className={`${starSize} ${
                  filled || partiallyFilled 
                    ? "fill-accent text-accent" 
                    : "fill-none text-muted-foreground"
                }`}
              />
              {partiallyFilled && (
                <div 
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${(rating % 1) * 100}%` }}
                >
                  <Star className={`${starSize} fill-accent text-accent`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showRating && (
        <span className="text-sm text-muted-foreground ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}