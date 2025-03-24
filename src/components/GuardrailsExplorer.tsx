
import React, { useState } from 'react';
import { Guardrail } from '../data/guardrails';
import { ProjectType, Technology, DataType } from '../data/projectTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Recommendation from './Recommendation';
import CodeSnippet from './CodeSnippet';
import { Shield, Settings } from 'lucide-react';

interface GuardrailsExplorerProps {
  guardrails: Guardrail[];
  projectType: ProjectType;
  selectedTechnologies: Technology[];
  selectedDataTypes: DataType[];
  onReset: () => void;
}

const GuardrailsExplorer: React.FC<GuardrailsExplorerProps> = ({
  guardrails,
  projectType,
  selectedTechnologies,
  selectedDataTypes,
  onReset
}) => {
  const [selectedGuardrail, setSelectedGuardrail] = useState<Guardrail | null>(null);
  
  // Filter guardrails relevant to the project type
  const relevantGuardrails = guardrails.filter(guardrail => 
    guardrail.projectTypes.includes(projectType.id)
  );
  
  const techIds = selectedTechnologies.map(t => t.id);
  const dataTypeIds = selectedDataTypes.map(d => d.id);
  
  // Check if a recommendation is relevant to the selected technologies and data types
  const isRecommendationRelevant = (recommendation: any) => {
    // If no specific relevance is defined, it's relevant for all
    if (!recommendation.relevantTechnologies && !recommendation.relevantDataTypes) {
      return true;
    }
    
    let techRelevant = true;
    let dataRelevant = true;
    
    // Check technology relevance if specified
    if (recommendation.relevantTechnologies) {
      techRelevant = recommendation.relevantTechnologies.some((tech: string) => 
        techIds.includes(tech)
      );
    }
    
    // Check data type relevance if specified
    if (recommendation.relevantDataTypes) {
      dataRelevant = recommendation.relevantDataTypes.some((dataType: string) => 
        dataTypeIds.includes(dataType)
      );
    }
    
    return techRelevant || dataRelevant;
  };
  
  return (
    <div className="w-full max-w-4xl animate-fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-medium flex items-center">
            <Shield className="w-6 h-6 text-teal mr-2" />
            Security Guardrails
          </h2>
          <p className="text-gray-dark/80 mt-1">
            Based on your {projectType.name} project with {selectedTechnologies.length} technologies
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-teal hover:text-teal-dark font-medium flex items-center"
        >
          <Settings className="w-4 h-4 mr-1" />
          Configure New Project
        </button>
      </div>
      
      {selectedGuardrail ? (
        <div className="animate-fade-in">
          <div className="mb-6 flex items-center">
            <button
              onClick={() => setSelectedGuardrail(null)}
              className="text-teal hover:text-teal-dark mr-4"
            >
              ← Back to All Guardrails
            </button>
            <h3 className="text-xl font-medium">
              <span className="mr-2">{selectedGuardrail.icon}</span>
              {selectedGuardrail.title}
            </h3>
          </div>
          
          <p className="mb-6 text-gray-dark/80">{selectedGuardrail.description}</p>
          
          <Tabs defaultValue="recommendations" className="w-full">
            <TabsList>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="code-examples">Code Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommendations" className="py-4 space-y-4">
              {selectedGuardrail.recommendations.map((recommendation, index) => (
                <Recommendation 
                  key={index}
                  recommendation={recommendation}
                  isRelevant={isRecommendationRelevant(recommendation)}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="code-examples" className="py-4 space-y-6">
              {selectedGuardrail.codeExamples.map((example, index) => (
                <CodeSnippet key={index} example={example} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {relevantGuardrails.map((guardrail) => (
            <button
              key={guardrail.id}
              onClick={() => setSelectedGuardrail(guardrail)}
              className="flex flex-col items-center text-left p-6 rounded-lg border border-gray-light hover:border-teal hover:shadow-md transition-all duration-300 bg-white"
            >
              <div className="text-4xl mb-4">{guardrail.icon}</div>
              <h3 className="text-xl font-medium mb-2">{guardrail.title}</h3>
              <p className="text-sm text-gray-dark/80">{guardrail.description}</p>
            </button>
          ))}
        </div>
      )}
      
      <div className="mt-12 px-6 py-5 bg-gray-light/40 rounded-lg border border-gray-light">
        <h3 className="text-lg font-medium mb-2">Security Scoring</h3>
        <p className="text-sm text-gray-dark/80 mb-4">
          Based on your project configuration, here are the key security areas you should focus on:
        </p>
        
        <div className="space-y-3">
          {selectedDataTypes.some(dt => dt.riskLevel === 'high') && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm font-medium">
                High-risk data detected - prioritize all security recommendations
              </span>
            </div>
          )}
          
          {techIds.includes('nodejs') && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-teal mr-2"></div>
              <span className="text-sm font-medium">
                Node.js apps should focus on API security and input validation
              </span>
            </div>
          )}
          
          {(techIds.includes('mysql') || techIds.includes('postgresql')) && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-teal mr-2"></div>
              <span className="text-sm font-medium">
                SQL databases require parameterized queries to prevent injection
              </span>
            </div>
          )}
          
          {projectType.id === 'ecommerce' && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm font-medium">
                E-commerce sites need strong payment information protection
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuardrailsExplorer;
