import React, { useState } from 'react';
import { ConfidenceIntervals } from './components/calculators/ConfidenceIntervals';
import { RiskCalculator } from './components/calculators/RiskCalculator';
import { OddsCalculator } from './components/calculators/OddsCalculator';
import { DiagnosticTesting } from './components/calculators/DiagnosticTesting';
import { ClinicalSignificance } from './components/concepts/ClinicalSignificance';
import { TabType } from './types';
import { Layout, Divide, Percent, BrainCircuit, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.CONFIDENCE_INTERVALS);

  const renderContent = () => {
    switch (activeTab) {
      case TabType.CONFIDENCE_INTERVALS:
        return <ConfidenceIntervals />;
      case TabType.RISK_CALCULATOR:
        return <RiskCalculator />;
      case TabType.ODDS_CALCULATOR:
        return <OddsCalculator />;
      case TabType.DIAGNOSTIC_TESTING:
        return <DiagnosticTesting />;
      case TabType.CONCEPTS:
        return <ClinicalSignificance />;
      default:
        return <ConfidenceIntervals />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-white/10 p-2 rounded-lg">
               <Layout className="w-6 h-6 text-indigo-300" />
             </div>
             <div>
                <h1 className="text-xl font-bold tracking-tight">EBM Math Calculator Guide</h1>
                <p className="text-xs text-indigo-300 opacity-80 font-light">Interactive Study Guide</p>
             </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab(TabType.CONFIDENCE_INTERVALS)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === TabType.CONFIDENCE_INTERVALS
                ? 'border-indigo-400 text-white'
                : 'border-transparent text-indigo-300 hover:text-white'
            }`}
          >
            <Divide className="w-4 h-4" />
            Confidence Intervals
          </button>
          <button
            onClick={() => setActiveTab(TabType.RISK_CALCULATOR)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === TabType.RISK_CALCULATOR
                ? 'border-indigo-400 text-white'
                : 'border-transparent text-indigo-300 hover:text-white'
            }`}
          >
            <Percent className="w-4 h-4" />
            Risk Formulas
          </button>
          <button
            onClick={() => setActiveTab(TabType.ODDS_CALCULATOR)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === TabType.ODDS_CALCULATOR
                ? 'border-indigo-400 text-white'
                : 'border-transparent text-indigo-300 hover:text-white'
            }`}
          >
            <Layout className="w-4 h-4" />
            Odds Formulas
          </button>
           <button
            onClick={() => setActiveTab(TabType.DIAGNOSTIC_TESTING)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === TabType.DIAGNOSTIC_TESTING
                ? 'border-indigo-400 text-white'
                : 'border-transparent text-indigo-300 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            Diagnostic Tests
          </button>
          <button
            onClick={() => setActiveTab(TabType.CONCEPTS)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === TabType.CONCEPTS
                ? 'border-indigo-400 text-white'
                : 'border-transparent text-indigo-300 hover:text-white'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            Significance
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="animate-in fade-in duration-500">
           {renderContent()}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-500 text-center py-6 text-sm">
        <p>Evidence-Based Medicine Interactive Guide</p>
      </footer>
    </div>
  );
};

export default App;