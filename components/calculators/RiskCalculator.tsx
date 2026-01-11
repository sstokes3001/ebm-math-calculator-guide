import React, { useState, useRef } from 'react';
import { Card } from '../ui/Card';
import { Accordion } from '../ui/Accordion';
import { Calculator, ArrowRight } from 'lucide-react';
import { DownloadButton } from '../ui/DownloadButton';

export const RiskCalculator: React.FC = () => {
  const [inputs, setInputs] = useState({ a: 15, b: 85, c: 20, d: 80 });
  const [results, setResults] = useState({ a: 15, b: 85, c: 20, d: 80 });
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    setResults(inputs);
  };

  const totalTreatment = results.a + results.b;
  const totalControl = results.c + results.d;

  const eer = totalTreatment > 0 ? results.a / totalTreatment : 0;
  const cer = totalControl > 0 ? results.c / totalControl : 0;
  
  const rr = cer > 0 ? eer / cer : 0;
  const arr = cer - eer;
  const nnt = arr !== 0 ? 1 / Math.abs(arr) : 0;
  const isBenefit = arr > 0; // If CER > EER, treatment reduced risk (Benefit)

  const formatPct = (val: number) => (val * 100).toFixed(1) + '%';
  const formatDec = (val: number) => val.toFixed(2);

  // Clinical Interpretation Construction
  let clinicalText = "Calculated data will appear here.";
  if (Math.abs(arr) < 0.001) {
    clinicalText = "There is no clinically significant difference in risk between the treatment and control groups based on these numbers.";
  } else if (isBenefit) {
    clinicalText = `The treatment reduces the absolute risk of the bad outcome by ${formatPct(Math.abs(arr))}. This means you would need to treat approximately ${Math.ceil(nnt)} people (NNT) to prevent one additional bad outcome compared to the control.`;
  } else {
    clinicalText = `The treatment increases the absolute risk of the bad outcome by ${formatPct(Math.abs(arr))}. This means for every ${Math.ceil(nnt)} people treated (NNH), one additional bad outcome is observed compared to the control.`;
  }

  return (
    <div className="max-w-4xl mx-auto" ref={contentRef}>
      <div className="flex justify-end mb-4" data-html2canvas-ignore>
        <DownloadButton targetRef={contentRef} filename="Risk_Calculator_Results" />
      </div>

      <div className="space-y-8 bg-white/50 p-6 rounded-xl border border-slate-100/50 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Risk Formulas</h2>
          <p className="text-slate-600">For Cohort Studies & RCTs (Looking FORWARD)</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Table */}
          <Card title="The 2x2 Table Layout">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center items-center mb-2">
                <div className="col-start-2 font-semibold text-rose-600 text-sm">Bad Outcome (Event)</div>
                <div className="font-semibold text-emerald-600 text-sm">Good Outcome (No Event)</div>
              </div>

              {/* Row 1: Treatment */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-right font-bold text-slate-700 text-sm">Treatment Group</div>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-xs text-slate-400 font-mono">(a)</span>
                  <input 
                    type="number" 
                    value={inputs.a} 
                    onChange={(e) => setInputs({...inputs, a: Number(e.target.value)})}
                    className="w-full p-2 pl-8 border border-slate-300 rounded bg-indigo-50/50 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-xs text-slate-400 font-mono">(b)</span>
                  <input 
                    type="number" 
                    value={inputs.b} 
                    onChange={(e) => setInputs({...inputs, b: Number(e.target.value)})}
                    className="w-full p-2 pl-8 border border-slate-300 rounded bg-indigo-50/50 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Row 2: Control */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-right font-bold text-slate-700 text-sm">Control Group</div>
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

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex justify-between px-4">
                <span>Total Treated: {inputs.a + inputs.b}</span>
                <span>Total Control: {inputs.c + inputs.d}</span>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Results
              </button>
            </div>
          </Card>

          {/* Results */}
          <Card title="Calculated Results" className="bg-white border-slate-200">
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded bg-slate-50 border border-slate-200">
                  <div>
                      <div className="text-slate-600 text-xs uppercase tracking-wider font-semibold">EER (Risk in Tx)</div>
                      <div className="text-xs text-slate-400 font-mono">a ÷ (a + b)</div>
                  </div>
                  <div className="text-xl font-mono font-bold text-indigo-600">{formatPct(eer)}</div>
                </div>

                <div className="flex justify-between items-center p-3 rounded bg-slate-50 border border-slate-200">
                  <div>
                      <div className="text-slate-600 text-xs uppercase tracking-wider font-semibold">CER (Risk in Control)</div>
                      <div className="text-xs text-slate-400 font-mono">c ÷ (c + d)</div>
                  </div>
                  <div className="text-xl font-mono font-bold text-indigo-600">{formatPct(cer)}</div>
                </div>

                <div className="h-px bg-slate-100 my-2"></div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded bg-emerald-50 border border-emerald-100">
                      <div className="text-emerald-700 text-xs uppercase font-bold">Rel. Risk (RR)</div>
                      <div className="text-2xl font-bold mt-1 text-emerald-900">{formatDec(rr)}</div>
                      <div className="text-[10px] text-slate-400 mt-1">EER ÷ CER</div>
                      <div className="text-[10px] text-emerald-600 mt-1 italic">The "Sale Price"</div>
                  </div>

                  <div className="p-3 rounded bg-blue-50 border border-blue-100">
                      <div className="text-blue-700 text-xs uppercase font-bold">Abs. Risk Red. (ARR)</div>
                      <div className="text-2xl font-bold mt-1 text-blue-900">{formatPct(Math.abs(arr))}</div>
                      <div className="text-[10px] text-slate-400 mt-1">|CER - EER|</div>
                      <div className="text-[10px] text-blue-600 mt-1 italic">The "Real Savings"</div>
                  </div>
                </div>

                <div className="p-4 rounded bg-amber-50 border border-amber-100 flex flex-col items-center justify-center">
                    <div className="text-amber-800 text-sm font-bold uppercase tracking-widest mb-1">
                      {isBenefit ? 'Number Needed to Treat (NNT)' : 'Number Needed to Harm (NNH)'}
                    </div>
                    <div className="text-4xl font-black text-amber-600">{Math.ceil(nnt)}</div>
                    <div className="text-xs text-amber-700/80 mt-2 text-center">
                      (1 ÷ ARR) = {nnt.toFixed(1)} <br/> Always round up to next whole person!
                    </div>
                </div>
                
                {/* Clinical Interpretation */}
                <div className="p-4 rounded bg-indigo-50 border border-indigo-100 mt-2">
                   <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-indigo-600 mt-1 shrink-0" />
                      <p className="text-sm text-indigo-900 leading-relaxed">
                        <span className="font-bold">Clinical Interpretation: </span>
                        {clinicalText}
                      </p>
                   </div>
                </div>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Quiz Time</h3>
          <Accordion 
            question="What does a Relative Risk (RR) of 0.74 mean?"
            answer="It means 74% of the risk remains in the treated group compared to the control group. Alternatively, it represents a 26% relative reduction in risk."
          />
          <Accordion 
            question="Why do we calculate NNT?"
            answer="NNT tells us the 'workload'. It's how many patients must receive the treatment to prevent one additional bad outcome. A lower NNT is better."
            explanation="NNT = 1 / ARR. You cannot calculate NNT from Odds Ratios."
          />
          <Accordion 
            question="What is the difference between EER and CER?"
            answer="EER (Experimental Event Rate) is the risk in the treatment group. CER (Control Event Rate) is the risk in the control/placebo group."
          />
        </div>
      </div>
    </div>
  );
};