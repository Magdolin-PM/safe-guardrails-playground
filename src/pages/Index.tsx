
import React, { useState } from 'react';
import ProjectSelector from '@/components/ProjectSelector';
import GuardrailsExplorer from '@/components/GuardrailsExplorer';
import { guardrails } from '@/data/guardrails';
import { ProjectType, Technology, DataType } from '@/data/projectTypes';

const Index = () => {
  const [projectConfig, setProjectConfig] = useState<{
    projectType: ProjectType;
    selectedTechnologies: Technology[];
    selectedDataTypes: DataType[];
  } | null>(null);

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
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-light">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-2xl mr-2">🛡️</div>
              <h1 className="text-2xl font-medium text-gray-dark">Security Guardrails</h1>
            </div>
            <a 
              href="https://github.com/your-repo/security-guardrails" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-teal hover:text-teal-dark text-sm"
            >
              Documentation & Resources
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
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
      </main>

      <footer className="bg-gray-light py-6">
        <div className="container mx-auto px-6 text-center text-gray-dark/70 text-sm">
          <p>Security Guardrails — Educational tool for implementing security best practices</p>
          <p className="mt-2">This is a static demonstration tool and not a replacement for professional security auditing.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
