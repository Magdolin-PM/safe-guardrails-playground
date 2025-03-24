
import React, { useState } from 'react';
import { CodeExample } from '../data/guardrails';
import { cn } from '@/lib/utils';

interface CodeSnippetProps {
  example: CodeExample;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ example }) => {
  const [activeTab, setActiveTab] = useState<'bad' | 'good'>('bad');

  return (
    <div className="rounded-lg overflow-hidden border border-gray bg-white shadow-sm">
      <div className="flex border-b border-gray">
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium flex-1 transition-colors",
            activeTab === 'bad' 
              ? 'bg-red-50 text-red-600 border-b-2 border-red-500' 
              : 'text-gray-dark/70 hover:bg-gray-light'
          )}
          onClick={() => setActiveTab('bad')}
        >
          Vulnerable Code
        </button>
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium flex-1 transition-colors",
            activeTab === 'good' 
              ? 'bg-green-50 text-green-600 border-b-2 border-green-500' 
              : 'text-gray-dark/70 hover:bg-gray-light'
          )}
          onClick={() => setActiveTab('good')}
        >
          Secure Code
        </button>
      </div>
      
      <div className="p-4 bg-gray-light/30">
        <pre className="text-sm overflow-x-auto p-2 rounded-md bg-white border border-gray-light">
          <code>{activeTab === 'bad' ? example.bad : example.good}</code>
        </pre>
      </div>
      
      <div className="p-4 bg-white border-t border-gray">
        <h4 className="text-sm font-medium mb-2">Why This Matters:</h4>
        <p className="text-sm text-gray-dark/80">{example.explanation}</p>
      </div>
    </div>
  );
};

export default CodeSnippet;
