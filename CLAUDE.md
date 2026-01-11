# EBM Math Calculator Guide

Evidence-Based Medicine interactive calculator for medical students and researchers.

## Claude Code Workflows

Use these commands in Claude Code to manage the project:

| Command | What it does |
|---------|--------------|
| `/commit` | Stage changes and create a commit with a good message |
| `/commit-push-pr` | Commit, push, and create a pull request |
| `git push` | Push committed changes to GitHub (triggers Vercel deploy) |

### Common Tasks - Just Ask Claude Code:

- "Run the dev server" → starts the app locally
- "Add a new calculator for [topic]" → creates component + wires it up
- "Deploy my changes" → commits and pushes to trigger Vercel
- "Check for errors" → runs typecheck
- "What changed?" → shows git diff

## Quick Commands

```bash
npm install      # Install dependencies (first time only)
npm run dev      # Start dev server at http://localhost:3000 (auto-opens browser)
npm run build    # Build for production (runs typecheck first)
npm run preview  # Preview production build
npm run typecheck # Check for TypeScript errors
npm run clean    # Remove node_modules and dist folders
```

## Project Structure

```
ebm-math-calculator-guide/
├── App.tsx                    # Main app with tab navigation
├── index.tsx                  # React entry point
├── index.html                 # HTML template (Tailwind CDN)
├── types.ts                   # TypeScript types (TabType enum)
├── components/
│   ├── calculators/
│   │   ├── ConfidenceIntervals.tsx   # CI interpretation
│   │   ├── RiskCalculator.tsx        # RR, ARR, NNT (cohort/RCT)
│   │   ├── OddsCalculator.tsx        # Odds Ratio (case-control)
│   │   └── DiagnosticTesting.tsx     # Sens, Spec, PPV, NPV, LR
│   ├── concepts/
│   │   └── ClinicalSignificance.tsx  # Educational content
│   └── ui/
│       ├── Card.tsx                  # Styled container
│       ├── Accordion.tsx             # Collapsible Q&A
│       └── DownloadButton.tsx        # PDF export
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Calculator Modules

| Module | Study Type | Key Calculations |
|--------|-----------|------------------|
| Confidence Intervals | Any | Significance interpretation |
| Risk Formulas | Cohort, RCT | EER, CER, RR, ARR, NNT |
| Odds Formulas | Case-control | Odds Ratio |
| Diagnostic Testing | Diagnostic studies | Sens, Spec, PPV, NPV, LR+, LR- |
| Clinical Significance | Educational | Effect size, MCID, Type I/II errors |

## Adding a New Calculator

1. Create component in `components/calculators/NewCalculator.tsx`
2. Add new tab type to `types.ts`:
   ```typescript
   export enum TabType {
     // ... existing types
     NEW_CALCULATOR = 'new_calculator'
   }
   ```
3. Import and add to `App.tsx`:
   - Import the component
   - Add case to `renderContent()` switch
   - Add navigation button

## Improvement Ideas

### High Priority
- [ ] Sample Size Calculator - plan study requirements
- [ ] Quiz Mode - practice before seeing answers
- [ ] Calculation History - save and compare results

### Medium Priority
- [ ] Forest Plot Viewer - meta-analysis visualization
- [ ] ROC Curve Generator - diagnostic test curves
- [ ] Power Analysis Calculator

### Lower Priority
- [ ] Offline mode (PWA)
- [ ] Dark mode toggle
- [ ] Multi-language support

## Deployment

This app deploys to Vercel automatically on push to main:
1. Push changes to GitHub
2. Vercel auto-builds and deploys
3. Students access via the Vercel URL

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS (via CDN)
- Lucide React (icons)
- html2canvas + jsPDF (PDF export)

## Key Formulas Reference

### Risk (Cohort/RCT)
- EER = a / (a+b)
- CER = c / (c+d)
- RR = EER / CER
- ARR = |CER - EER|
- NNT = 1 / ARR

### Odds (Case-Control)
- OR = (a × d) / (b × c)

### Diagnostic Testing
- Sensitivity = TP / (TP + FN)
- Specificity = TN / (TN + FP)
- PPV = TP / (TP + FP)
- NPV = TN / (TN + FN)
- LR+ = Sensitivity / (1 - Specificity)
- LR- = (1 - Sensitivity) / Specificity

---

## Changelog

### 2026-01-11 - Project Setup and Cleanup

**Changes Made:**
- Removed duplicate `/calculators` folder (was unused; app uses `/components/calculators`)
- Removed `.DS_Store` files
- Created `CLAUDE.md` with project documentation and Claude Code workflows
- Updated `README.md` (removed outdated AI Studio references)
- Updated `package.json`:
  - Version bumped to 1.0.0
  - Added `--open` flag to dev/preview scripts (auto-opens browser)
  - Added `typecheck` script for TypeScript validation
  - Added `clean` script for resetting node_modules
  - Build now runs typecheck first
- Initialized git repository

**Next Steps:**
- [ ] Create GitHub repository
- [ ] Push initial commit
- [ ] Connect to Vercel for deployment
- [ ] Share URL with students
