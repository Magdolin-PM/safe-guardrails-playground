
import React, { useState } from 'react';
import { CodeExample } from '../data/guardrails';

interface CodeSnippetProps {
  example: CodeExample;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ example }) => {
  const [activeTab, setActiveTab] = useState<'bad' | 'good'>('bad');

  return (
    <div className="rounded-lg overflow-hidden border border-gray bg-white">
      <div className="flex border-b border-gray">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'bad' 
              ? 'bg-red-50 text-red-600 border-b-2 border-red-500' 
              : 'text-gray-dark/70 hover:bg-gray-light'
          }`}
          onClick={() => setActiveTab('bad')}
        >
          Vulnerable Code
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'good' 
              ? 'bg-green-50 text-green-600 border-b-2 border-green-500' 
              : 'text-gray-dark/70 hover:bg-gray-light'
          }`}
          onClick={() => setActiveTab('good')}
        >
          Secure Code
        </button>
      </div>
      
      <div className="p-4 bg-gray-light/30">
        <pre className="text-sm overflow-x-auto p-2">
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
