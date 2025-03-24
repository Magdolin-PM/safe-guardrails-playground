
import React, { useState } from 'react';
import { projectTypes, technologies, dataTypes, ProjectType, Technology, DataType } from '../data/projectTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

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
      <div className="mb-8">
        <h2 className="text-2xl font-medium mb-2">Configure Your Project</h2>
        <p className="text-gray-dark/80">
          Tell us about your project to receive tailored security recommendations.
        </p>
      </div>
      
      {currentStep === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {projectTypes.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              className={cn(
                "flex flex-col items-center justify-center p-6 rounded-lg border border-gray transition-all duration-300",
                "hover:border-teal hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal",
                "bg-white text-left"
              )}
            >
              <div className="text-4xl mb-3">{project.icon}</div>
              <h3 className="text-xl font-medium">{project.name}</h3>
              <p className="text-sm text-gray-dark/70 mt-2">{project.description}</p>
            </button>
          ))}
        </div>
      )}
      
      {currentStep === 2 && selectedProjectType && (
        <div className="animate-slide-up">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">
                Configuring {selectedProjectType.name} {selectedProjectType.icon}
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
              className="btn-primary"
            >
              Continue to Recommendations
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
