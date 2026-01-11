import React, { useState, useRef } from 'react';
import { Card } from '../ui/Card';
import { Accordion } from '../ui/Accordion';
import { Info, AlertCircle, CheckCircle2, Calculator } from 'lucide-react';
import { DownloadButton } from '../ui/DownloadButton';

enum CIMode {
  DIFFERENCE = 'DIFFERENCE',
  RATIO = 'RATIO'
}

export const ConfidenceIntervals: React.FC = () => {
  const [mode, setMode] = useState<CIMode>(CIMode.DIFFERENCE);
  const [lower, setLower] = useState<string>("-6.3");
  const [upper, setUpper] = useState<string>("-1.7");
  
  // State for the calculated/displayed results
  const [results, setResults] = useState({
    mode: CIMode.DIFFERENCE,
    lower: "-6.3",
    upper: "-1.7"
  });

  const contentRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    setResults({ mode, lower, upper });
  };

  const numLower = parseFloat(results.lower);
  const numUpper = parseFloat(results.upper);
  const isValid = !isNaN(numLower) && !isNaN(numUpper) && numLower <= numUpper;

  const nullValue = results.mode === CIMode.DIFFERENCE ? 0 : 1;
  const isSignificant = isValid && (
    results.mode === CIMode.DIFFERENCE 
      ? (numUpper < 0 || numLower > 0) 
      : (numUpper < 1 || numLower > 1)
  );

  return (
    <div className="max-w-4xl mx-auto" ref={contentRef}>
      <div className="flex justify-end mb-4" data-html2canvas-ignore>
        <DownloadButton targetRef={contentRef} filename="Confidence_Intervals" />
      </div>
      
      <div className="space-y-8 bg-white/50 p-6 rounded-xl border border-slate-100/50 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Confidence Intervals (CI)</h2>
          <p className="text-slate-600">The Two Golden Rules: Subtracting vs. Dividing</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Rule Selection and Input */}
          <Card title="1. Select Data Type">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg mb-6">
              <button
                onClick={() => { 
                  setMode(CIMode.DIFFERENCE); 
                  setLower(""); 
                  setUpper(""); 
                  setResults({ mode: CIMode.DIFFERENCE, lower: "", upper: "" });
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  mode === CIMode.DIFFERENCE
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Difference Data
                <span className="block text-xs font-normal mt-1 opacity-75">Mean Difference</span>
              </button>
              <button
                onClick={() => { 
                  setMode(CIMode.RATIO); 
                  setLower(""); 
                  setUpper(""); 
                  setResults({ mode: CIMode.RATIO, lower: "", upper: "" });
                }}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  mode === CIMode.RATIO
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Ratio Data
                <span className="block text-xs font-normal mt-1 opacity-75">OR, RR, HR</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">95% CI Lower Bound</label>
                <input
                  type="number"
                  step="0.1"
                  value={lower}
                  onChange={(e) => setLower(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={mode === CIMode.DIFFERENCE ? "e.g. -6.3" : "e.g. 0.85"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">95% CI Upper Bound</label>
                <input
                  type="number"
                  step="0.1"
                  value={upper}
                  onChange={(e) => setUpper(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={mode === CIMode.DIFFERENCE ? "e.g. -1.7" : "e.g. 1.34"}
                />
              </div>
              
              <button
                onClick={handleCalculate}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Interpretation
              </button>
            </div>
          </Card>

          {/* Visualization & Result */}
          <Card title="2. Interpretation">
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center relative h-32 flex items-center justify-center">
                  {/* Visualizer */}
                  {!isValid ? (
                    <span className="text-slate-400">Invalid Range or Click Calculate</span>
                  ) : (
                    <div className="w-full relative h-12">
                      {/* Null Line */}
                      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 border-l-2 border-dashed border-slate-400 z-10"></div>
                      
                      {/* Null Value Label with Tooltip */}
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 group z-20 flex flex-col items-center">
                        <div className="cursor-help flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-transparent hover:border-slate-300 transition-colors">
                           Null Value: {nullValue} <Info className="w-3 h-3 text-slate-400" />
                        </div>
                        {/* Tooltip content */}
                        <div className="absolute top-full mt-2 w-48 bg-slate-800 text-white text-[11px] font-medium px-3 py-2 rounded-lg shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none text-center z-30">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                          {results.mode === CIMode.DIFFERENCE 
                            ? "If the interval touches 0, there is no statistical difference (Mean A - Mean B = 0)." 
                            : "If the interval touches 1, there is no statistical difference (Risk A ÷ Risk B = 1)."
                          }
                        </div>
                      </div>

                      {/* Interval Bar */}
                      {(() => {
                        const range = results.mode === CIMode.DIFFERENCE ? 20 : 4; // visual range width
                        const center = results.mode === CIMode.DIFFERENCE ? 0 : 1;
                        
                        const scale = (val: number) => {
                          const offset = val - center;
                          const pct = 50 + (offset / (range/2)) * 50;
                          return Math.min(Math.max(pct, 0), 100);
                        };

                        const leftPct = scale(numLower);
                        const rightPct = scale(numUpper);
                        const widthPct = rightPct - leftPct;

                        return (
                          <div 
                            className={`absolute top-4 h-4 rounded-full transition-all duration-300 opacity-90 ${isSignificant ? 'bg-emerald-500' : 'bg-rose-500'}`}
                            style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                          >
                              <span className="absolute -left-2 top-6 text-xs text-slate-500">{numLower}</span>
                              <span className="absolute -right-2 top-6 text-xs text-slate-500">{numUpper}</span>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>

                <div className={`p-4 rounded-lg flex items-start gap-3 ${isValid ? (isSignificant ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200') : 'bg-slate-50 border border-slate-200 text-slate-400'}`}>
                  {isValid ? (isSignificant ? <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" /> : <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />) : <Info className="w-6 h-6 shrink-0 mt-0.5" />}
                  <div>
                    <h4 className="font-bold">{isValid ? (isSignificant ? 'Statistically Significant' : 'Not Statistically Significant') : 'Awaiting Data'}</h4>
                    <p className="text-sm mt-1">
                      {isValid ? (results.mode === CIMode.DIFFERENCE 
                        ? isSignificant ? "The range DOES NOT touch 0." : "The range TOUCHES or CROSSES 0."
                        : isSignificant ? "The range DOES NOT touch 1." : "The range TOUCHES or CROSSES 1.") : "Enter values and click Calculate."
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-slate-500 bg-slate-100 p-2 rounded">
                <strong>Concept:</strong> {results.mode === CIMode.DIFFERENCE 
                  ? "Null Hypothesis for Difference is 0 (Because 5 - 5 = 0)"
                  : "Null Hypothesis for Ratio is 1 (Because 5 ÷ 5 = 1)"}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Test Your Knowledge</h3>
          <Accordion 
            question="Mean Difference = -4.0 (95% CI: -6.3 to -1.7). Is this significant?"
            answer="YES."
            explanation="This is 'Difference' data. The interval is entirely negative and does not include the null value of 0. Therefore, it is statistically significant."
          />
          <Accordion 
            question="Odds Ratio = 1.07 (95% CI: 0.85 to 1.34). Is this significant?"
            answer="NO (Null)."
            explanation="This is 'Ratio' data. The interval starts below 1.0 and ends above 1.0. It crosses the null value of 1.0, so there is no statistical difference."
          />
          <Accordion 
            question="Why is the null value '1' for Ratios?"
            answer="Because if the risk in the treatment group is exactly the same as the control group, dividing them (Risk A ÷ Risk B) equals 1."
          />
        </div>
      </div>
    </div>
  );
};