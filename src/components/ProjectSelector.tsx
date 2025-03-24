
import React, { useState } from 'react';
import { projectTypes, technologies, dataTypes, ProjectType, Technology, DataType } from '../data/projectTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import StepIndicator from './StepIndicator';
import { Globe, ServerStack, Code, Smartphone } from 'lucide-react';

// Map project types to their respective icons
const projectTypeIcons = {
  website: <Globe className="w-10 h-10 text-teal" />,
  saas: <ServerStack className="w-10 h-10 text-teal" />,
  api: <Code className="w-10 h-10 text-teal" />,
  mobile: <Smartphone className="w-10 h-10 text-teal" />,
  ecommerce: <Globe className="w-10 h-10 text-teal" />
};

type ProjectSelectorProps = {
  onComplete: (selection: {
    projectType: ProjectType;
    selectedTechnologies: Technology[];
    selectedDataTypes: DataType[];
  }) => void;
};

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onComplete }) => {
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectType | null>(null);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const steps = [
    { title: "Select your project type", number: 1 },
    { title: "Configure safety filters", number: 2 },
    { title: "Get personalized recommendations", number: 3 }
  ];

  const handleProjectSelect = (projectType: ProjectType) => {
    setSelectedProjectType(projectType);
    
    // Pre-select recommended technologies
    setSelectedTechs(projectType.recommendedTechnologies);
    
    // Pre-select common data types for this project type
    const defaultDataTypes = dataTypes
      .filter(dt => projectType.commonDataTypes.includes(dt.id) || dt.defaultSelected)
      .map(dt => dt.id);
    
    setSelectedData(defaultDataTypes);
    
    setCurrentStep(2);
  };

  const handleTechToggle = (techId: string) => {
    setSelectedTechs(prev => 
      prev.includes(techId) 
        ? prev.filter(id => id !== techId) 
        : [...prev, techId]
    );
  };

  const handleDataTypeToggle = (dataTypeId: string) => {
    setSelectedData(prev => 
      prev.includes(dataTypeId) 
        ? prev.filter(id => id !== dataTypeId) 
        : [...prev, dataTypeId]
    );
  };

  const handleComplete = () => {
    if (!selectedProjectType) return;
    
    const selectedTechnologies = technologies.filter(tech => 
      selectedTechs.includes(tech.id)
    );
    
    const selectedDataTypes = dataTypes.filter(dt => 
      selectedData.includes(dt.id)
    );
    
    onComplete({
      projectType: selectedProjectType,
      selectedTechnologies,
      selectedDataTypes
    });
  };

  return (
    <div className="w-full max-w-4xl animate-fade-in">
      <StepIndicator currentStep={currentStep} totalSteps={3} steps={steps} />
      
      {currentStep === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-medium mb-6">Select Your Project Type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {projectTypes.filter(p => p.id !== 'ecommerce').map((project) => (
              <button
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-lg border transition-all duration-300",
                  "hover:border-teal hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal",
                  "bg-white text-center h-full"
                )}
              >
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                  {projectTypeIcons[project.id as keyof typeof projectTypeIcons]}
                </div>
                <h3 className="text-lg font-medium">{project.name}</h3>
                <p className="text-sm text-gray-dark/70 mt-2">{project.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {currentStep === 2 && selectedProjectType && (
        <div className="animate-slide-up">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">
                Configure Safety Filters for {selectedProjectType.name}
              </h3>
              <button 
                onClick={() => setCurrentStep(1)}
                className="text-teal hover:text-teal-dark text-sm"
              >
                Change Project Type
              </button>
            </div>
            <p className="text-gray-dark/80 mt-1">
              Customize your technology stack and data handling requirements.
            </p>
          </div>
          
          <Tabs defaultValue="technologies" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="technologies">Technologies Used</TabsTrigger>
              <TabsTrigger value="data">Data Handled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="technologies" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {technologies.map((tech) => (
                  <div key={tech.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`tech-${tech.id}`}
                      checked={selectedTechs.includes(tech.id)}
                      onCheckedChange={() => handleTechToggle(tech.id)}
                    />
                    <Label 
                      htmlFor={`tech-${tech.id}`}
                      className="cursor-pointer"
                    >
                      {tech.name}
                    </Label>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="data" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {dataTypes.map((dataType) => (
                  <div key={dataType.id} className="flex items-start space-x-2">
                    <Checkbox 
                      id={`data-${dataType.id}`}
                      checked={selectedData.includes(dataType.id)}
                      onCheckedChange={() => handleDataTypeToggle(dataType.id)}
                      className="mt-1"
                    />
                    <div>
                      <Label 
                        htmlFor={`data-${dataType.id}`}
                        className="cursor-pointer flex items-center"
                      >
                        {dataType.name}
                        {dataType.riskLevel === 'high' && (
                          <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
                            High Risk
                          </span>
                        )}
                      </Label>
                      <p className="text-sm text-gray-dark/70 mt-0.5">
                        {dataType.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleComplete}
              className="bg-teal hover:bg-teal-dark text-white px-6 py-2 rounded-md transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
