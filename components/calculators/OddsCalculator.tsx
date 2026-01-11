import React, { useState, useRef } from 'react';
import { Card } from '../ui/Card';
import { Accordion } from '../ui/Accordion';
import { DownloadButton } from '../ui/DownloadButton';
import { Calculator } from 'lucide-react';

export const OddsCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({ a: 40, b: 20, c: 60, d: 80 });
  const [results, setResults] = useState({ a: 40, b: 20, c: 60, d: 80 });
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    setResults(inputs);
  };

  // Odds Ratio = (a * d) / (b * c)
  const numerator = results.a * results.d;
  const denominator = results.b * results.c;
  const or = denominator > 0 ? numerator / denominator : 0;
  
  let interpretation = "Null (No Association)";
  let colorClass = "text-slate-600";
  if (or > 1.0) {
    interpretation = "Exposure is Harmful (Risk Factor)";
    colorClass = "text-rose-600";
  } else if (or < 1.0 && or > 0) {
    interpretation = "Exposure is Protective";
    colorClass = "text-emerald-600";
  }

  return (
    <div className="max-w-4xl mx-auto" ref={contentRef}>
      <div className="flex justify-end mb-4" data-html2canvas-ignore>
        <DownloadButton targetRef={contentRef} filename="Odds_Ratio_Results" />
      </div>

      <div className="space-y-8 bg-white/50 p-6 rounded-xl border border-slate-100/50 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Odds Formulas</h2>
          <p className="text-slate-600">For Case-Control Studies (Looking BACKWARD)</p>
          <p className="text-xs bg-amber-100 text-amber-800 inline-block px-2 py-1 rounded">⚠️ Note: We calculate ODDS here, not RISK.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card title="The 2x2 Table (Case-Control)">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center items-end mb-2">
                <div className="col-start-2 font-bold text-rose-700 text-sm border-b-2 border-rose-200 pb-1">CASES<br/><span className="font-normal text-xs opacity-75">(Sick)</span></div>
                <div className="font-bold text-emerald-700 text-sm border-b-2 border-emerald-200 pb-1">CONTROLS<br/><span className="font-normal text-xs opacity-75">(Healthy)</span></div>
              </div>

              {/* Row 1: Exposed */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-right font-bold text-slate-700 text-sm">Exposed</div>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-xs text-slate-400 font-mono">(a)</span>
                  <input 
                    type="number" 
                    value={inputs.a} 
                    onChange={(e) => setInputs({...inputs, a: Number(e.target.value)})}
                    className="w-full p-2 pl-8 border border-slate-300 rounded bg-orange-50/50 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-xs text-slate-400 font-mono">(b)</span>
                  <input 
                    type="number" 
                    value={inputs.b} 
                    onChange={(e) => setInputs({...inputs, b: Number(e.target.value)})}
                    className="w-full p-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>

              {/* Row 2: Not Exposed */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-right font-bold text-slate-700 text-sm">Not Exposed</div>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-xs text-slate-400 font-mono">(c)</span>
                  <input 
                    type="number" 
                    value={inputs.c} 
                    onChange={(e) => setInputs({...inputs, c: Number(e.target.value)})}
                    className="w-full p-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-xs text-slate-400 font-mono">(d)</span>
                  <input 
                    type="number" 
                    value={inputs.d} 
                    onChange={(e) => setInputs({...inputs, d: Number(e.target.value)})}
                    className="w-full p-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded text-sm text-slate-600 border border-slate-200 mt-4">
                <strong>Scenario:</strong> Looking back to see if sick people (Cases) were exposed to a risk factor more often than healthy people (Controls).
              </div>

              <button
                onClick={handleCalculate}
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Odds Ratio
              </button>
            </div>
          </Card>

          {/* Results */}
          <Card title="Odds Ratio (OR)" className="bg-white border-slate-200">
            <div className="flex flex-col items-center text-center space-y-6 py-2">
                
                <div className="text-lg font-mono text-slate-500">
                  (a × d) ÷ (b × c)
                </div>
                
                <div className="bg-slate-100 p-6 rounded-full w-36 h-36 flex items-center justify-center border-4 border-indigo-100 shrink-0">
                  <span className="text-4xl font-black text-indigo-600">{or.toFixed(2)}</span>
                </div>

                <div className={`text-lg font-bold ${colorClass} px-4 py-2 rounded-lg bg-slate-50`}>
                  {interpretation}
                </div>

                <div className="text-left w-full bg-indigo-50 p-4 rounded-lg text-sm text-indigo-900">
                  <p><strong>Logic Check:</strong></p>
                  <ul className="list-disc ml-5 mt-1 space-y-1">
                    <li>If OR &gt; 1: Sick people were exposed more.</li>
                    <li>If OR &lt; 1: Sick people were exposed less.</li>
                    <li>If OR = 1: Exposure made no difference.</li>
                  </ul>
                </div>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Understanding Odds</h3>
          <Accordion 
            question="Why can't we calculate Risk (Incidence) in Case-Control studies?"
            answer="Because we start with the outcome (Sick vs Healthy) and look backwards. We don't know the total population at risk, so we can only compare Odds, not Risk."
          />
          <Accordion 
            question="What does an Odds Ratio of 1.0 mean?"
            answer="It means the odds of exposure were the same in cases and controls. There is NO association between the exposure and the disease."
          />
          <Accordion 
            question="A study finds an OR of 4.5 for smoking and lung cancer. Interpret this."
            answer="The odds of having smoked are 4.5 times higher in the lung cancer group compared to the healthy group. This suggests smoking is a significant risk factor."
          />
        </div>
      </div>
    </div>
  );
};