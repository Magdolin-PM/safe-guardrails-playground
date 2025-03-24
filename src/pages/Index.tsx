
import React, { useState } from 'react';
import ProjectSelector from '@/components/ProjectSelector';
import GuardrailsExplorer from '@/components/GuardrailsExplorer';
import FeedbackForm from '@/components/FeedbackForm';
import { guardrails } from '@/data/guardrails';
import { ProjectType, Technology, DataType } from '@/data/projectTypes';
import { Shield, Linkedin, MessageCircle, X } from 'lucide-react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "@/components/ui/drawer";

const Index = () => {
  const [projectConfig, setProjectConfig] = useState<{
    projectType: ProjectType;
    selectedTechnologies: Technology[];
    selectedDataTypes: DataType[];
  } | null>(null);
  
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleProjectConfigComplete = (config: {
    projectType: ProjectType;
    selectedTechnologies: Technology[];
    selectedDataTypes: DataType[];
  }) => {
    setProjectConfig(config);
  };

  const handleReset = () => {
    setProjectConfig(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-teal mr-2" />
              <h1 className="text-2xl font-medium text-gray-dark">Security Guardrails</h1>
            </div>
            <a 
              href="https://github.com/your-repo/security-guardrails" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal hover:text-teal-dark text-sm hidden sm:block"
            >
              Documentation & Resources
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-grow flex justify-center">
        <div className="w-full max-w-6xl py-8">
          {!projectConfig ? (
            <ProjectSelector onComplete={handleProjectConfigComplete} />
          ) : (
            <GuardrailsExplorer 
              guardrails={guardrails}
              projectType={projectConfig.projectType}
              selectedTechnologies={projectConfig.selectedTechnologies}
              selectedDataTypes={projectConfig.selectedDataTypes}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      <footer className="bg-gray-light py-6 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-dark/80 text-sm">
                Security Guardrails — Educational tool for implementing security best practices
              </p>
              <p className="mt-1 text-sm text-gray-dark/70">
                Created by <a 
                  href="https://www.linkedin.com/in/magdolin-harmina-52139978/" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-teal hover:text-teal-dark"
                >
                  Magdolin Harmina
                </a>, Founder of <a 
                  href="https://QL-Assistai.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-teal-dark"
                >
                  QL-Assistai.com
                </a>
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/magdolin-harmina-52139978/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all"
                aria-label="Contact on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-teal" />
              </a>
              
              <Drawer open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
                <DrawerTrigger asChild>
                  <button 
                    className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all"
                    aria-label="Leave Feedback"
                  >
                    <MessageCircle className="w-5 h-5 text-teal" />
                  </button>
                </DrawerTrigger>
                <DrawerContent className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Send Feedback</h2>
                    <DrawerClose asChild>
                      <button className="p-1 rounded-full hover:bg-gray-light transition-colors">
                        <X className="w-5 h-5 text-gray-dark" />
                      </button>
                    </DrawerClose>
                  </div>
                  <FeedbackForm onClose={() => setIsFeedbackOpen(false)} />
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          
          <p className="text-center text-xs text-gray-dark/60 mt-4">
            This is a static demonstration tool and not a replacement for professional security auditing.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
