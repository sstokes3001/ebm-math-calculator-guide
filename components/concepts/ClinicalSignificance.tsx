import React, { useRef } from 'react';
import { Card } from '../ui/Card';
import { Accordion } from '../ui/Accordion';
import { Activity, AlertTriangle, Microscope, Search } from 'lucide-react';
import { DownloadButton } from '../ui/DownloadButton';

export const ClinicalSignificance: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-4xl mx-auto" ref={contentRef}>
      <div className="flex justify-end mb-4" data-html2canvas-ignore>
        <DownloadButton targetRef={contentRef} filename="Clinical_Significance_Concepts" />
      </div>

      <div className="space-y-8 bg-white/50 p-6 rounded-xl border border-slate-100/50 backdrop-blur-sm">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Clinical Significance</h2>
          <p className="text-slate-600">The P-Value asks "If there is a difference". These concepts ask "Does it matter?"</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Effect Size vs. MCID" className="border-t-4 border-t-indigo-500">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Activity className="w-6 h-6 text-indigo-500 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-800">Effect Size (The Magnitude)</h4>
                  <p className="text-sm text-slate-600 mt-1">Asks: "Is the difference BIG?" <br/>A tiny difference can be statistically significant if sample size is huge.</p>
                </div>
              </div>
              
              <div className="border-t border-slate-100 my-2"></div>

              <div className="flex items-start gap-3">
                <Microscope className="w-6 h-6 text-rose-500 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-800">MCID (Min. Clinically Important Diff)</h4>
                  <p className="text-sm text-slate-600 mt-1">Asks: "Does the patient feel it?" <br/>The smallest benefit a patient can actually perceive.</p>
                </div>
              </div>

              <div className="bg-slate-100 p-3 rounded-lg text-sm mt-2">
                <strong>Rule:</strong> If Effect Size &lt; MCID, the drug is clinically useless, even if P &lt; 0.05.
              </div>
            </div>
          </Card>

          <Card title="Errors: Type I vs Type II" className="border-t-4 border-t-amber-500">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-800">Type I Error (False Alarm)</h4>
                  <p className="text-sm text-slate-600 mt-1">You say it works, but it doesn't.</p>
                  <div className="text-xs text-slate-500 mt-1 font-mono bg-amber-50 inline-block px-1">Culprit: Random Chance (Alpha = 0.05)</div>
                </div>
              </div>

              <div className="border-t border-slate-100 my-2"></div>

              <div className="flex items-start gap-3">
                <Search className="w-6 h-6 text-slate-500 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-800">Type II Error (Missed Opportunity)</h4>
                  <p className="text-sm text-slate-600 mt-1">You say it doesn't work, but it actually does.</p>
                  <div className="text-xs text-slate-500 mt-1 font-mono bg-slate-100 inline-block px-1">Culprit: Sample Size (Low Power)</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Deep Dive Questions</h3>
          <Accordion 
            question="A weight loss drug causes 0.1 lbs weight loss (p=0.001). Is this good?"
            answer="Statistically? Yes. Clinically? No. The Effect Size (0.1 lbs) is likely smaller than the MCID (what a patient cares about)."
          />
          <Accordion 
            question="What is the usual limit (Alpha) for Type I Error?"
            answer="0.05 (5%). This means we accept a 5% chance of being wrong (finding a false positive) every time we run a study."
          />
          <Accordion 
            question="How do you fix a Type II error risk?"
            answer="Increase the Sample Size. A larger study has more 'Power' to detect a difference if one actually exists."
            explanation="Think of it like turning up the volume on a radio to hear a faint signal."
          />
        </div>
      </div>
    </div>
  );
};