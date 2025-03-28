
import React from 'react';
import { Recommendation as RecommendationType } from '../data/guardrails';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface RecommendationProps {
  recommendation: RecommendationType;
  isRelevant: boolean;
}

const Recommendation: React.FC<RecommendationProps> = ({ recommendation, isRelevant }) => {
  // Map priority to color
  const priorityColors = {
    low: "bg-blue-100 text-blue-600",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-600"
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-lg border transition-all",
        isRelevant 
          ? 'border-teal/30 bg-teal/5 hover:shadow-md' 
          : 'border-gray-light bg-white hover:border-gray'
      )}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-base font-medium">{recommendation.title}</h3>
        <Badge 
          className={cn(
            "ml-2 whitespace-nowrap",
            priorityColors[recommendation.priority],
            "bg-opacity-15 border-none"
          )}
        >
          {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
        </Badge>
      </div>
      <p className="mt-2 text-sm text-gray-dark/80">{recommendation.description}</p>
      
      {!isRelevant && (
        <div className="mt-3 text-xs text-gray-dark/60 italic">
          This recommendation is less relevant for your selected project configuration.
        </div>
      )}
    </div>
  );
};

export default Recommendation;
