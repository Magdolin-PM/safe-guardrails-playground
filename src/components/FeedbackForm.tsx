
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface FeedbackFormProps {
  onClose: () => void;
}

interface FeedbackData {
  rating: number;
  message: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<FeedbackData>();
  
  const onSubmit = async (data: FeedbackData) => {
    try {
      // In a real app, you would send this to a server
      console.log({
        rating,
        message: data.message,
        recipient: "mharmina@ql-assistai.com"
      });
      
      // Show success message
      toast({
        title: "Feedback sent",
        description: "Thank you for your feedback!",
      });
      
      // Close the drawer
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send feedback. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">How would you rate your experience?</label>
        <div className="flex space-x-2 justify-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none transition-colors"
              aria-label={`${value} ${value === 1 ? 'star' : 'stars'}`}
            >
              <Star
                className={`w-8 h-8 ${
                  value <= (hoveredRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                } transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Your feedback (optional)
        </label>
        <Textarea
          id="message"
          placeholder="Tell us what you think about this tool..."
          className="resize-none"
          {...register("message")}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={rating === 0 || isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Feedback"}
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
