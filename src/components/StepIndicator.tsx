
import React from 'react';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: { title: string; number: number }[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-12">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-8 w-full max-w-3xl mx-auto px-4 sm:px-0">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center max-w-[120px]">
            <div 
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-2 text-lg font-medium",
                currentStep >= step.number 
                  ? "bg-teal/10 text-teal border-2 border-teal/20" 
                  : "bg-gray-light text-gray-dark border-2 border-gray/20"
              )}
            >
              {step.number}
            </div>
            <span className="text-sm text-gray-dark text-center">{step.title}</span>
          </div>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-dark">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-gray-dark">Project Setup</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2 bg-gray-light" />
      </div>
    </div>
  );
};

export default StepIndicator;
