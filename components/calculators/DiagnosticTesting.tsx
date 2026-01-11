import React, { useState, useRef } from 'react';
import { Card } from '../ui/Card';
import { Accordion } from '../ui/Accordion';
import { DownloadButton } from '../ui/DownloadButton';
import { Activity, Calculator } from 'lucide-react';

export const DiagnosticTesting: React.FC = () => {
  const [inputs, setInputs] = useState({ tp: 80, fp: 10, fn: 20, tn: 90 });
  const [results, setResults] = useState({ tp: 80, fp: 10, fn: 20, tn: 90 });
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    setResults(inputs);
  };

  // Totals
  const totalDiseasePos = results.tp + results.fn; // Gold Standard Positive
  const totalDiseaseNeg = results.fp + results.tn; // Gold Standard Negative
  const totalTestPos = results.tp + results.fp;
  const totalTestNeg = results.fn + results.tn;
  const totalPop = totalDiseasePos + totalDiseaseNeg;

  // Calculations
  const sensitivity = totalDiseasePos > 0 ? results.tp / totalDiseasePos : 0;
  const specificity = totalDiseaseNeg > 0 ? results.tn / totalDiseaseNeg : 0;
  
  const ppv = totalTestPos > 0 ? results.tp / totalTestPos : 0;
  const npv = totalTestNeg > 0 ? results.tn / totalTestNeg : 0;

  const lrPlus = (1 - specificity) > 0 ? sensitivity / (1 - specificity) : 0;
  const lrMinus = specificity > 0 ? (1 - sensitivity) / specificity : 0;
  
  const prevalence = totalPop > 0 ? totalDiseasePos / totalPop : 0;

  const formatPct = (val: number) => (val * 100).toFixed(1) + '%';
  const formatDec = (val: number) => val.toFixed(2);

  const getLrInterpretation = (lr: number, type: 'positive' | 'negative') => {
    if (type === 'positive') {
      if (lr > 10) return "Large increase in disease likelihood";
      if (lr >= 5) return "Moderate increase in disease likelihood";
      if (lr >= 2) return "Small increase in disease likelihood";
      return "Little to no change in likelihood";
    } else {
      if (lr < 0.1) return "Large decrease in disease likelihood";
      if (lr <= 0.2) return "Moderate decrease in disease likelihood";
      if (lr <= 0.5) return "Small decrease in disease likelihood";
      return "Little to no change in likelihood";
    }
  };

  return (
    <div className="max-w-4xl mx-auto" ref={contentRef}>
      <div className="flex justify-end mb-4" data-html2canvas-ignore>
        <DownloadButton targetRef={contentRef} filename="Diagnostic_Testing_Results" />
      </div>

      <div className="space-y-8 bg-white/50 p-6 rounded-xl border border-slate-100/50 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Diagnostic Testing</h2>
          <p className="text-slate-600">Sensitivity, Specificity, PPV, NPV & Likelihood Ratios</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Table */}
          <Card title="Test vs. Gold Standard">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center items-end mb-2">
                <div className="col-start-2 font-bold text-rose-700 text-sm border-b-2 border-rose-200 pb-1">Disease +<br/><span className="font-normal text-xs opacity-75">(Gold Std)</span></div>
                <div className="font-bold text-emerald-700 text-sm border-b-2 border-emerald-200 pb-1">Disease -<br/><span className="font-normal text-xs opacity-75">(Gold Std)</span></div>
              </div>

              {/* Row 1: Test Positive */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-right font-bold text-slate-700 text-sm">Test Positive</div>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-xs text-slate-400 font-mono">TP</span>
                  <input 
                    type="number" 
                    value={inputs.tp} 
                    onChange={(e) => setInputs({...inputs, tp: Number(e.target.value)})}
                    className="w-full p-2 pl-8 border border-slate-300 rounded bg-rose-50/50 focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-xs text-slate-400 font-mono">FP</span>
                  <input 
                    type="number" 
                    value={inputs.fp} 
                    onChange={(e) => setInputs({...inputs, fp: Number(e.target.value)})}
                    className="w-full p-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:ring-2 focus:ring-slate-500"
                  />
                </div>
              </div>

              {/* Row 2: Test Negative */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-right font-bold text-slate-700 text-sm">Test Negative</div>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-xs text-slate-400 font-mono">FN</span>
                  <input 
                    type="number" 
                    value={inputs.fn} 
                    onChange={(e) => setInputs({...inputs, fn: Number(e.target.value)})}
                    className="w-full p-2 pl-8 border border-slate-300 rounded bg-slate-50 focus:ring-2 focus:ring-slate-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-xs text-slate-400 font-mono">TN</span>
                  <input 
                    type="number" 
                    value={inputs.tn} 
                    onChange={(e) => setInputs({...inputs, tn: Number(e.target.value)})}
                    className="w-full p-2 pl-8 border border-slate-300 rounded bg-emerald-50/50 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded text-sm text-slate-600 border border-slate-200 mt-4 flex justify-between">
                <span>Total Disease (+): {inputs.tp + inputs.fn}</span>
                <span>Total Disease (-): {inputs.fp + inputs.tn}</span>
              </div>
              <div className="text-xs text-slate-500 text-center">
                 Prevalence (Input): {totalPop > 0 ? formatPct((inputs.tp + inputs.fn) / (inputs.tp + inputs.fn + inputs.fp + inputs.tn)) : '0%'}
              </div>

              <button
                onClick={handleCalculate}
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Stats
              </button>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card title="Stable Properties" className="border-t-4 border-t-indigo-500">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-bold text-slate-700">Sensitivity</div>
                            <div className="text-xs text-slate-500">TP / (TP + FN)</div>
                            <div className="text-[10px] text-slate-400 italic">True Positive Rate</div>
                        </div>
                        <div className="text-xl font-mono font-bold text-indigo-600">{formatPct(sensitivity)}</div>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full" style={{ width: `${sensitivity * 100}%` }}></div>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-bold text-slate-700">Specificity</div>
                            <div className="text-xs text-slate-500">TN / (TN + FP)</div>
                            <div className="text-[10px] text-slate-400 italic">True Negative Rate</div>
                        </div>
                        <div className="text-xl font-mono font-bold text-indigo-600">{formatPct(specificity)}</div>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full" style={{ width: `${specificity * 100}%` }}></div>
                    </div>
                </div>
            </Card>

            <Card title="Frequency Dependent" className="border-t-4 border-t-amber-500">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-bold text-slate-700">PPV</div>
                            <div className="text-xs text-slate-500">TP / (TP + FP)</div>
                            <div className="text-[10px] text-slate-400 italic">Positive Predictive Value</div>
                        </div>
                        <div className="text-xl font-mono font-bold text-amber-600">{formatPct(ppv)}</div>
                    </div>

                    <div className="h-px bg-slate-100"></div>

                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-bold text-slate-700">NPV</div>
                            <div className="text-xs text-slate-500">TN / (TN + FN)</div>
                            <div className="text-[10px] text-slate-400 italic">Negative Predictive Value</div>
                        </div>
                        <div className="text-xl font-mono font-bold text-amber-600">{formatPct(npv)}</div>
                    </div>
                    
                    <div className="bg-amber-50 p-2 rounded text-xs text-amber-800 mt-2">
                        ⚠️ PPV/NPV change based on the prevalence ({formatPct(prevalence)}) of the disease in the population.
                    </div>
                </div>
            </Card>
          </div>
        </div>

        {/* Likelihood Ratios */}
        <Card title="Likelihood Ratios (LR)">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-4 rounded bg-emerald-50 border border-emerald-100">
                    <div className="text-emerald-800 font-bold mb-1">Positive LR (LR+)</div>
                    <div className="text-3xl font-black text-emerald-600 mb-2">{formatDec(lrPlus)}</div>
                    <div className="text-xs text-emerald-700 mb-2">Sensitivity / (1 - Specificity)</div>
                    <div className="text-sm font-medium text-emerald-900 border-t border-emerald-200 pt-2">
                        {getLrInterpretation(lrPlus, 'positive')}
                    </div>
                </div>

                <div className="p-4 rounded bg-rose-50 border border-rose-100">
                    <div className="text-rose-800 font-bold mb-1">Negative LR (LR-)</div>
                    <div className="text-3xl font-black text-rose-600 mb-2">{formatDec(lrMinus)}</div>
                    <div className="text-xs text-rose-700 mb-2">(1 - Sensitivity) / Specificity</div>
                    <div className="text-sm font-medium text-rose-900 border-t border-rose-200 pt-2">
                        {getLrInterpretation(lrMinus, 'negative')}
                    </div>
                </div>
            </div>
            
            <div className="mt-4 bg-slate-50 p-3 rounded-lg text-sm text-slate-600">
                <strong>Rule of Thumb:</strong>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                    <li>LR &gt; 10 or &lt; 0.1: Large change in likelihood</li>
                    <li>LR 5-10 or 0.1-0.2: Moderate change</li>
                    <li>LR 2-5 or 0.2-0.5: Small change</li>
                    <li>LR 1-2 or 0.5-1: Little to no change</li>
                </ul>
            </div>
        </Card>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Concept Check</h3>
          <Accordion 
            question="What is the difference between Sensitivity and PPV?"
            answer="Sensitivity is a property of the TEST (how good is it at finding disease?). PPV is a property of the RESULT (given a positive test, how likely is it that the patient actually has disease?)."
            explanation="Sensitivity is 'stable' across populations, whereas PPV depends heavily on the prevalence of the disease."
          />
          <Accordion 
            question="Which test is better for screening: High Sensitivity or High Specificity?"
            answer="High Sensitivity."
            explanation="SNOUT: Sensitive tests rule OUT. You don't want to miss anyone in a screening (low False Negatives). Confirmatory tests should have high Specificity (SPIN: Specific tests rule IN)."
          />
           <Accordion 
            question="How do Likelihood Ratios help us?"
            answer="They allow us to move from Pre-Test Probability to Post-Test Probability using a Fagan Nomogram. They are more useful than PPV/NPV because they don't change with prevalence."
          />
        </div>
      </div>
    </div>
  );
};