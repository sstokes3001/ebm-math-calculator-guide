import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface AccordionProps {
  question: string;
  answer: string;
  explanation?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ question, answer, explanation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-indigo-100 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left px-5 py-4 flex items-center justify-between transition-colors ${
          isOpen ? 'bg-indigo-50 text-indigo-900' : 'bg-white hover:bg-slate-50 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <HelpCircle className={`w-5 h-5 ${isOpen ? 'text-indigo-600' : 'text-slate-400'}`} />
          <span className="font-medium">{question}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isOpen && (
        <div className="bg-white px-5 py-5 border-t border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="font-bold text-slate-800 mb-2">Answer:</p>
          <p className="text-slate-700 mb-4 leading-relaxed">{answer}</p>
          {explanation && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-3 text-sm text-slate-700">
              <span className="font-bold text-amber-800">Key Concept: </span>
              {explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};